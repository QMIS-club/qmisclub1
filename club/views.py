from events.models import Event
from django.shortcuts import render, redirect,render_to_response
from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib import messages
from .forms import JoinForm
from .models import Picture, Member, Video, Category, WelcomingWord, HomePageVideo,ContactUsVideo
from .models import FAQ as FAQModel
from club.instagram_api_reader import InstagramReader
from django.views.static import serve
from django.template import RequestContext

import os


def join_us(request):
    ''' This function will get the uploaded file and send it to
    Qmis club email with the name of the sender and the application attached
    '''
    if request.method == 'POST':
        form = JoinForm(request.POST)
        if form.is_valid():
            email = EmailMessage(
                'Join request from {}'.format(form.cleaned_data['name']),
                """Name: {}
Major: {}
GPA: {}
Major GPA: {}
Passed Credit: {}
Expected graduation date: {}
Phone Number: {}
Email: {}""".format(form.cleaned_data['name'], form.cleaned_data['major'], form.cleaned_data["gpa"], form.cleaned_data[
                    "mgpa"], form.cleaned_data["passed_credit"], form.cleaned_data["graduation_course"], form.cleaned_data["phone_number"], form.cleaned_data["email"]),

                to=['qmisclub_ku@hotmail.com'])
            email.send()
            messages.success(request, 'Your application has been submitted')
            return redirect('index')
    else:
        form = JoinForm()
    return render(request, 'join_us.html', {'form': form})


def view_about_us(request):
    '''This function will get all the members from member model and
    order the ascendingly by rank and view them in about us html'''
    obj = Member.objects.all().order_by('rank')
    return render(request, 'about_us.html', {'members': obj})


def index(request):
    ''' This function will get all the objects in Picture model and send them to
            html template to display in the gallery slideshow'''
    #obj = Picture.objects.filter(home_page=True)
    events = Event.objects.all()
    welcoming_word = WelcomingWord.objects.all()
    home_page_video = HomePageVideo.objects.all()
    insta_reader = InstagramReader()
    insta_imgs = insta_reader.get_last_media(num_images=5)
    return render(request, 'index.html', {'events': events, 'instagram': insta_imgs, 'welcoming_word': welcoming_word, 'home_page_video': home_page_video})


def FAQ(request):
    ''' This function will get all the objects in FAQ model and send them to
            html template '''
    objs = FAQModel.objects.all()

    return render(request, 'FAQ.html', {'objs': objs})


def gallery(request):
    ''' This function will get all the objects in Picture model and send them to
            html template to display in the gallery portfolio'''
    obj = Picture.objects.all().order_by('-pk')
    categories = Picture.objects.values(
        'category__name').distinct().order_by('category__name')
    return render(request, 'gallery.html', {'images': obj, 'categories': categories})


def useful_videos(request):
    ''' This function will get all the objects in videos model and send them to
            html template to display in the videos portfolio'''
    obj = Video.objects.all().order_by('category')
    categories = Video.objects.values(
        'category__name').distinct().order_by('category__name')

    return render(request, 'useful_videos.html', {'videos': obj, 'categories': categories})


def member_profile(request, member_id):
    '''This funtion will get specific member profile and display it.'''
    obj = Member.objects.get(pk=member_id)
    return render(request, 'member_profile.html', {'member': obj})

def contact_us(request):
    '''This function will get contact us video'''
    obj = ContactUsVideo.objects.all()
    return render(request, 'contact_us.html',{'video':obj})



def handler404(request):
    response = render_to_response('404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response('404.html', {},
                                  context_instance=RequestContext(request))
    response.status_code = 500
    return response
