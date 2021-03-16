from django.urls import path
from . import views


urlpatterns = [
    path('login', views.login_view, name='login'),
    path('register', views.register_view, name ='register'),
    path('logout', views.logout_view, name='logout'),
    path('get_problems', views.get_problems, name='get_problems'),
    path('dsa', views.index,name='dsa'),
    path('codeforces_handle',views.index, name ='codeforces_handle'),
    path('tags',views.index, name ='tags'),
    path('',views.index),
]