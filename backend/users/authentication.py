from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS']) or None

        if raw_token is None:
            # If no cookie, try to authenticate using the Authorization header as a fallback
            # This allows for flexibility, e.g. for testing with tools that set Authorization header
            # or for other clients that might use header-based auth.
            return super().authenticate(request)

        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except (InvalidToken, TokenError) as e:
            # Cookie token was found but is invalid. 
            # Depending on desired behavior, could log this and/or raise AuthenticationFailed.
            # Returning None means this authenticator failed, and others (if any) will be tried.
            # If this is the only or primary auth method, raising AuthenticationFailed might be more explicit.
            # For now, returning None allows potential fallback to SessionAuthentication if it's active for browsable API, etc.
            # print(f"CustomJWTAuthentication: Cookie token validation failed: {e}")
            return None
