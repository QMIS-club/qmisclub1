from django.db import models
from django_resized import ResizedImageField
# Create your models here.
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.images import get_image_dimensions
import sys


class FacultyMember(models.Model):
    TITLES = (("Dr.", "Dr."),
              ("Prof.", "Prof."),
              ("Eng.", "Eng."),
              ("TA.", "TA."),
              ("", "")
              )
    picture = models.ImageField(null=True, blank=True)
    name = models.CharField(max_length=128)
    website = models.URLField(max_length=128, null=True, blank=True)
    twitter_account = models.CharField(max_length=128, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    title = models.CharField(
        "Title", null=True, choices=sorted(TITLES), max_length=64, blank=True, default="")

    def __str__(self):
        return u'{}'.format(self.name)

    def save(self):
        if self.picture:
            # Opening the uploaded image
            w, h = get_image_dimensions(self.picture)
            aspect_ratio = float(w) / float(h)
            im = Image.open(self.picture)

            output = BytesIO()

            # Resize/modify the image
            im = im.resize((1280, int(1280 / aspect_ratio)))

            # after modifications, save it to the output
            im.save(output, format='JPEG', quality=70)
            output.seek(0)

            # change the imagefield value to be the newley modifed image value
            self.picture = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.picture.name.split(
                '.')[0], 'image/jpeg', sys.getsizeof(output), None)

        super(FacultyMember, self).save()


class OfficeHour(models.Model):
    days = models.CharField(max_length=256)
    time = models.CharField(max_length=256)
    semester = models.CharField(max_length=128, default="Spring 2016/2017")
    faculty = models.ForeignKey(
        FacultyMember, related_name="office_hours", null=True, blank=True)

    def __str__(self):
        return u'{}'.format(self.faculty)


class Course(models.Model):
    name = models.CharField(max_length=128, null=False, blank=False)

    def __str__(self):
        return u'{}'.format(self.name)


class Download(models.Model):
    url = models.URLField(max_length=256, null=False)
    name = models.CharField(max_length=128, null=False, blank=False)
    course = models.ForeignKey(
        Course, related_name="course", null=True, blank=True)

    def __str__(self):
        return u'{}'.format(self.name)


class Document(models.Model):
    NAMES = (('MIS Curriculum Guide', 'MIS Curriculum Guide'),
             ('OSCM Curriculum Guide', 'OSCM Curriculum Guide'),
             ('All Other CBA Courses', 'All Other CBA Courses'),
             ('Student Placement', 'Student Placement'))
    name = models.CharField("Name", null=True, choices=sorted(
        NAMES), max_length=64, blank=False, unique=True)
    document = models.FileField(null=False)

    def __str__(self):
        return u'{}'.format(self.name)
