from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, LoginSerializer, ServicoSerializer, AgendamentoSerializer, AvaliacaoSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Servico, Agendamento, Avaliacao
from rest_framework.generics import RetrieveAPIView
from rest_framework import generics, permissions

class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # Permite acesso anônimo

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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
        servicos = Servico.objects.filter(usuario=request.user)
        serializer = ServicoSerializer(servicos, many=True)
        return Response(serializer.data)


class MeusAgendamentosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Filtra os agendamentos do usuário que não estão concluídos
        agendamentos = Agendamento.objects.filter(usuario=request.user, concluido=False)
        serializer = AgendamentoSerializer(agendamentos, many=True)
        return Response(serializer.data)



class MarcarConcluidoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            agendamento = Agendamento.objects.get(pk=pk, usuario=request.user)
            agendamento.concluido = True
            agendamento.save()
            return Response({"message": "Agendamento marcado como concluído."}, status=status.HTTP_200_OK)
        except Agendamento.DoesNotExist:
            return Response({"error": "Agendamento não encontrado."}, status=status.HTTP_404_NOT_FOUND)


class AvaliacaoCreateListView(generics.ListCreateAPIView):
    serializer_class = AvaliacaoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retorna avaliações apenas para o prestador especificado
        prestador_id = self.request.query_params.get('prestador')
        if prestador_id:
            return Avaliacao.objects.filter(prestador_id=prestador_id)
        return Avaliacao.objects.none()  # Retorna vazio caso o parâmetro não exista

    def perform_create(self, serializer):
        # Associar o usuário logado ao avaliador
        serializer.save(avaliador=self.request.user)

class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"id": user.id, "email": user.email})