from django.test import TestCase
from django.shortcuts import get_object_or_404
from .models import Activity, Session, Booking
from datetime import datetime


class TestLoadPages(TestCase):
    # Test that unrestricted pages can be loaded
    def test_load_home_page(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/home.html')

    def test_load_signup_details_page(self):
        response = self.client.get('/signup_details.html')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/signup_details.html')

    def test_load_register_page(self):
        response = self.client.get('/register.html')
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'classbooking_app/register.html')

