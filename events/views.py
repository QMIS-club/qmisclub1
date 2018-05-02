from .models import *
from .forms import *
from django.shortcuts import *
from django.contrib.auth.decorators import *
from django.utils.decorators import *
from django.http import *
from django.views.generic import *
from django.shortcuts import *
from django.contrib import *
from django.core.urlresolvers import *
from django.views.generic.edit import *
from django.db.models import *
from django.conf import settings
import os
from django.utils import timezone
from datetime import datetime



def view_event(request, event_id):
    obj = Event.objects.get(pk=event_id)
    pictures = obj.event_pictures.all()
    videos = obj.event_videos.all()
    return render(request, 'view_event.html', {'event': obj, 'event_pictures': pictures, 'event_videos': videos,})



def list_view_upcoming_events(request):
    upcoming_events = Event.objects.filter(date_and_time__gte=datetime.now())
    return render(request, 'list_view_upcoming_events.html', {'events': upcoming_events})

def list_view_past_events(request):
    past_events = Event.objects.filter(date_and_time__lte=datetime.now())
    return render(request, 'list_view_past_events.html', {'events': past_events})
