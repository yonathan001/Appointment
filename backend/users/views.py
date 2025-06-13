from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
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
            permission_classes = [permissions.AllowAny]
        elif self.action == 'list':
            permission_classes = [IsSystemAdmin]
        elif self.action == 'me':
            permission_classes = [permissions.IsAuthenticated]
        elif self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsOwnerOrSystemAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'], url_path='me')
    def me(self, request):
        """
        Return the authenticated user's details.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

