from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .models import Booking, Session
from datetime import date as dt


def load_home_page(request):
    return render(request, 'classbooking_app/home.html')


def create_booking(user, id):
    # Get session associated with booking
    session=get_object_or_404(Session, id=id)
    # Create booking
    booking=Booking(
        session=session,
        user=user,
        confirmed = False
    )
    # Reduce the number of spaces in the session
    booking.save()
    return booking


def login_page(request):
    # Handle login form
    if request.method == "POST":
        # Get data from form
        username = request.POST.get("username")
        password = request.POST.get("password")
        # Check if user is authenticated
        user = authenticate(request, username=username, password=password)
        # If user is authenticaed redirect to timetable page
        if user is not None:
            login(request, user)
            return redirect('show_sessions')
        else:
            # Return user to home page
            return redirect('load_home_page')
    return render(request, 'classbooking_app/login.html')


def show_sessions(request):
    #Get current user 
    user = request.user
    # Set current date as default
    date = dt.today().strftime("%Y-%m-%d")
    # Load current days sessions
    todays_sessions = Session.objects.filter(date=date)
    # Get users unconfirmed bookings
    existing_bookings = Booking.objects.filter(user=user, confirmed=False)
    # Pass through an initial context to timetable page
    initial_context = {
        'date':date,
        'todays_sessions':todays_sessions,
        'existing_bookings':existing_bookings
    }
    # Handle form submitted
    if request.method == "POST":
        # Get data currently entered into form
        date = request.POST.get('date_name')
        cart = request.POST.get('cart')
        remove = request.POST.get('remove')
        user = request.POST.get('user_name')
        # Update todays_sessions with new date
        todays_sessions = Session.objects.filter(date=date)
        # Split cart data into individual session ids
        cart_ids = cart.split()
        # Take last cart_id and make unconfirmed booking
        if len(cart_ids) != 0:
            last_added_id = cart_ids[-1]
            # Check if booking already exists for user
            session = get_object_or_404(Session, id=last_added_id)
            session_bookings = Booking.objects.filter(user=user, confirmed=False, session=session)
            if len(session_bookings) == 0:
                # Create unconfirmed booking
                create_booking(user, last_added_id)
        existing_bookings = Booking.objects.filter(user=user, confirmed=False)
        # Create a list to store data for sessions in cart
        cart_sessions = []
        for cart_id in cart_ids:
            session = get_object_or_404(Session, id=cart_id)
            cart_sessions.append(session)
        # form_ready is only filled in when user goes to checkout
        # should be invisible in the browser
        form_ready = request.POST.get('finalised') == "y"
        # Check if user has gone to checkout
        if form_ready:
            # Confirm all users unconfirmed bookings
            bookings = Booking.objects.filter(user=user, confirmed=False)
            for booking in bookings:
                booking.confirmed = True
                booking.save()
                session = booking.session
                session.spaces -= 1
                session.save()
        # Update context to pass back through to the browser
        context = {
            'todays_sessions': todays_sessions,
            'cart_sessions':cart_sessions,
            'existing_bookings':existing_bookings,
            'date' : date,
            'user':user,
            'cart':cart,
            'remove':remove,
            }
        return render(request, 'classbooking_app/make_booking.html', context)
    return render(request, 'classbooking_app/make_booking.html', initial_context)