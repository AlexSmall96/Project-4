from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Booking, Session
from datetime import date as dt


def load_home_page(request):
    return render(request, 'classbooking_app/home.html')


def create_booking(user, id):
    # Get session associated with booking
    session = get_object_or_404(Session, id=id)
    # Create booking
    booking = Booking(
        session=session,
        user=user,
        confirmed=False
    )
    booking.save()
    return booking


def delete_booking(user, id):
    session = get_object_or_404(Session, id=id)
    bookings = Booking.objects.filter(user=user, session=session).delete()
    spaces_taken = len(Booking.objects.filter(session=session))
    session.spaces = session.activity.capacity - spaces_taken
    session.save()


def confirm_bookings(user):
    # Select users unconfirmed bookings
    bookings = Booking.objects.filter(user=user, confirmed=False)
    for booking in bookings:
        # Set booking to confirmed
        booking.confirmed = True
        booking.save()
        # Add user to count of attendees in session
        session = booking.session
        spaces_taken = len(Booking.objects.filter(session=session))
        session.spaces = session.activity.capacity - spaces_taken
        session.save()


def handle_form(request):
    date = request.POST.get('date_name')
    last_selected = request.POST.get('cart')
    remove = request.POST.get('remove')
    user = request.user
    # Update todays_sessions with new date
    todays_sessions = Session.objects.filter(date=date)
    # Split cart data into individual session ids
    # Take last cart_id and make unconfirmed booking
    if last_selected != "":
        # Check if booking already exists for user
        session = get_object_or_404(Session, id=last_selected)
        session_bookings = Booking.objects.filter(
            user=user,
            session=session
            )
        if len(session_bookings) == 0:
            # Create unconfirmed booking
            create_booking(user, last_selected)
    # Check if remove field is non empty
    if remove != "":
        delete_booking(user, remove)
    existing_bookings = Booking.objects.filter(user=user)
    # form_ready is only filled in when user goes to checkout
    # should be invisible in the browser
    form_ready = request.POST.get('finalised') == "y"
    checkout_loaded = request.POST.get('checkout-loaded')
    # Check if user has gone to checkout
    if form_ready:
        # Confirm users bookings
        confirm_bookings(user)
    # Update context to pass back through to the browser
    form_ready = checkout_loaded
    context = {
        'todays_sessions': todays_sessions,
        'existing_bookings': existing_bookings,
        'date': date,
        'checkout_loaded': checkout_loaded,
        'form_ready': form_ready
        }
    return context


def show_sessions(request):
    user = request.user
    # Set current date as default
    date = dt.today().strftime("%Y-%m-%d")
    # Load current days sessions
    todays_sessions = Session.objects.filter(date=date).order_by('time')
    # Get users unconfirmed bookings
    existing_bookings = Booking.objects.filter(user=user, confirmed=False)
    # Default checkout page to not show
    checkout_loaded = ""
    # Pass through an initial context to timetable page
    context = {
        'date': date,
        'todays_sessions': todays_sessions,
        'existing_bookings': existing_bookings,
        'checkout_loaded': checkout_loaded
        }
    # Handle form submitted
    if request.method == "POST":
        # Get data currently entered into form
        context = handle_form(request)
    return render(request, 'classbooking_app/make_booking.html', context)


def view_bookings(request):
    # Save current user
    user = request.user
    # If form is submitted delete the relevant booking
    if request.method == "POST":
        booking_id = request.POST.get('cancel')
        delete_booking(user, booking_id)
    # Pass through the remaining users bookings
    bookings = Booking.objects.filter(user=user, confirmed=True)
    context = {
        'bookings': bookings
    }
    return render(request, 'classbooking_app/view_bookings.html', context)

