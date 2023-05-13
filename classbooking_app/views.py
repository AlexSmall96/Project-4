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


def checkout(request):
    user = request.user
    confirm_btn_class = "visible"
    confirm_msg_class = "invisible"
    if request.method == "POST":
        remove = request.POST.get('remove')
        if remove != "":
            delete_booking(user, remove)
        form_ready = request.POST.get('form-ready') == "y"
        if form_ready:
            confirm_bookings(user)
            confirm_btn_class = "invisible"
            confirm_msg_class = "visible"
    existing_bookings = Booking.objects.filter(user=user)
    form_value = "y"
    context = {
        'existing_bookings': existing_bookings,
        'confirm_btn_class': confirm_btn_class,
        'confirm_msg_class': confirm_msg_class,
        'form_value': form_value
        }
    return render(request, 'classbooking_app/checkout.html', context)


def load_timetable(request):
    user = request.user
    # Update date range to be a rolling 7 days
    todays_sessions = Session.objects.filter(date__range=["2023-05-13", "2023-05-19"]).order_by("date", "time")
    existing_bookings = Booking.objects.filter(user=user)
    if request.method == "POST":
        cart = request.POST.get('cart')
        cart_ids = cart.split()
        for session_id in cart_ids:
            create_booking(user, session_id)
        remove = request.POST.get('remove')
        remove_ids = remove.split()
        for session_id in remove_ids:
            delete_booking(user, session_id)
    existing_bookings = Booking.objects.filter(user=user)
    context = {
        'todays_sessions': todays_sessions,
        'existing_bookings': existing_bookings,
        }
    return render(request, 'classbooking_app/timetable.html', context)


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