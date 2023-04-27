from django.contrib import admin
from .models import Session, Booking, Activity


admin.site.register(Activity)
admin.site.register(Session)
admin.site.register(Booking)


