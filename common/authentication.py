import jwt, datetime
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication

from core.models import User
from django_ambass import settings


class JWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt', None)
        if not token:
            return None

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("unauthenticated")

        user = User.objects.get(pk=payload["user_id"])

        if not user:
            raise exceptions.AuthenticationFailed("user not found")
        return (user, None)

    @staticmethod
    def generate_jwt(id):
        payload = {
            "user_id": id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),  # expire after day
            "iat": datetime.datetime.utcnow()  # creation date
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
