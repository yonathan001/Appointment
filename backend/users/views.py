from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer
from .permissions import IsAdminUser, IsOwnerOrAdmin

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
            # Allow any user to create a new user (register)
            permission_classes = [permissions.AllowAny]
        elif self.action == 'list':
            # Only admins can list all users
            permission_classes = [IsAdminUser]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            # For actions on a specific user instance,
            # allow if the user is the owner or an admin.
            permission_classes = [IsOwnerOrAdmin]
        else:
            # Default to IsAdminUser for other actions or if IsAuthenticated is preferred as a base
            permission_classes = [permissions.IsAuthenticated] # Or IsAdminUser if stricter default needed
        return [permission() for permission in permission_classes]

