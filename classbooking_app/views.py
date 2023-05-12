from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Booking, Session
from datetime import date as dt


def load_home_page(request):
    return render(request, 'classbooking_app/home.html')


def create_booking(user, id, todays_sessions):
    # Get session associated with booking
    session = todays_sessions.filter(id=id)[0]
    # session = get_object_or_404(Session, id=id)
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


def show_sessions(request):
    user = request.user
    date = dt.today().strftime("%Y-%m-%d")
    old_date = date
    todays_sessions = Session.objects.filter(date=date)
    if request.method == "POST":
        date = request.POST.get('date_name')
        last_selected = request.POST.get('cart')
        remove = request.POST.get('remove')
        if last_selected != "":
            create_booking(user, last_selected, todays_sessions)
        elif remove != "":
            delete_booking(user, remove)
    if old_date != date:
        todays_sessions = Session.objects.filter(date=date)
    existing_bookings = Booking.objects.filter(user=user)
    context = {
        'date': date,
        'todays_sessions': todays_sessions,
        'existing_bookings': existing_bookings,
        }
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
