from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.settings import api_settings as simple_jwt_settings
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from datetime import datetime, timezone
from rest_framework.views import APIView

class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        access_token = serializer.validated_data.get('access')
        refresh_token = serializer.validated_data.get('refresh')

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)

        # Set HttpOnly cookies
        # Access Token
        access_token_expires = datetime.now(timezone.utc) + simple_jwt_settings.ACCESS_TOKEN_LIFETIME
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            value=access_token,
            expires=access_token_expires,
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH']
        )

        # Refresh Token
        refresh_token_expires = datetime.now(timezone.utc) + simple_jwt_settings.REFRESH_TOKEN_LIFETIME
        response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=refresh_token,
            expires=refresh_token_expires,
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'] # Consider a more specific path for refresh, e.g., '/api/auth/refresh/'
        )
        return response

class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        if not refresh_token:
            return Response({'detail': 'Refresh token cookie not found.'}, status=status.HTTP_401_UNAUTHORIZED)

        request.data['refresh'] = refresh_token # Add refresh token from cookie to request data for serializer
        
        try:
            response = super().post(request, *args, **kwargs)
        except Exception as e:
            return Response({'detail': 'Invalid refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)

        if response.status_code == status.HTTP_200_OK:
            access_token = response.data.get('access')
            # Optionally, new refresh token if ROTATE_REFRESH_TOKENS is True
            new_refresh_token = response.data.get('refresh') 

            # Set new access token cookie
            access_token_expires = datetime.now(timezone.utc) + simple_jwt_settings.ACCESS_TOKEN_LIFETIME
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
                value=access_token,
                expires=access_token_expires,
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH']
            )
            
            # If a new refresh token was issued, update its cookie as well
            if new_refresh_token and settings.SIMPLE_JWT.get('ROTATE_REFRESH_TOKENS'):
                refresh_token_expires = datetime.now(timezone.utc) + simple_jwt_settings.REFRESH_TOKEN_LIFETIME
                response.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                    value=new_refresh_token,
                    expires=refresh_token_expires,
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
                    path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH']
                )
        return response


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        
        # Clear access token cookie
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_ACCESS'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'],
            # samesite must be specified for delete_cookie to work correctly with some browsers if it was set initially
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE'] 
        )
        
        # Clear refresh token cookie
        response.delete_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            path=settings.SIMPLE_JWT['AUTH_COOKIE_PATH'], # Ensure this path matches the one used for setting the refresh cookie
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        return response

