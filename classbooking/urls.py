"""classbooking URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from classbooking_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.load_home_page, name='load_home_page'),
    path('make_booking.html', views.show_sessions, name='show_sessions'),
    path('login.html', views.login_page, name='login_page'),
    path('edit/<booking_id>', views.edit_booking, name='edit'),
    path('toggle/<booking_id>', views.toggle_booking, name='toggle'),
    path('delete/<booking_id>', views.delete_booking, name='delete'),
    path('checkout.html', views.checkout, name='checkout')
]
