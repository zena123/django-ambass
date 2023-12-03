import decimal

from django.shortcuts import render
from rest_framework import exceptions
from rest_framework.response import Response
from rest_framework.views import APIView

from checkot.serializers import LinkSerializer
from core.models import Link, Order, Product, OrderItem


class LinkAPIView(APIView):
    def get(self, _, code=""):
        link = Link.objects.filter(code=code).first()
        serializer = LinkSerializer(link)
        return Response(serializer.data)


class OrderAPIView(APIView):
    def post(self, request):
        data = request.data
        link = Link.objects.filter(code=data['code']).first()
        if not link:
            raise exceptions.APIException("invalid code")

        order = Order.objects.create(
            code=link.code,
            user_id=link.user.id,
            ambassador_email=link.user.email,
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            address=data['address'],
            country=data['country'],
            city=data['city'],
            zip=data['zip'],
        )
        for item in data['products']:
            product = Product.objects.filter(pk=item['product_id']).first()
            quantity = decimal.Decimal(item['quantity'])
            order_item = OrderItem()
            order_item.order = order
            order_item.product_title = product.title
            order_item.price = product.price
            order_item.quantity = quantity
            order_item.ambassador_revenue = decimal.Decimal(.1) * product.price * quantity
            order_item.admin_revenue = decimal.Decimal(.9) * product.price * quantity
            order_item.save()
            return Response("success!")

