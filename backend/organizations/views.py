from rest_framework import viewsets, permissions
from .models import Organization
from .serializers import OrganizationSerializer
from users.permissions import IsSystemAdmin, IsOrganizationAdminOwnerOrSystemAdmin

class OrganizationViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows organizations to be viewed or edited.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            # Only system admins can create a new organization
            permission_classes = [IsSystemAdmin]
        elif self.action in ['update', 'partial_update', 'destroy']:
            # Only the organization's admin or a system admin can edit
            permission_classes = [IsOrganizationAdminOwnerOrSystemAdmin]
        else:
            # Anyone authenticated can list or view organizations
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

