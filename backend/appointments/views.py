from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Appointment, Service
from .serializers import AppointmentSerializer, ServiceSerializer
from users.permissions import IsAdminUser, IsStaffUser

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Appointment.objects.all()
        elif user.role == 'staff':
            return Appointment.objects.filter(staff=user)
        else:  # client
            return Appointment.objects.filter(client=user)
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsStaffUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        # Automatically set the client to the current user if they're a client
        if self.request.user.role == 'client':
            serializer.save(client=self.request.user)
        else:
            serializer.save()
