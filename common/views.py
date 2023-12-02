from rest_framework import exceptions
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.models import User
from .authentication import JWTAuthentication
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
        id = user.id
        token = JWTAuthentication.generate_jwt(id=id)
        """
        we need to return an http cookie because it's more secure than:
        return Response({
            'jwt': token
        })
        """
        response = Response()
        """
        the only purpose of this cookie is to send it to the backend , and then  backend 
        can only validate it.
        the front won't get this cookie till we add sth 
        """

        response.set_cookie(key="jwt", value=token, httponly=True)
        response.data = {
            "message": "success message!"
        }
        return response


class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class LogOutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, _):  # we removed request parameter
        response = Response()
        response.delete_cookie(key='jwt')
        response.data = {
            "message": "success logout"
        }
        return response


class ProfileInfoAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProfilePasswordAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data
        if data['password'] != data['confirm_password']:
            raise exceptions.APIException("passwords don't match")

        user.set_password(data['password'])
        user.save()
        return Response(UserSerializer(user).data)


"""
we can add the authentications as a mixin rather than just rewriting them in every view"""



