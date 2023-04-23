from django.shortcuts import render, redirect, get_object_or_404
from .models import Booking, Session
from datetime import date as dt

# Load basic html template
def get_bookings(request):
    bookings = Session.objects.all()
    context = {
        'bookings': bookings
    }
    return render(request, 'classbooking_app/bookings.html', context)


activities = {'boxfit': '10:00', 'kettlebells': '11:00', 'yoga': '12:00'}


# Load make_bookings.html
# Create instance of booking from form data
def show_sessions(request):
    date = "2023-04-23"
    if request.method == "POST":
        date = request.POST.get('date_name')
        cart = request.POST.get('cart')
        user = request.POST.get('user_name')
        ids = cart.split()
        for session_id in ids:
            session_id = int(session_id)
            session = get_object_or_404(Session, id=session_id)
            booking = Booking(id=None, fk=session,user=user,confirmed=False)
            booking.save()
            booking.id=booking.fk.id
            booking.save()
        todays_sessions = Session.objects.filter(date=date)
        bookings = Booking.objects.all()
        context = {
            'todays_sessions': todays_sessions,
            'date' : date,
            'ids':ids,
            'user':user,
            'bookings':bookings
            }
        return render(request, 'classbooking_app/make_booking.html', context)
    return render(request, 'classbooking_app/make_booking.html',{'date':date})


def checkout(request):
    if request.method == "POST":
        user = request.POST.get('bookings-string')
        cart = request.POST.get('cart')
        session = get_object_or_404(Session, id=145040)
        session.attendees = user
        session.save()
        context={
            'cart':cart,
            'user':user
        }
        return render(request, 'classbooking_app/checkout.html',context)
    return render(request, 'classbooking_app/checkout.html')

def edit_booking(request, booking_id):
    return render(request, 'classbooking_app/edit_booking.html')


def toggle_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.running = not booking.running
    booking.save()
    return redirect('get_bookings')


def delete_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id)
    booking.delete()
    return redirect('get_bookings')


