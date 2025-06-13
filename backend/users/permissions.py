from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsSystemAdmin(BasePermission):
    """Allows access only to system admin users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == 'system_admin' or request.user.is_superuser)
        )

class IsOrganizationAdmin(BasePermission):
    """Allows access only to organization admin users."""
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'organization_admin')

class IsOwnerOrReadOnly(BasePermission):
    """Custom permission to only allow owners of an object to edit it."""
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj == request.user

class IsOwnerOrSystemAdmin(BasePermission):
    """Allow object owner or system admin to perform action."""
    def has_object_permission(self, request, view, obj):
        return obj == request.user or (request.user and (request.user.role == 'system_admin' or request.user.is_superuser))

class IsServiceOrganizationAdminOrSystemAdmin(BasePermission):
    """
    Allows access only to the admin of the service's organization or a system admin.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return (
            request.user and
            request.user.is_authenticated and
            ((request.user.role == 'system_admin' or request.user.is_superuser) or obj.organization.admin == request.user)
        )

class IsAppointmentOwnerOrOrgAdminOrSystemAdmin(BasePermission):
    """
    Allows access to the appointment owner, the organization admin, or a system admin.
    """
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.role == 'system_admin' or request.user.is_superuser:
            return True

        if obj.client == request.user:
            return True

        if request.user.role == 'organization_admin' and obj.organization.admin == request.user:
            return True

        return False

class IsOrganizationAdminOwnerOrSystemAdmin(BasePermission):
    """
    Allows access only to the organization's admin or a system admin.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any authenticated user.
        if request.method in SAFE_METHODS:
            return True

        # Write permissions are only allowed to the admin of the organization or a system admin.
        return (
            request.user and
            request.user.is_authenticated and
            ((request.user.role == 'system_admin' or request.user.is_superuser) or obj.admin == request.user)
        )
