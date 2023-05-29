from django.test import TestCase
from django.shortcuts import get_object_or_404
from .models import Activity, Session, Booking
from .views import create_booking, delete_booking, delete_session


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
            spaces=20,
            location='Studio A',
            running=True
        )
        self.assertEqual(Session.objects.filter(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=20,
            location='Studio A',
            running=True
        ).exists(), True)
        self.assertEqual(session.activity, activity)
        self.assertEqual(session.date, "2023-05-07")
        self.assertEqual(session.time, "07:00")
        self.assertEqual(session.spaces, 20)
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
            spaces=20,
            location='Studio A',
            running=True
        )
        session.date = "2023-05-08"
        session.time = "08:00"
        session.spaces = 19
        session.location = 'Studio B'
        session.running = False
        session.save()
        self.assertEqual(session.date, "2023-05-08")
        self.assertEqual(session.time, "08:00")
        self.assertEqual(session.spaces, 19)
        self.assertEqual(session.location, 'Studio B')
        self.assertEqual(session.running, False)

    def test_can_delete_session_manually(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        session = Session.objects.create(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=20,
            location='Studio A',
            running=True
        )
        session.delete()
        self.assertEqual(Session.objects.filter(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=20,
            location='Studio A',
            running=True
        ).exists(), False)

    def test_can_delete_session_via_function(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        session = Session.objects.create(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=20,
            location='Studio A',
            running=True
        )
        id = session.id
        self.assertEqual(Session.objects.filter(id=id).exists(), True)
        feedback = delete_session(id)
        self.assertEqual(Session.objects.filter(id=id).exists(), False)
        self.assertEqual(feedback, "Thank you, your test_activity session on 2023-05-07 at 07:00:00 in Studio A has been deleted.")


class TestBooking(TestCase):

    def test_can_create_booking_manually(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        session = Session.objects.create(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=20,
            location='Studio A',
            running=True
        )
        booking = Booking.objects.create(
            user='username1',
            session=session
        )
        self.assertEqual(
            Booking.objects.filter(
                user='username1',
                session=session).exists(), True
                )
        self.assertEqual(booking.session, session)
        self.assertEqual(booking.user, 'username1')

    def test_can_create_booking_via_function(self):
        activity = Activity.objects.create(
            name='test_activity',
            description='test_description',
            capacity=20,
            duration='1hr')
        session = Session.objects.create(
            activity=activity,
            date="2023-05-07",
            time="07:00",
            spaces=20,
            location='Studio A',
            running=True
        )
        user = 'username1'
        id = session.id
        feedback = create_booking(user, id)
        session.save()
        self.assertEqual(
            Booking.objects.filter(
                user=user,
                session=session
            ).exists(), True)
        self.assertEqual(feedback, "Thanks for confirming, your classes have been booked.")

    def test_can_delete_booking_manually(self):
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
        user = 'usernam1'
        booking = Booking.objects.create(
            user=user,
            session=session
        )
        booking.delete()
        self.assertEqual(Booking.objects.filter(
            user=user,
            session=session
            ).exists(), False)

    def test_can_delete_booking_via_function(self):
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
        user = 'username1'
        booking = Booking.objects.create(
            user=user,
            session=session
        )
        id = session.id
        feedback = delete_booking(user, id)
        self.assertEqual(
            Booking.objects.filter(
                user=user,
                session=session
            ).exists(), False
        )
        self.assertEqual(feedback, "Thanks for confirming, your booking for test_activity at 07:00:00 on 2023-05-07 has been cancelled.")


class TestCascades(TestCase):

    def test_activity_cascades(self):
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
        user = 'username1'
        booking = Booking.objects.create(
            user=user,
            session=session
        )
        self.assertEqual(session.activity.name, 'test_activity')
        self.assertEqual(session.activity.description, 'test_description')
        self.assertEqual(session.activity.capacity, 20)
        self.assertEqual(session.activity.duration, '1hr')
        self.assertEqual(booking.session.activity.name, 'test_activity')
        self.assertEqual(booking.session.activity.description, 'test_description')
        self.assertEqual(booking.session.activity.capacity, 20)
        self.assertEqual(booking.session.activity.duration, '1hr')
        activity.name = 'test_activity_2'
        activity.description = 'test_description_2'
        activity.capacity = 15
        activity.duration = '30m'
        self.assertEqual(session.activity.name, 'test_activity_2')
        self.assertEqual(session.activity.description, 'test_description_2')
        self.assertEqual(session.activity.capacity, 15)
        self.assertEqual(session.activity.duration, '30m')
        self.assertEqual(booking.session.activity.name, 'test_activity_2')
        self.assertEqual(booking.session.activity.description, 'test_description_2')
        self.assertEqual(booking.session.activity.capacity, 15)
        self.assertEqual(booking.session.activity.duration, '30m')

    def test_session_cascades(self):
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
        user = 'username1'
        booking = Booking.objects.create(
            user=user,
            session=session
        )
        self.assertEqual(booking.session.date, "2023-05-07")
        self.assertEqual(booking.session.time, "07:00")
        self.assertEqual(booking.session.spaces, 25)
        self.assertEqual(booking.session.location, 'Studio A')
        self.assertEqual(booking.session.running, True)
        session.date = "2023-05-08"
        session.time = "08:00"
        session.spaces = 20
        session.location = 'Studio B'
        session.running = False
        session.save()
        self.assertEqual(booking.session.date, "2023-05-08")
        self.assertEqual(booking.session.time, "08:00")
        self.assertEqual(booking.session.spaces, 20)
        self.assertEqual(booking.session.location, 'Studio B')
        self.assertEqual(booking.session.running, False)