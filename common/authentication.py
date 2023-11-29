import jwt, datetime

from django_ambass import settings


class JWTAuthentication:
    @staticmethod
    def generate_jwt(self, id):
        payload = {
            "admin_id": id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),  # expire after day
            "iat": datetime.datetime.utcnow()  # creation date
        }
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
