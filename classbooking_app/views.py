from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import Booking, Session
from datetime import date as dt

# Load basic html template
def load_home_page(request):
    bookings = Session.objects.all()
    context = {
        'bookings': bookings
    }
    return render(request, 'classbooking_app/home.html', context)


def login_page(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('show_sessions')
        else:
            return redirect('load_home_page')
    return render(request, 'classbooking_app/login.html')



activities = {'boxfit': '10:00', 'kettlebells': '11:00', 'yoga': '12:00'}

def create_booking(user, id):
    session=get_object_or_404(Session, id=id)
    booking=Booking(
        session=session,
        user=user,
        confirmed=False
    )
    booking.save()
    return booking


# Load make_bookings.html
# Create instance of booking from form data
def show_sessions(request):
    date = "2023-04-23"
    if request.method == "POST":
        date = request.POST.get('date_name')
        cart = request.POST.get('cart')
        user = request.POST.get('user_name')
        todays_sessions = Session.objects.filter(date=date)
        cart_ids = cart.split()
        for id in cart_ids:
            create_booking(user, id)
        context = {
            'todays_sessions': todays_sessions,
            'date' : date,
            'user':user,
            'cart':cart,
            'cart_ids':cart_ids
            }
        return render(request, 'classbooking_app/make_booking.html', context)
    return render(request, 'classbooking_app/make_booking.html',{'date':date})


def checkout(request):
    user = request.user.username
    if request.method == "POST":
        users_bookings = Booking.objects.filter(user=user)
        for booking in users_bookings:
            booking.confirmed = True
            booking.save()
            session_id = booking.session.id
            session_booked = get_object_or_404(Session, id=session_id)
            session_booked.spaces -= 1
            session_booked.attendees += ", " + user
            session_booked.save()
        return render(request, 'classbooking_app/checkout.html')
    return render(request, 'classbooking_app/checkout.html')

def edit_booking(request, booking_id):
    return render(request, 'classbooking_app/edit_booking.html')


def toggle_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.running = not booking.running
    booking.save()
    return redirect('home')


def delete_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.delete()
    return redirect('home')


