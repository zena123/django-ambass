import decimal
import stripe
from django.db import transaction
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
    @transaction.atomic
    def post(self, request):
        data = request.data
        link = Link.objects.filter(code=data['code']).first()
        if not link:
            raise exceptions.APIException("invalid code")

        try:
            order = Order()
            order.code = link.code
            order.user_id = link.user.id
            order.ambassador_email = link.user.email
            order.first_name = data['first_name']
            order.last_name = data['last_name']
            order.email = data['email']
            order.address = data['address']
            order.country = data['country']
            order.city = data['city']
            order.zip = data['zip']
            order.save()
            line_items = []
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
                line_items.append({
                    'name': product.title,
                    'description': product.description,
                    'images': [
                        product.image
                    ],
                    'amount': int(100 * product.price),
                    'currency': 'usd',
                    'quantity': quantity,
                }
                )

            source = stripe.checkout.Session.create(
                success_url="http://localhost:5000/success?source={CHECKOUT_SESSION_ID}",
                cancel_url="http://localhost:5000/error",
                payment_methos_types='[card]',
                line_items=line_items,
            )
            order.transaction_id = source['id']
            order.save()
            return Response(source)
        except Exception:
            transaction.rollback()

        return Response(
            {"message": "error occurred!"})
