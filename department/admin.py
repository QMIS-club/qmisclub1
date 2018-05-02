from django.contrib import admin
from .models import FacultyMember, Download, OfficeHour, Course, Document


class OfficeHourInline(admin.StackedInline):
    model = OfficeHour


class FacultyMemberAdmin (admin.ModelAdmin):
    list_display = ('name', 'email')
    search_fields = ('id', 'name', "title")
    list_filter = ("title",)
    inlines = (
        OfficeHourInline,
    )
class DownloadInline(admin.StackedInline):
    model = Download

class DownloadAdmin (admin.ModelAdmin):
    list_display = ('name', 'url', 'course',)
    search_fields = ('id','name', 'course',)
    list_filter=('name', 'course',)

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_filter=('name',)
    inlines = (
        DownloadInline,
    )

class DocumentAdmin (admin.ModelAdmin):
    list_display = ('name','document')
    search_fields = ('name',)
    list_filter=('name',)

admin.site.register(FacultyMember, FacultyMemberAdmin)
admin.site.register(Download, DownloadAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(Course, CourseAdmin)
