from rest_framework import viewsets, permissions, status
from rest_framework.response import Response # For custom responses if needed
from .models import Appointment
from .serializers import AppointmentSerializer
from users.permissions import ( # Assuming permissions.py is in the 'users' app
    IsAdminUser, 
    IsStaffUser,
    IsClientUser,
    IsAppointmentOwner, 
    IsAppointmentStaff
)

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows appointments to be viewed or edited.
    Handles role-based access and queryset filtering.
    """
    serializer_class = AppointmentSerializer
    # queryset will be determined by get_queryset()

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Appointment.objects.none()

        if user.role == 'admin':
            return Appointment.objects.all().order_by('-date', '-time')
        elif user.role == 'staff':
            # Staff can see appointments assigned to them or where no staff is yet assigned (if applicable)
            return Appointment.objects.filter(staff=user).order_by('-date', '-time')
        elif user.role == 'client':
            return Appointment.objects.filter(client=user).order_by('-date', '-time')
        return Appointment.objects.none() # Default for any other unhandled authenticated role

    def get_permissions(self):
        user = self.request.user
        if not user.is_authenticated:
            self.permission_classes = [permissions.IsAuthenticated] # Will fail, but standard
            return [permission() for permission in self.permission_classes]

        if self.action == 'list':
            # Queryset is already filtered by get_queryset, so IsAuthenticated is enough here.
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create':
            # Any authenticated user can attempt to create.
            # perform_create will handle setting client/staff based on role.
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            # For object-level actions:
            # Admin can do anything.
            # Client can if they are the owner.
            # Staff can if they are assigned.
            # Using DRF's bitwise OR for combining permissions.
            self.permission_classes = [
                IsAdminUser | 
                (IsClientUser & IsAppointmentOwner) | 
                (IsStaffUser & IsAppointmentStaff)
            ]
        elif self.action == 'destroy':
            # Only admins can delete appointments
            self.permission_classes = [IsAdminUser]
        else:
            # Default to admin-only for any other actions
            self.permission_classes = [IsAdminUser]

        return [permission() for permission in self.permission_classes]

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == 'client':
            # Clients create appointments for themselves. Staff must be specified or handled by a workflow.
            serializer.save(client=user)
        elif user.role == 'staff':
            # Staff might create for a client, or be assigned.
            # If client is not in request.data, this might need adjustment
            # or validation that client is provided.
            # For now, assume client is provided in request.data if staff creates.
            # Staff can be auto-assigned if not provided.
            if 'staff' not in serializer.validated_data or serializer.validated_data['staff'] is None:
                serializer.save(staff=user)
            else:
                serializer.save()
        elif user.role == 'admin':
            # Admins can create appointments for any client and assign any staff.
            # All fields (client, staff, service) should be provided in request.data.
            serializer.save()
        else:
            # Should not happen if user is authenticated and has a role
            # Or handle as an error
            from django.core.exceptions import PermissionDenied
            raise PermissionDenied("You do not have a valid role to create appointments.")

