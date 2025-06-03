from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow admin users to access the view.
    """
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsStaffUser(permissions.BasePermission):
    """
    Custom permission to only allow staff users to access the view.
    """
    def has_permission(self, request, view):
        return request.user.role in ['admin', 'staff']
