from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet, ServiceViewSet

router = DefaultRouter()
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
