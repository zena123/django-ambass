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
