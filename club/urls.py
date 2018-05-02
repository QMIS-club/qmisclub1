from django.conf.urls import url
from django.views.generic import TemplateView
from club import views

urlpatterns = [
        url(r'^join_us/$', views.join_us,
        name='join_us'),
        url(r'^about_us/$',views.view_about_us,
        name='about_us'),
        url(r'^useful_videos/$', views.useful_videos, name = 'useful'),
        url(r'^gallery/$',views.gallery,
        name='gallery'),
        url(r'^contact_us$',views.contact_us,
        name='contact_us'),
        url(r'^member/(?P<member_id>\d+)/profile/$',views.member_profile,name='member_profile',),
]
