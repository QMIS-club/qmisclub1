from django.conf.urls import url
from events import views

urlpatterns = [
url(r'^view/(?P<event_id>\d+)/event/$',views.view_event,name='view_event',),
url(r'^view/list/upcoming_events',views.list_view_upcoming_events,name='list_view_upcoming_events',),
url(r'^view/list/past_events',views.list_view_past_events,name='list_view_past_events',),
]
