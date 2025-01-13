from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},  # Senha não será retornada
        }

    def create(self, validated_data):
        # Agora a criação de um usuário não exige 'username', apenas 'email' e 'password'
        user = get_user_model().objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    senha = serializers.CharField(write_only=True)

    def validate(self, data):
        User = get_user_model()
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Credenciais inválidas")

        if not user.check_password(data['senha']):
            raise serializers.ValidationError("Credenciais inválidas")

        if not user.is_active:
            raise serializers.ValidationError("Usuário inativo")

        return {'user': user}