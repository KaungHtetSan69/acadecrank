# Generated by Django 5.0.6 on 2024-06-08 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('overall', models.IntegerField()),
                ('ss', models.IntegerField()),
                ('lit', models.IntegerField()),
                ('econ', models.IntegerField()),
                ('math', models.IntegerField()),
                ('science', models.IntegerField()),
                ('music', models.IntegerField()),
                ('art', models.IntegerField()),
            ],
        ),
    ]
