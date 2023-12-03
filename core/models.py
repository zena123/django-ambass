from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        if not email:
            raise ValueError("you must provide an email")
        if not password:
            raise ValueError("you must provide a password")

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.is_admin = False
        user.is_staff = False
        user.is_ambassador = False
        user.save(using=self.db)
        return user

    def create_superuser(self, email, password):
        if not email:
            raise ValueError("you must provide an email")
        if not password:
            raise ValueError("you must provide a password")

        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_ambassador = False
        user.save(using=self.db)
        return user


class User(AbstractUser):
    """we already have those fields in AbstractUser model ,but for explanation purposes"""
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_ambassador = models.BooleanField(default=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()


class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.CharField(max_length=250)  # just ex
    price = models.DecimalField(max_digits=10, decimal_places=2)


class Link(models.Model):
    code = models.CharField(max_length=200, unique=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name="links")
    products = models.ManyToManyField('Product', )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Order(models.Model):
    transaction_id = models.CharField(max_length=250, null=True)
    user = models.ForeignKey('User', null=True, on_delete=models.SET_NULL)
    code = models.CharField(max_length=250)
    ambassador_email = models.CharField(max_length=255)
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.CharField(max_length=250)
    address = models.CharField(max_length=250, null=True)
    city = models.CharField(max_length=250, null=True)
    country = models.CharField(max_length=250, null=True)
    zip = models.CharField(max_length=250, null=True)
    complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class OrderItem(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE, related_name="order_items")
    product_title = models.CharField(max_length=250)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    admin_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    ambassador_revenue = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)