# Generated by Django 5.1.4 on 2025-01-16 01:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("biko_job", "0007_servico_delete_prestador"),
    ]

    operations = [
        migrations.CreateModel(
            name="Trabalho",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("titulo", models.CharField(max_length=255)),
                ("tipo_servico", models.CharField(max_length=100)),
                (
                    "preco_oferecido",
                    models.DecimalField(decimal_places=2, max_digits=10),
                ),
                (
                    "modalidade_preco",
                    models.CharField(
                        choices=[
                            ("por hora", "Por Hora"),
                            ("serviço completo", "Serviço Completo"),
                        ],
                        max_length=50,
                    ),
                ),
                ("descricao", models.TextField()),
                (
                    "usuario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="trabalhos",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
