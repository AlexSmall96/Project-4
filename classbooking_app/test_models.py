from django.test import TestCase
from django.shortcuts import get_object_or_404
from .models import Activity, Session, Booking
from datetime import datetime


class TestActivity(TestCase):

    def test_can_create_activity(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        self.assertEqual(Activity.objects.filter(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr'
        ).exists(), True)
        self.assertEqual(activity.name, 'test_activity')
        self.assertEqual(activity.description, 'test_description')
        self.assertEqual(activity.capacity, 20)
        self.assertEqual(activity.duration, '1hr')

    def test_can_update_activity(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        activity.name = 'test_activity_2'
        activity.description = 'test_description_2'
        activity.capacity = 15
        activity.duration = '30m'
        activity.save()
        self.assertEqual(activity.name, 'test_activity_2')
        self.assertEqual(activity.description, 'test_description_2')
        self.assertEqual(activity.capacity, 15)
        self.assertEqual(activity.duration, '30m')

    def test_can_delete_activity(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        activity.delete()
        self.assertEqual(Activity.objects.filter(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr'
        ).exists(), False)


class TestSession(TestCase):

    def test_can_create_session(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        session = Session.objects.create(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=25,
            location='Studio A',
            running=True
        )
        self.assertEqual(Session.objects.filter(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=25,
            location='Studio A',
            running=True
        ).exists(), True)
        self.assertEqual(session.activity, activity)
        self.assertEqual(session.date, "2023-05-07")
        self.assertEqual(session.time, "07:00")
        self.assertEqual(session.spaces, 25)
        self.assertEqual(session.location, 'Studio A')
        self.assertEqual(session.running, True)

    def test_can_update_session(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        session = Session.objects.create(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=25,
            location='Studio A',
            running=True
        )
        session.date = "2023-05-08"
        session.time = "08:00"
        session.spaces = 24
        session.location = 'Studio B'
        session.running = False
        session.save()
        self.assertEqual(session.date, "2023-05-08")
        self.assertEqual(session.time, "08:00")
        self.assertEqual(session.spaces, 24)
        self.assertEqual(session.location, 'Studio B')
        self.assertEqual(session.running, False)
