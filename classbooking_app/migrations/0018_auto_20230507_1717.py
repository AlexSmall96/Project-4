# Generated by Django 3.2.18 on 2023-05-07 17:17

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classbooking_app', '0017_auto_20230427_1120'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='confirmed',
        ),
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.DateField(default=datetime.date(2023, 5, 7)),
        ),
        migrations.AlterField(
            model_name='session',
            name='time',
            field=models.TimeField(default=datetime.datetime(2023, 5, 7, 17, 17, 47, 101758)),
        ),
    ]
