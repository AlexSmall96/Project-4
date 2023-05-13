# Generated by Django 3.2.18 on 2023-05-12 11:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classbooking_app', '0020_auto_20230510_1424'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='duration',
            field=models.CharField(default='1hr', max_length=5),
        ),
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.DateField(default=datetime.date(2023, 5, 12)),
        ),
        migrations.AlterField(
            model_name='session',
            name='time',
            field=models.TimeField(default=datetime.datetime(2023, 5, 12, 11, 41, 40, 981016)),
        ),
    ]