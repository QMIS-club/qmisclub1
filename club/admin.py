from django.contrib import admin
from .models import Picture, Member, Video, FAQ, Category, WelcomingWord, HomePageVideo, ContactUsVideo


class PictureInline(admin.StackedInline):
    model = Picture
    exclude = ['thumbnail']


class VideoInline(admin.StackedInline):
    model = Video


class CategoryAdmin (admin. ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_filter = ('name',)
    inlines = (
        PictureInline,
        VideoInline,
    )


class PictureAdmin (admin. ModelAdmin):
    list_display = ('title', 'category')
    search_fields = ('title', 'category',)
    list_filter = ('category',)
    exclude = ['thumbnail']


class MemberAdmin (admin. ModelAdmin):
    list_display = ('name', 'position')
    search_fields = ('id', 'name', 'major',)
    list_filter = ('major',)


class VideoAdmin (admin. ModelAdmin):
    list_display = ('title', 'category',)
    search_fields = ('id', 'title', 'category',)
    list_filter = ('title', 'category',)


class FAQAdmin (admin. ModelAdmin):
    list_display = ('question', 'answer')
    search_fields = ('question', 'answer',)


class WelcomingWordAdmin (admin. ModelAdmin):
    list_display = ('welcoming_word',)

    def has_add_permission(self, request):
        return False if WelcomingWord.objects.count() >= 1 else super(admin.ModelAdmin, self).has_add_permission(request)


class HomePageVideoAdmin (admin. ModelAdmin):
    list_display = ('video_id',)

    def has_add_permission(self, request):
        return False if HomePageVideo.objects.count() >= 1 else super(admin.ModelAdmin, self).has_add_permission(request)


class ContactUsVideoAdmin (admin. ModelAdmin):
    list_display = ('video_id',)

    def has_add_permission(self, request):
        return False if ContactUsVideo.objects.count() >= 1 else super(admin.ModelAdmin, self).has_add_permission(request)

admin.site.register(Category, CategoryAdmin)
admin.site.register(Picture, PictureAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(Video, VideoAdmin)
admin.site.register(FAQ, FAQAdmin)
admin.site.register(WelcomingWord, WelcomingWordAdmin)
admin.site.register(HomePageVideo, HomePageVideoAdmin)
admin.site.register(ContactUsVideo, ContactUsVideoAdmin)
