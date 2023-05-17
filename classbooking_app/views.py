from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Activity, Session, Booking
from datetime import date, timedelta


def load_home_page(request):
    return render(request, 'classbooking_app/home.html')


def name_to_id(activity):
    names = {
        'Boxfit':	1,
        'Kettlebell Chaos':	2,
        'Yoga':	3,
        'Spin':	4,
        'Body Burn': 5,
        'Pilates':	6,
        'Mindfulness': 7,
        'HIIT':	8,
        'Treadmill Torture': 9
    }
    return names[activity]


def update_session(request, id):
    session = get_object_or_404(Session, id=id)
    name = request.POST.get(id + '-activity')
    activity = get_object_or_404(Activity, id=name_to_id(name))
    session.activity = activity
    session.date = request.POST.get(id + '-date')
    session.time = request.POST.get(id + '-time')
    session.location = request.POST.get(id + '-location')
    session.spaces = request.POST.get(id + '-spaces')
    if request.POST.get(id + '-running') == "on":
        session.running = True
    else:
        session.running = False
    session.save()


def delete_session(id):
    session = get_object_or_404(Session, id=id)
    session.delete()


def admin_page(request):
    # Default date filter to today
    date_filter = date.today().strftime("%Y-%m-%d")
    range_strt = date.today()
    range_end = (date.today() + timedelta(days=27))
    range = [range_strt, range_end]
    # Default location and activity filters to all
    location_filter = 'All'
    activity_filter = 'All'
    update_feedback_field = ""
    delete_feedback_field = ""
    # Load todays sessions
    sessions = Session.objects.filter(date=date_filter).order_by("date", "time")
    # Get all activities and locations to use as dropdown for filters
    activities = Activity.objects.all()
    locations = Session.objects.all().values_list(
        'location', flat=True).distinct()
    # If data has been sent through form
    if request.method == "POST":
        # Update filters for date, activity and location
        update_id = request.POST.get('update-field')
        if update_id != "":
            update_session(request, update_id)
            update_feedback_field = "y"
        delete_id = request.POST.get('delete-field')
        if delete_id != "":
            # delete_session(delete_id)
            delete_feedback_field = "y"
        date_filter = request.POST.get("date-filter")
        activity_filter = request.POST.get('activity-filter')
        location_filter = request.POST.get('location-filter')
        if date_filter != "":
            sessions = Session.objects.filter(
                date=date_filter).order_by("date", "time")
        else:
            sessions = Session.objects.filter(
                date__range=range).order_by("date", "time")
        if activity_filter != "All":
            activity_id = name_to_id(activity_filter)
            sessions = sessions.filter(activity=activity_id)
        if location_filter != "All":
            sessions = sessions.filter(location=location_filter)
    context = {
        'date_filter': date_filter,
        'location_filter': location_filter,
        'activity_filter': activity_filter,
        'sessions': sessions,
        'activities': activities,
        'locations': locations,
        'update_feedback_field': update_feedback_field,
        'delete_feedback_field': delete_feedback_field
    }
    return render(request, 'classbooking_app/admin.html', context)


def create_booking(user, id):
    # Get session associated with booking
    session = get_object_or_404(Session, id=id)
    if len(Booking.objects.filter(session=session, user=user)) == 0:
        # Create booking
        booking = Booking(
            session=session,
            user=user,
            confirmed=False
            )
        booking.save()


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
    confirmed = ""
    cart = ""
    cancel_id = ""
    range_strt = date.today()
    range_end = (date.today() + timedelta(days=6))
    range = [range_strt, range_end]
    todays_sessions = Session.objects.filter(date__range=range).order_by(
        "date",
        "time")
    existing_bookings = Booking.objects.filter(user=user)
    if request.method == "POST":
        cart = request.POST.get('cart')
        cart_ids = cart.split()
        confirmed = request.POST.get('confirmed')
        for session_id in cart_ids:
            create_booking(user, session_id)
        cancel_id = request.POST.get("cancel-timetable")
        if cancel_id != "":
            delete_booking(user, cancel_id)
            cancel_id = int(cancel_id)
    existing_bookings = Booking.objects.filter(user=user)
    context = {
        'todays_sessions': todays_sessions,
        'existing_bookings': existing_bookings,
        'confirmed': confirmed,
        'cart': cart,
        'cancel_id': cancel_id,
        'range_strt': range_strt,
        'range_end': range_end
        }
    return render(request, 'classbooking_app/timetable.html', context)


def view_bookings(request):
    # Save current user
    user = request.user
    cancel_id = ""
    bookings = Booking.objects.filter(user=user)
    context = {
        'bookings': bookings,
        'cancel_id': cancel_id,
        }
    # If form is submitted delete the relevant booking
    if request.method == "POST":
        cancel_id = request.POST.get('cancel')
        delete_booking(user, cancel_id)
        bookings = Booking.objects.filter(user=user)
        cancelled_session = get_object_or_404(Session, id=cancel_id)
        context = {
            'bookings': bookings,
            'cancel_id': cancel_id,
            'cancelled_session': cancelled_session
            }
    # Pass through the remaining users bookings
    return render(request, 'classbooking_app/view_bookings.html', context)