from django.shortcuts import render, redirect
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
    if request.method == "POST":
        name = request.POST.get('booking_name')
        Booking.objects.create(
            name=name,
            date='2023-05-01',
            time='10:00',
            spaces=25,
            location='Studio A',
            running=True
        )
        return redirect('get_bookings')
    return render(request, 'classbooking_app/make_booking.html')