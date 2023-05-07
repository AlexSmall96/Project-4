from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import Booking, Session
from datetime import date as dt


# Load home page
def load_home_page(request):
    return render(request, 'classbooking_app/home.html')

# 
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


# Load make_bookings.html
# Create instance of booking from form data
def show_sessions(request):
    # Set current date as default
    date = dt.today().strftime("%Y-%m-%d")
    # Load current days sessions
    todays_sessions = Session.objects.filter(date=date)
    # Pass through an initial context to timetable page
    initial_context = {
        'date':date,
        'todays_sessions':todays_sessions
    }
    # Handle form submitted
    if request.method == "POST":
        # Get data currently entered into form
        date = request.POST.get('date_name')
        cart = request.POST.get('cart')
        user = request.POST.get('user_name')
        # Update todays_sessions with new date
        todays_sessions = Session.objects.filter(date=date)
        # Split cart data into individual session ids
        cart_ids = cart.split()
        # Create a list to store data for sessions in cart
        cart_sessions = []
        for cart_id in cart_ids:
            session = get_object_or_404(Session, id=cart_id)
            cart_sessions.append(session)
        # form_ready is only filled in when user goes to checkout
        # should be invisible in the browser
        form_ready = request.POST.get('finalised') == "y"
        # If user has gone to checkout, book the user into sessions in cart
        if form_ready:
            for id in cart_ids:
                create_booking(user, id)
        # Update context to pass back through to the browser
        context = {
            'todays_sessions': todays_sessions,
            'cart_sessions':cart_sessions,
            'date' : date,
            'user':user,
            'cart':cart,
            }
        return render(request, 'classbooking_app/make_booking.html', context)
    return render(request, 'classbooking_app/make_booking.html', initial_context)

