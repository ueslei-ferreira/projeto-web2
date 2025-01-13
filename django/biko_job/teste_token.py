from rest_framework.authtoken.models import Token
from .models import User  # Ajuste o import conforme o local do seu modelo

# Crie um novo usuário
user = User.objects.create_user(email='ueslei392@gmail.com', password='12345678')

# Gere ou recupere o token
token, created = Token.objects.get_or_create(user=user)

print(f"Token gerado: {token.key}, Novo token: {created}")
