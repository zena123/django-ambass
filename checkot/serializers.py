from rest_framework import serializers

from adminstrator.serializers import ProductSerializer
from common.serializers import UserSerializer
from core.models import Product, Link


class LinkSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Link
        fields = "__all__"
