from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Servico, Agendamento, Avaliacao
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


class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = "__all__"
        read_only_fields = ["usuario"]

    def create(self, validated_data):
        # O usuário logado será associado automaticamente
        validated_data["usuario"] = self.context["request"].user
        return super().create(validated_data)

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = "__all__"
        read_only_fields = ["usuario", "criado_em", "servico"]

    def validate(self, data):
        if "data" not in data or not data["data"]:
            raise serializers.ValidationError({"data": "A data é obrigatória."})
        if "horario" not in data or not data["horario"]:
            raise serializers.ValidationError({"horario": "O horário é obrigatório."})
        return data

    def create(self, validated_data):
        # Adiciona o usuário logado ao agendamento
        validated_data["usuario"] = self.context["request"].user
        return super().create(validated_data)
    
class AvaliacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avaliacao
        fields = "__all__"
        read_only_fields = ["media", "avaliador", "prestador"]

    def validate(self, data):
        # Validações customizadas
        for key, value in data.items():
            if isinstance(value, int) and not (0 <= value <= 5):
                raise serializers.ValidationError({key: "A pontuação deve estar entre 0 e 5."})
        return data

    def create(self, validated_data):
        # Adiciona avaliador e prestador automaticamente
        user = self.context["request"].user
        servico = validated_data["servico"]
        validated_data["avaliador"] = user
        validated_data["prestador"] = servico.usuario
        return super().create(validated_data)