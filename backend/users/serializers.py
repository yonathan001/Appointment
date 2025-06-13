from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'password', 'role', 'first_name', 'last_name', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Automatically set is_staff based on the role.
        role = validated_data.get('role')
        if role in ['system_admin', 'organization_admin']:
            validated_data['is_staff'] = True
        else:
            validated_data['is_staff'] = False

        user = CustomUser.objects.create_user(**validated_data)
        return user
