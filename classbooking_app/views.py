from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from .models import Activity, Session, Booking
from datetime import datetime, date, timedelta
import time
from django.utils import timezone
from itertools import chain


def load_home_page(request):
    """
    Loads the home page as default view for site
    """
    return render(request, 'classbooking_app/home.html')


def load_signup_details_page(request):
    """
    Loads the mock sign up page with membership options, contact details
    and payment
    """
    return render(request, 'classbooking_app/signup_details.html')


def register(request):
    """
    Loads the page where members can register an account.
    The code for this view was taken from the following tutorial:
    https://overiq.com/django-1-10/django-creating-users-using-usercreationform/
    """
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account created successfully')
            return redirect('register')
    else:
        form = UserCreationForm()

    return render(request, 'classbooking_app/register.html', {'form': form})


def name_to_id(activity):
    """
    Converts activity names into ids
    """
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


def create_session(request, id):
    """
    Used by admin page to create a session
    """
    # Get session details
    name = request.POST.get(id + '-activity')
    activity = get_object_or_404(Activity, id=name_to_id(name))
    date = request.POST.get(id + '-date')
    time = request.POST.get(id + '-time')
    location = request.POST.get(id + '-location')
    spaces = request.POST.get(id + '-spaces')
    if request.POST.get(id + '-running') == "on":
        running = True
    else:
        running = False
    # Check for clash
    clash = len(Session.objects.filter(
        date=date,
        time=time,
        location=location,
        running=True
        )) > 0
    if clash:
        # Feedback to user
        return f"""
        Session not created. Another session is already taking place
        in {location} on {date} at {time}.
        """
    else:
        session = Session(
            activity=activity,
            date=date,
            time=time,
            spaces=spaces,
            location=location,
            running=running
        )
        session.save()
        return f"""
        Thank you a session for {name} on {date} at {time} in {location}
        has been created.
        """


def update_session(request, id):
    """
    Used by admin page to update a session
    """
    # Get session user wishes to update
    session = get_object_or_404(Session, id=id)
    name = request.POST.get(id + '-activity')
    activity = get_object_or_404(Activity, id=name_to_id(name))
    date = request.POST.get(id + '-date')
    time = request.POST.get(id + '-time')
    location = request.POST.get(id + '-location')
    running = request.POST.get(id + '-running') == "on"
    same_session = len(Session.objects.filter(
        activity=activity,
        date=date,
        time=time,
        location=location)) > 0
    # Check for clash in new details
    clashes = Session.objects.filter(
        date=date,
        time=time,
        location=location,
        running=True
    )
    clash = len(clashes) > 0
    if clash:
        same_session = int(clashes[0].id) == int(id)
    if clash and not same_session:
        # feedback to user
        return f"""
        Changes not saved. Another session is already taking place in
        {location} on {date} at {time}.
        """
    else:
        session.activity = activity
        session.date = date
        session.time = time
        session.location = location
        session.running = running
        session.spaces = request.POST.get(id + '-spaces')
        session.save()
        # feedback to user
        return f"Thank you, your {name} session details have been updated."


def delete_session(id):
    """
    Used by admin page to delete a session
    """
    # Get session
    session = Session.objects.filter(id=id)
    if len(session) > 0:
        session = session[0]
        name = session.activity.name
        date = session.date
        time = session.time
        location = session.location
        session.delete()
        # Feedback to user
        return f"""
        Thank you, your {name} session on {date} at {time}
        in {location} has been deleted.
        """
    else:
        return ""


def admin_page(request):
    """
    Only accessed by a superuser, loads the admin page which allows superuser
    to edit the timetable
    """
    if not request.user.is_superuser:
        messages.error(request, 'This page for admin access only.')
        return redirect('/')
    else:
        # Default date filter to today
        date_filter = date.today().strftime("%Y-%m-%d")
        range_strt = date.today()
        range_end = (date.today() + timedelta(days=27))
        range = [range_strt, range_end]
        # Default location and activity filters to all
        location_filter = 'All'
        activity_filter = 'All'
        feedback = ""
        # Load todays sessions
        sessions = Session.objects.filter(date=date_filter).order_by(
            "date", "time")
        if len(Session.objects.all()) > 0:
            max_id = list(Session.objects.all().values_list(
                'id', flat=True).order_by('-id'))[0]
        else:
            max_id = 999000
        # Get all activities and locations to use as dropdown for filters
        activities = Activity.objects.all()
        locations = Session.objects.all().values_list(
            'location', flat=True).distinct()
        # Process form data
        if request.method == "POST":
            update_id = request.POST.get('update-field')
            if update_id != "":
                feedback = update_session(request, update_id)
            delete_id = request.POST.get('delete-field')
            if delete_id != "":
                feedback = delete_session(delete_id)
            create_id = request.POST.get('create-field')
            if create_id != "":
                feedback = create_session(request, create_id)
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
            'feedback': feedback,
            'max_id': max_id
        }
        return render(request, 'classbooking_app/admin.html', context)


