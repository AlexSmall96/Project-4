# Generated by Django 3.2.18 on 2023-05-25 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classbooking_app', '0032_auto_20230525_1615'),
    ]

    operations = [
        migrations.AlterField(
            model_name='session',
            name='date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='session',
            name='time',
            field=models.TimeField(),
        ),
    ]