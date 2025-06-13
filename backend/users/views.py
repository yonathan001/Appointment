from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer
from .permissions import IsSystemAdmin, IsOwnerOrSystemAdmin

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            # Anyone can create a new user (register)
            permission_classes = [permissions.AllowAny]
        elif self.action == 'list':
            # Only system admins can list all users
            permission_classes = [IsSystemAdmin]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            # Only the owner or a system admin can access a user's details
            permission_classes = [IsOwnerOrSystemAdmin]
        else:
            # For any other action, require authentication
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

