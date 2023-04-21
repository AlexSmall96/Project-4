from django.shortcuts import render, redirect
from .models import Booking


# Load basic html template
def get_bookings(request):
    bookings = Booking.objects.all()
    context = {
        'bookings': bookings
    }
    return render(request, 'classbooking_app/bookings.html', context)


activities = {'boxfit':'10:00', 'kettlebells':'11:00', 'yoga':'12:00'}

# Load make_bookings.html
# Create instance of booking from form data
def make_booking(request):
    if request.method == "POST":
        for act in activities:
            if request.POST.get(act) == 'on':
                Booking.objects.create(
                    name=act,
                    date='2023-05-01',
                    time=activities[act],
                    spaces=25,
                    location='Studio A',
                    user='test_user_3',
                    running=True
                    )
        return redirect('get_bookings')
    return render(request, 'classbooking_app/make_booking.html')