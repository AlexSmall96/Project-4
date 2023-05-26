from django.test import TestCase
from django.shortcuts import get_object_or_404
from .models import Activity, Session, Booking
# Create your tests here.


class TestViews(TestCase):

    def test_load_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/home.html')

    def test_load_timetable(self):
        response = self.client.get('/timetable.html')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/timetable.html')   

    def test_load_view_bookings(self):
        response = self.client.get('/view_bookings.html')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/view_bookings.html')   

    def test_load_admin_page(self):
        response = self.client.get('/admin.html')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/admin.html')

    # def test_load_login_page(self):

    # def test_load_signup_page(self):

    # def test_can_signup(self):

    # def test_can_login(self):

    # def test_can_cancel_booking(self):

    # def test_can_create_session(self):

    # def test_can_update_session(self):

    # def test_can_delete_session(self):


class TestViewActions(TestCase):

    def test_can_create_booking(self):
        session = get_object_or_404(Session, id="145054")
        booking = Booking.objects.create(session=session, user="test_user")
        self.assertEqual(booking.session, session)
        self.assertEqual(booking.session.id, id)
