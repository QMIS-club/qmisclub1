from django.conf.urls import *
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib import admin
from club import views
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^events/', include('events.urls')),
    url(r'^club/', include('club.urls')),
    url(r'^department/', include('department.urls')),
    url(r'^privacy_policy$', TemplateView.as_view(template_name='privacy_policy.html'), name = 'privacy_policy'),
    url(r'^term_of_use$', TemplateView.as_view(template_name='term_of_use.html'), name = 'term_of_use'),
    url(r'^college_guide/$',TemplateView.as_view(template_name='college_guide.html'),
    name='college_guide'),
    url(r'^FAQ$', views.FAQ,name='FAQ'),
    url(r'^$', views.index,name='index')

] + static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)
