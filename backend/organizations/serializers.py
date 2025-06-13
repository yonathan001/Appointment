from rest_framework import serializers
from .models import Organization
from users.models import CustomUser
from users.serializers import UserSerializer

class OrganizationSerializer(serializers.ModelSerializer):
    # Use a read-only serializer for the admin field to show user details in GET requests
    admin = UserSerializer(read_only=True)
    # Use a write-only field to accept the admin's ID during POST requests
    admin_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='organization_admin'),
        source='admin',
        write_only=True
    )

    class Meta:
        model = Organization
        fields = ('id', 'name', 'description', 'admin', 'admin_id', 'created_at', 'updated_at')
