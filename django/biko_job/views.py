from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, LoginSerializer, ServicoSerializer, AgendamentoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from .models import Servico, Agendamento
from rest_framework.generics import RetrieveAPIView

class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # Permite acesso anônimo

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Usuário criado com sucesso"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]  # Permite acesso anônimo

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'access': access_token,
                'refresh': str(refresh),
            }, status=status.HTTP_200_OK)

        print("Erro de validação:", serializer.errors)  # Log de erros
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CadastroServicoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ServicoSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # Método GET para listar os serviços
    def get(self, request):
        servicos = Servico.objects.all()
        serializer = ServicoSerializer(servicos, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AgendarTrabalhoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            servico = Servico.objects.get(pk=pk)
        except Servico.DoesNotExist:
            return Response({"erro": "Serviço não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Adicione o campo `servico` manualmente ao payload validado
        serializer = AgendamentoSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(servico=servico, usuario=request.user)  # Passa o serviço e o usuário autenticado
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServicoDetalhesView(RetrieveAPIView):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [IsAuthenticated]

class MeusServicosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        servicos = Servico.objects.filter(usuario=user)
        serializer = ServicoSerializer(servicos, many=True)
        return Response(serializer.data)

class MeusAgendamentosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        agendamentos = Agendamento.objects.filter(usuario=user)
        serializer = AgendamentoSerializer(agendamentos, many=True)
        return Response(serializer.data)

