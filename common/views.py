from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import User
from .serializers import UserSerializer


class RegisterView(APIView):
    def post(self, request):
        data = request.data
        if data['password'] != data['confirm_password']:
            raise exceptions.APIException("passwords don't match")

        data['is_ambassador'] = 0
        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):

    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()

        if not user:
            raise exceptions.APIException("User not found!")
        if not user.check_password(password):
            raise exceptions.APIException("incorrect password")
        return Response(UserSerializer(user).data)
