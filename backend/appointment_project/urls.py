"""
URL configuration for appointment_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path, include # Make sure include is imported
from users.cookie_views import (
    MyTokenObtainPairView,
    MyTokenRefreshView,
    LogoutView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('services.urls')),
    path('api/', include('appointments.urls')),
    path('api/auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # Renamed for clarity
    path('api/auth/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),   # Renamed for clarity
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')), # Added for DRF login/logout
]
