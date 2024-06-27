from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = "home"),
    path('setting', views.setting, name = "setting"),
    path('accounts/login/',views.login, name = "login"),
    path('events', views.events, name = "event"),
    path('subjects/<str:subject>', views.subjects,name="subjects"),
    path('profiles/<str:name>', views.profile, name = "profiles"),
    path('get_subjects/<str:subject>',views.get_subject, name ="getsubject")
    ]