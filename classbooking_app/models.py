from django.db import models
from datetime import date, datetime

class Activity(models.Model):
    name = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        default="test_class"
        )
    description = models.CharField(
        max_length=200,
        null=False,
        blank=False,
        default="test_description"
        )
    image = models.CharField(
        max_length=20,
        null=False,
        blank=False,
        default="test_image")
    capacity = models.IntegerField(
        null=False,
        blank=False,
        default=25
    )
    duration = models.CharField(
        max_length=5,
        null=False,
        blank=False,
        default="1hr"
    )

    def __str__(self):
        return self.name


class Session(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    date = models.DateField(default=date.today())
    time = models.TimeField(default=datetime.now())
    spaces = models.IntegerField(default=25)
    location = models.CharField(max_length=50, default='Studio A')
    running = models.BooleanField(default=True)

    def __str__(self):
        return self.activity.name

        class Meta:
            ordering = ["time"]


class Booking(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    user = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        default="test_user"
        )

    def __str__(self):
        return self.user
