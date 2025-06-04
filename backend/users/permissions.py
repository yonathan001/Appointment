from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'admin')

class IsStaffUser(BasePermission):
    """
    Allows access only to staff users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'staff')

class IsClientUser(BasePermission):
    """
    Allows access only to client users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'client')

class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute or a `user` attribute.
    This is a common one, but we'll tailor it for specific models like Appointments later.
    For now, this is a placeholder to show object-level permissions.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        # This needs to be adapted based on the object.
        # For a CustomUser object, 'obj' would be the user instance.
        # For an Appointment, 'obj.client' might be the owner.
        return obj == request.user # Example: if the object itself is the user

class IsOwnerOrAdmin(BasePermission):
    """
    Allows full access to the owner of the object or admin users.
    """
    def has_object_permission(self, request, view, obj):
        # obj is the CustomUser instance being accessed.
        # Allow if the request.user is the object itself (the owner),
        # or if the request.user is an admin.
        return obj == request.user or \
               (request.user and request.user.is_authenticated and request.user.role == 'admin')

class IsAppointmentOwner(BasePermission):
    """
    Allows access only to the client who owns the appointment.
    """
    def has_object_permission(self, request, view, obj):
        # obj is the Appointment instance.
        return obj.client == request.user

class IsAppointmentStaff(BasePermission):
    """
    Allows access only to the staff member assigned to the appointment.
    """
    def has_object_permission(self, request, view, obj):
        # obj is the Appointment instance.
        return obj.staff == request.user
