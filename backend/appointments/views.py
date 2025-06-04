from rest_framework import viewsets, permissions
from .models import Appointment
from .serializers import AppointmentSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows appointments to be viewed or edited.
    """
    queryset = Appointment.objects.all().order_by('-date', '-time')
    serializer_class = AppointmentSerializer
    # permission_classes = [permissions.IsAuthenticated] # Default is already set in settings

    # We can refine permissions and queryset filtering later.
    # For example, to ensure users can only see/manage their own appointments
    # or based on their role.
    # def get_queryset(self):
    #     user = self.request.user
    #     if user.is_staff or user.role == 'admin':
    #         return Appointment.objects.all().order_by('-date', '-time')
    #     elif user.role == 'client':
    #         return Appointment.objects.filter(client=user).order_by('-date', '-time')
    #     return Appointment.objects.none() # Should not happen if authenticated

    # def perform_create(self, serializer):
    #     # Automatically set the client to the current user when creating an appointment
    #     if self.request.user.is_authenticated and self.request.user.role == 'client':
    #         serializer.save(client=self.request.user)
    #     else:
    #         # Or handle cases where staff/admin creates for others
    #         # This might require 'client' to be explicitly passed in request data
    #         serializer.save()

