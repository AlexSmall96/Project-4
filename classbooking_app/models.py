from django.db import models
from datetime import date, datetime

# Create your models here.


class Booking(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False, default= "test_class")
    date = models.DateField(default=date.today())
    time = models.TimeField(default=datetime.now())
    spaces = models.IntegerField(default=25)
    location = models.CharField(max_length=50, default='Studio A')
    user = models.CharField(max_length=50, null=False, blank=False,default="test_user")
    running = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Session(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False, default="test_class")
    date = models.DateField(default=date.today())
    time = models.TimeField(default=datetime.now())
    spaces = models.IntegerField(default=25)
    location = models.CharField(max_length=50, default='Studio A')
    running = models.BooleanField(default=True)

    def __str__(self):
        return self.name