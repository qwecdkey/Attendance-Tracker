# Generated by Django 4.1.5 on 2023-03-21 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0008_user_is_presenter_alter_response_answer_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='is_accepting_responses',
            field=models.BooleanField(default=False),
        ),
    ]
