# Generated by Django 4.2.7 on 2023-12-03 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_order_orderitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='link',
            name='code',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
