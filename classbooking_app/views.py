from django.shortcuts import render
from .models import Booking


# Load basic html template
def get_bookings(request):
    bookings = Booking.objects.all()
    context = {
        'bookings': bookings
    }
    return render(request, 'classbooking_app/bookings.html', context)


# Load make_bookings.html
# Create instance of booking from form data
def make_booking(request):
    return render(request, 'classbooking_app/make_booking.html')