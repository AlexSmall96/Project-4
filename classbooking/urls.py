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
from django.urls import path, include
from classbooking_app import views


urlpatterns = [
    path('register.html', views.register, name='register'),
    path('admin/', admin.site.urls),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', views.load_home_page, name='load_home_page'),
    path('timetable.html', views.load_timetable, name='load_timetable'),
    path(
        'members_area.html',
        views.load_members_area,
        name='load_members_area'),
    path(
        'signup_details.html',
        views.load_signup_details_page,
        name='load_signup_details_page'),
    path('admin.html', views.admin_page, name='admin_page'),
]
