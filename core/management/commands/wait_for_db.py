import time

from django.core.management import BaseCommand
from django.db import connections


class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("waiting for db....")
        conn = None
        while not conn:
            try:
                conn = connections['default']
            except:
                self.stdout.write('database not available...waiting 1 second')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS("Database available!"))
