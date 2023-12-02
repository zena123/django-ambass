from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserAPIView,
    LogOutView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('user/', UserAPIView.as_view(), name="user"),
    path('logout/', LogOutView.as_view(), name='logout'),

]
