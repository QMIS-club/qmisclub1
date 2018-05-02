from django.shortcuts import render
from .models import FacultyMember, Download, OfficeHour, Course, Document


def faculty_members(request):
    '''This function will get all the members from FacultyMember model
            and view them in faculty_members html, also will send sorted
            and unique list of first charcaters in the members name'''
    obj = FacultyMember.objects.all().order_by('name')
    first_character = [item.name[0].upper() for item in obj]
    alpha = sorted(set(first_character))
    return render(request, 'faculty_members.html', {'faculty_members': obj, 'alpha': alpha})


def downloads(request):
    '''this function will get all the downloads urls and display it'''
    courses = Course.objects.values(
        'name')
    obj = Download.objects.all()
    return render(request, 'downloads.html', {"downloads": obj, 'courses': courses})


def faculty_member_profile(request, member_id):
    '''This funtion will get specific faculty member profile and office hours and display it.'''
    obj = FacultyMember.objects.get(pk=member_id)
    office_hours = OfficeHour.objects.filter(faculty=obj).order_by('pk')
    return render(request, 'faculty_member_profile.html', {'member': obj, 'office_hours': office_hours})

def major_guide(request):
    '''This function will fetch all the documents in Document model'''
    mis_doc = Document.objects.filter(name='MIS Curriculum Guide').first()
    oscm_doc = Document.objects.filter(name='OSCM Curriculum Guide').first()
    other_courses_doc = Document.objects.filter(name='All Other CBA Courses').first()
    placement_doc = Document.objects.filter(name='Student Placement').first()
    return render(request, 'major_guide.html', {'mis_doc': mis_doc, 'oscm_doc': oscm_doc, 'other_courses_doc':other_courses_doc,'placement_doc':placement_doc})
