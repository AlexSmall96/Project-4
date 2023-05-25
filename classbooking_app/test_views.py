from django.test import TestCase

# Create your tests here.


class TestViews(TestCase):

    def test_load_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/home.html')
    
    # def test_load_login_page(self):

    # def test_load_signup_page(self):

    # def test_load_timetable_page(self):

    # def test_load_view_bookings_page(self):

    # def test_load_admin_page(self):

    # def test_can_signup(self):

    # def test_can_login(self):

    # def test_can_create_booking(self):

    # def test_can_cancel_booking(self):

    # def test_can_create_session(self):

    # def test_can_update_session(self):

    # def test_can_delete_session(self):
