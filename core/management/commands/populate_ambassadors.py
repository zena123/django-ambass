from django.core.management import BaseCommand
from core.models import User

from faker import Faker


class Command(BaseCommand):
    def handle(self, *args, **options):
        faker = Faker()
        for i in range(30):
            user = User.objects.create(
                first_name=faker.first_name(),
                last_name=faker.last_name(),
                password='',
                email=faker.email()

            )
            user.set_password("12345")
            user.save()
