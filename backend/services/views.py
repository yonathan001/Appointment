from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Service
from .serializers import ServiceSerializer
from users.permissions import IsAdminUser # Import our custom permission

class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows services to be viewed or edited.
    """
    queryset = Service.objects.all().order_by('name')
    serializer_class = ServiceSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            # For actions that modify data, only allow admin users
            permission_classes = [IsAdminUser]
        else:
            # For list and retrieve actions, allow any authenticated user
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

