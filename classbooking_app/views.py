from django.shortcuts import render
from .models import Booking
# Create your views here.

def get_bookings(request):
    bookings = Booking.objects.all()
    context = {
        'bookings' : bookings
    }
    return render(request, 'classbooking_app/bookings.html', context)