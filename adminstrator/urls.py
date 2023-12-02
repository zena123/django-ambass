from django.urls import path, include
from .views import (
    AmbassadorAPIView,
    ProductView,
)

urlpatterns = [
    path('', include('common.urls')),
    path('ambassadors/', AmbassadorAPIView.as_view(), name="ambassadors"),
    path('products/', ProductView.as_view()),
    path('products/<str:pk>/', ProductView.as_view()),

]
