from django.urls import path, include
from .views import (
    AmbassadorAPIView,
    ProductView,
    LinksAPIView,
    OrderAPIVIew,
)

urlpatterns = [
    path('', include('common.urls')),
    path('ambassadors/', AmbassadorAPIView.as_view(), name="ambassadors"),
    path('products/', ProductView.as_view()),
    path('products/<str:pk>/', ProductView.as_view()),
    path('users/<str:pk>/links/', LinksAPIView.as_view()),
    path('orders/', OrderAPIVIew.as_view())

]
