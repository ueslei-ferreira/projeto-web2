
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from django.db import models
from django.conf import settings

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

class Servico(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="servicos")
    tipo_servico = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    modalidade_preco = models.CharField(max_length=50, choices=[("por hora", "Por Hora"), ("serviço completo", "Serviço Completo")])
    descricao = models.TextField()
    foto = models.ImageField(upload_to="servicos/")  # Requer configuração de armazenamento

    def __str__(self):
        return f"{self.tipo_servico} - {self.usuario.email}"

class Agendamento(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="agendamentos")
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name="agendamentos")
    data = models.DateField()
    horario = models.TimeField()
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Agendamento para {self.servico.titulo} em {self.data} às {self.horario}"