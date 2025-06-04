from rest_framework import viewsets
from .models import Service
from .serializers import ServiceSerializer
# from rest_framework.permissions import IsAdminUser # Or custom permissions for who can manage services

class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows services to be viewed or edited.
    """
    queryset = Service.objects.all().order_by('name')
    serializer_class = ServiceSerializer
    # permission_classes = [IsAdminUser] # Example: Only admins can create/edit services

