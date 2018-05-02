from django.contrib import admin
from .models import *
class EventAdmin (admin. ModelAdmin):
    list_display = ('name','date_and_time')
    search_fields = ('id','name', 'date_and_time',)
    list_filter=('name', 'date_and_time',)

admin.site.register(Event, EventAdmin)
