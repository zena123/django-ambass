from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    UserAPIView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('user/', UserAPIView.as_view())
]
