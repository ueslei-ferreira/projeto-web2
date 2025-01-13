
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O email deve ser fornecido')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)  # Define a senha
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
class User(AbstractUser):
    email = models.EmailField(unique=True)  # Garante que o email seja único
    username = None  # Remover o campo username
    USERNAME_FIELD = 'email'  # O email será o campo de identificação
    REQUIRED_FIELDS = []  # Não precisamos de um campo 'username'

    objects = UserManager()  # Defina o UserManager aqui

    def __str__(self):
        return self.email
