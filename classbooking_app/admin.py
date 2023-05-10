from django.contrib import admin
from .models import Session, Booking, Activity
from django_summernote.admin import SummernoteModelAdmin


class ActivityAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "capacity"
        )


class SessionAdmin(SummernoteModelAdmin):
    list_display = (
        "activity",
        "date",
        "time",
        "location",
        "spaces",
        "running"
        )

    list_filter = ['activity', 'date', 'time', 'location', 'running']


class BookingAdmin(SummernoteModelAdmin):
    list_display = (
        "user",
        "session",
        "date",
        "time",
        "confirmed"
        )

    list_filter = ['user', 'session', 'confirmed']

    def date(self, obj):
        return obj.session.date

    def time(self, obj):
        return obj.session.time


admin.site.register(Activity, ActivityAdmin)
admin.site.register(Session, SessionAdmin)
admin.site.register(Booking, BookingAdmin)
