from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Service
from .serializers import ServiceSerializer
from users.permissions import IsOrganizationAdmin, IsServiceOrganizationAdminOrSystemAdmin

class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for services. Organization admins can create services for their
    organization. System admins have full control.
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_permissions(self):
        if self.action == 'create':
            # Only organization admins can create services.
            permission_classes = [IsOrganizationAdmin]
        elif self.action in ['update', 'partial_update', 'destroy']:
            # Check object-level permissions for editing/deleting.
            permission_classes = [IsServiceOrganizationAdminOrSystemAdmin]
        else:
            # Authenticated users can view services.
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """
        When an organization admin creates a service, it's automatically
        assigned to their organization.
        """
        try:
            # request.user.organization_administered will exist due to the OneToOneField
            organization = self.request.user.organization_administered
            serializer.save(organization=organization)
        except AttributeError:
            # This case handles if a non-org-admin somehow bypasses permissions.
            # Or if a system admin tries to create a service this way (they should use the admin panel or a different flow).
            # We prevent creation by raising an error, though this should ideally not be reached.
            # A better implementation might allow system admins to specify the organization ID in the request.
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied('You do not have an organization to which you can add a service.')

