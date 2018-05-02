from django import forms
from django.core.exceptions import ValidationError
from .forms import *

"""def validate_file_extension(value):
    ''' validate file extention to only accept pdf files'''
    extentions=['.pdf', '.docx']
    if not value.name.endswith('.pdf') and not value.name.endswith(".docx"):
        raise ValidationError(u'Please attach pdf or docx file only')"""


class JoinForm(forms.Form):
    def __init__(self, *args, **kwargs):
       MAJORS = (("Management Information System", "Management Information System"),
                 ("Operation & Supply Chain Management", "Operation & Supply Chain Management"),
                 ("Marketing", "Marketing"),
                 ("Economics", "Economics"),
                 ("Management", "Management"),
                 ("Accounting", "Accounting"),
                 ("Public Administration", "Public Administration"),
                 ("Finance", "Finance"))
       super(JoinForm, self).__init__(*args, **kwargs)
       self.fields['major'] = forms.ChoiceField(
           choices=MAJORS )
    name = forms.CharField(label='Name', max_length=50)

    gpa = forms.FloatField(label="GPA")
    mgpa = forms.FloatField(label="Major GPA")
    passed_credit = forms.IntegerField(label="Passed Credit")
    graduation_course = forms.CharField(label="Expected graduation semester", max_length=50)
    phone_number = forms.IntegerField(label="Phone Number")
    email = forms.EmailField(label="Email")
