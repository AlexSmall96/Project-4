from django.shortcuts import render, redirect, get_object_or_404
from .models import Booking, Session


# Load basic html template
def get_bookings(request):
    bookings = Booking.objects.all()
    context = {
        'bookings': bookings
    }
    return render(request, 'classbooking_app/bookings.html', context)


activities = {'boxfit': '10:00', 'kettlebells': '11:00', 'yoga': '12:00'}


# Load make_bookings.html
# Create instance of booking from form data
def show_sessions(request):
    if request.method == "POST":
        date = request.POST.get('date_name')
        cart = request.POST.get('cart')
        user = request.POST.get('user_name')
        form_complete = request.POST.get('form-complete')
        todays_sessions = Session.objects.filter(date=date)
        context = {
            'todays_sessions': todays_sessions,
            'date' : date,
            'cart':cart,
            'user':user,
            }
        if form_complete == "on":
            session = get_object_or_404(Session, id=145040)
            session.attendees = user
            session.save()
        return render(request, 'classbooking_app/make_booking.html', context)
    return render(request, 'classbooking_app/make_booking.html')
    


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


