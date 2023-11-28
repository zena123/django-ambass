import jwt, datetime

from django_ambass import settings


class JWTAuthentication:
    def generate_jwt(self, id):
        payload = {
            "admin_id": id,
            "exp": datetime.datetime.now() + datetime.timedelta(days=1),  # expire after day
            "iat": datetime.datetime.now()  # creation date
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
