from django.conf.urls import url
from department import views
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^major_guide/$', views.major_guide,
        name='major_guide'),
    url(r'^faculty_members/$', views.faculty_members,
        name='faculty_members'),
    url(r'^faculty_member/(?P<member_id>\d+)/profile/$',views.faculty_member_profile,name='faculty_member_profile',),
    url(r'^downloads/$', views.downloads, name='downloads')
]
