from django.db import models
from datetime import date, datetime

# Create your models here.


class Booking(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False),
    date = models.DateField(default=date.today()),
    time = models.TimeField(default=datetime.now()),
    spaces = models.IntegerField(),
    location = models.CharField(max_length=50, null=False, blank=False),
    user = models.CharField(max_length=50, null=False, blank=False),
    running = models.BooleanField(default=True)

    def __str__(self):
        return self.name