def create_booking(user, id):
    """
    Used by timetable page to create bookings
    """
    # Get session associated with booking
    session = get_object_or_404(Session, id=id)
    if len(Booking.objects.filter(session=session, user=user)) == 0:
        # Create booking
        booking = Booking(
            session=session,
            user=user,
            )
        booking.save()
        # Update session spaces
        spaces_taken = len(Booking.objects.filter(session=session))
        session.spaces = session.activity.capacity - spaces_taken
        session.save()
        # Feedback result to user
        return f"Thanks for confirming, your classes have been booked."


def delete_booking(user, id):
    """
    Allows members to cancel bookings via timetable or members area page
    """
    # Get session associated with booking
    session = get_object_or_404(Session, id=id)
    bookings = Booking.objects.filter(user=user, session=session).delete()
    # Update session spaces
    spaces_taken = len(Booking.objects.filter(session=session))
    session.spaces = session.activity.capacity - spaces_taken
    session.save()
    # Feedback result to user
    return f"""
    Thanks for confirming, your booking for {session.activity.name}
     at {session.time} on {session.date} has been cancelled.
     """


def load_timetable(request):
    """
    Loads the timetable page
    """
    if not request.user.is_authenticated:
        return redirect('/')
    else:
        # Get current user
        user = request.user
        confirmed = ""
        cart = ""
        cancel_id = ""
        timtbl_feedback = ""
        # Set date range
        today = date.today()
        tomorrow = date.today() + timedelta(days=1)
        next_week = (date.today() + timedelta(days=6))
        now = datetime.now()
        # Load the weeks data
        weeks_sessions = Session.objects.filter(
            date__range=[tomorrow, next_week]).order_by("date", "time")
        todays_sessions = Session.objects.filter(
            date=today, time__gte=now).order_by("date", "time")
        if len(todays_sessions) == 0:
            tab_range = [tomorrow, next_week]
            active_date = tomorrow
        else:
            tab_range = [today, next_week]
            active_date = today
        dates = Session.objects.filter(date__range=tab_range).values_list(
            'date', flat=True).distinct().order_by("date")
        existing_bookings = Booking.objects.filter(user=user)
        # Process form data
        if request.method == "POST":
            cart = request.POST.get('cart')
            cart_ids = cart.split()
            confirmed = request.POST.get('confirmed')
            for session_id in cart_ids:
                timtbl_feedback = create_booking(user, session_id)
            cancel_id = request.POST.get("cancel-timetable")
            if cancel_id != "":
                timtbl_feedback = delete_booking(user, cancel_id)
                cancel_id = int(cancel_id)
        # Redefine bookings
        existing_bookings = Booking.objects.filter(user=user)
        # Pass data through to browser
        context = {
            'todays_sessions': todays_sessions,
            'weeks_sessions': weeks_sessions,
            'todays_sessions': todays_sessions,
            'dates': dates,
            'existing_bookings': existing_bookings,
            'confirmed': confirmed,
            'cart': cart,
            'cancel_id': cancel_id,
            'today': today,
            'active_date': active_date,
            'timtbl_feedback': timtbl_feedback
            }
        return render(request, 'classbooking_app/timetable.html', context)


def load_members_area(request):
    """
    Loads Members Area page
    """
    if not request.user.is_authenticated:
        return redirect('/')
    else:
        # Set the feedback message to empty as no form has been submitted yet
        member_feedback = ""
        # Save current user
        user = request.user
        # Get current date and time
        current_date = date.today()
        now = datetime.now()
        # Get bookings for next week starting from tomorrow
        date_min = current_date + timedelta(days=1)
        bookings = Booking.objects.filter(
            user=user,
            session__date__gte=date_min
            ).order_by("session__date", "session__time")
        # Get todays bookings where the class is still to occur
        todays_bookings = Booking.objects.filter(
            user=user,
            session__date=current_date,
            session__time__gte=now).order_by("session__date", "session__time")
        # Count the total number of users bookings
        no_tot_bookings = len(todays_bookings) + len(bookings)
        # Check if form has been submitted
        if request.method == "POST":
            # Get id of session associated with booking the user
            # wishes to cancel
            cancel_id = request.POST.get('cancel')
            # Delete booking and return feedback message
            member_feedback = delete_booking(user, cancel_id)
            # Update the users bookings list
            bookings = Booking.objects.filter(
                user=user,
                session__date__gte=date_min
                ).order_by("session__date", "session__time")
            todays_bookings = Booking.objects.filter(
                user=user,
                session__date=current_date,
                session__time__gte=now).order_by(
                    "session__date", "session__time")
            # Update count of total bookings
            no_tot_bookings = len(todays_bookings) + len(bookings)
        # Save variables as context to pass through to browswer
        context = {
            'member_feedback': member_feedback,
            'todays_bookings': todays_bookings,
            'bookings': bookings,
            'current_date': current_date,
            'no_tot_bookings': no_tot_bookings,
            }
        # Pass through the remaining users bookings
        return render(request, 'classbooking_app/members_area.html', context)
