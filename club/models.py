from django.db import models
from django_resized import ResizedImageField
from django.core.urlresolvers import reverse
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.images import get_image_dimensions
import sys


class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return u'{}'.format(self.name)

    class Meta:
        verbose_name_plural = "categories"


class Picture(models.Model):
    title = models.CharField(null=True, max_length=64, blank=True)
    image = models.ImageField(null=False)
    #image_width = models.IntegerField(null=False, default=300)
    #image_height = models.IntegerField(null=False, default=300)
    category = models.ForeignKey(
        Category, related_name="category_picture", null=True, blank=True)
    #home_page = models.BooleanField("show in home page", default=False)
    thumbnail = models.ImageField(null=True, blank=True)

    def __str__(self):
        return u'{}'.format(self.title)

    def save(self):
        if self.image:
            # Opening the uploaded image
            w, h = get_image_dimensions(self.image)
            aspect_ratio = float(w) / float(h)

            im = Image.open(self.image)
            im2 = Image.open(self.image)
            output = BytesIO()
            output2 = BytesIO()
            # Resize/modify the image
            if self.home_page:
                im = im.resize((1280, 720))
            else:
                im = im.resize((1280, int(1280 / aspect_ratio)))
            im2 = im.resize((400, 200))
            # after modifications, save it to the output
            im.save(output, format='JPEG', quality=70)
            im2.save(output2, format='JPEG', quality=50)
            output.seek(0)
            output2.seek(0)
            # change the imagefield value to be the newley modifed image value
            self.image = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.image.name.split(
                '.')[0], 'image/jpeg', sys.getsizeof(output), None)
            self.thumbnail = InMemoryUploadedFile(output2, 'ImageField', "%s.jpg" % self.image.name.split(
                '.')[0], 'image/jpeg', sys.getsizeof(output2), None)

        super(Picture, self).save()


class Member(models.Model):
    MAJORS = (("Management Information System", "Management Information System"),
              ("Operation & Supply Chain Managment",
               "Operation & Supply Chain Managment"),
              ("Marketing", "Marketing"),
              ("Economics", "Economics"),
              ("Management", "Management"),
              ("Accounting", "Accounting"),
              ("Public Administration", "Public Administration"),
              ("Finance", "Finance"))
    picture = models.ImageField(null=True, blank=True)
    name = models.CharField("Name", null=False, max_length=64)
    major = models.CharField(
        "Major", null=False, choices=sorted(MAJORS), max_length=64)
    skills = models.TextField("Skills", null=False)
    interests = models.TextField("Interests", null=False)
    position = models.CharField("Position", null=False, max_length=64)
    rank = models.IntegerField("Rank", null=False)

    def get_absolute_url(self):
        return reverse('member_profile', kwargs={'member_id': self.pk})

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

        super(Member, self).save()

    def __str__(self):
        return u'{}'.format(self.name)


class Video(models.Model):
    title = models.CharField(null=True, max_length=128, blank=True)
    video_id = models.CharField(max_length=500)
    category = models.ForeignKey(
        Category, related_name="category_video", null=True, blank=True)

    def __str__(self):
        return u'{}'.format(self.title)


class FAQ(models.Model):
    question = models.TextField(null=False, max_length=1000)
    answer = models.TextField(null=False, max_length=1000)


class WelcomingWord(models.Model):
    welcoming_word = models.TextField(null=False, max_length=2000)

    class Meta:
        verbose_name_plural = "Welcoming Word"


class HomePageVideo(models.Model):
    video_id = models.CharField(max_length=500)

    class Meta:
        verbose_name_plural = "Home Page Video"


class ContactUsVideo(models.Model):
    video_id = models.CharField(max_length=500)

    class Meta:
        verbose_name_plural = "Contact Us Video"
