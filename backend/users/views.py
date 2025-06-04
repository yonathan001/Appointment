from rest_framework import viewsets
from .models import CustomUser
from .serializers import UserSerializer
# from rest_framework.permissions import IsAdminUser # Example for more specific permissions

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [IsAdminUser] # For stricter control, e.g., only admins can manage users
    # For now, we'll rely on the default IsAuthenticated from settings.py

