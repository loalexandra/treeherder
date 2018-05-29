# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-23 08:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('perf', '0008_add_confirming_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='performancealertsummary',
            name='issue_tracker',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.PROTECT, to='perf.IssueTracker'),
        ),
    ]