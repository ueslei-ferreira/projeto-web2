from django.urls import path
from .views import RegisterUserView, LoginView, CadastroServicoView, AgendarTrabalhoView, ServicoDetalhesView, MeusServicosView, MeusAgendamentosView, AvaliacaoCreateListView, MarcarConcluidoView, UserDetailsView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('login/', LoginView.as_view(), name='login'),
    path('servicos/', CadastroServicoView.as_view(), name='cadastro_servico'),
    path('servicos/<int:pk>/', ServicoDetalhesView.as_view(), name='detalhes_servico'),
    path('servicos/<int:pk>/agendar/', AgendarTrabalhoView.as_view(), name='agendar_trabalho'),
    path('servicos/meus', MeusServicosView.as_view(), name='meus_servicos'),
    path('agendamentos/meus', MeusAgendamentosView.as_view(), name='meus_agendamentos'),
    path("avaliacoes/", AvaliacaoCreateListView.as_view(), name="avaliacao-create-list"),
    path('agendamentos/<int:pk>/concluir/', MarcarConcluidoView.as_view(), name='marcar_concluido'),  # Nova rota
    path("user/", UserDetailsView.as_view(), name="user_details"),
]
