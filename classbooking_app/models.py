from django.db import models
from datetime import date, datetime


class Session(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False, default="test_class")
    date = models.DateField(default=date.today())
    time = models.TimeField(default=datetime.now())
    spaces = models.IntegerField(default=25)
    location = models.CharField(max_length=50, default='Studio A')
    running = models.BooleanField(default=True)
    attendees = models.CharField(max_length=500, null=False, blank=False, default="")

    def __str__(self):
        return self.name


class Booking(models.Model):
    session_id = models.ForeignKey(Session, on_delete=models.CASCADE)
    user = models.CharField(max_length=50, null=False, blank=False, default="test_user")
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return self.user