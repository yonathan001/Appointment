from rest_framework import viewsets, permissions
from .models import Appointment
from .serializers import AppointmentSerializer
from users.permissions import IsAppointmentOwnerOrOrgAdminOrSystemAdmin

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for appointments.
    - Clients can create and manage their own appointments.
    - Organization admins can manage all appointments for their organization.
    - System admins have full control.
    """
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get_queryset(self):
        """
        Filter appointments based on the user's role.
        """
        user = self.request.user
        if not user.is_authenticated:
            return Appointment.objects.none()

        if user.role == 'system_admin':
            return Appointment.objects.all()
        elif user.role == 'organization_admin':
            try:
                # Get appointments for the organization managed by this admin.
                organization = user.organization_administered
                return Appointment.objects.filter(organization=organization)
            except AttributeError:
                # This user is an org admin but doesn't manage an organization.
                return Appointment.objects.none()
        elif user.role == 'client':
            # Clients can only see their own appointments.
            return Appointment.objects.filter(client=user)
        
        return Appointment.objects.none()

    def get_permissions(self):
        """
        Set permissions based on the action.
        """
        if self.action == 'create':
            # Only authenticated users can create appointments.
            permission_classes = [permissions.IsAuthenticated]
        elif self.action in ['update', 'partial_update', 'destroy', 'retrieve']:
            # Use object-level permissions for viewing/editing/deleting.
            permission_classes = [IsAppointmentOwnerOrOrgAdminOrSystemAdmin]
        else:
            # For list view, permissions are handled by get_queryset.
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """
        When an appointment is created, set the client to the current user
        and derive the organization from the selected service.
        """
        service = serializer.validated_data['service']
        serializer.save(
            client=self.request.user,
            organization=service.organization
        )

