from django.db import models
from club.models import *
from django.core.urlresolvers import reverse
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.images import get_image_dimensions
import sys

class Event(models.Model):
    name = models.CharField(max_length=64)
    date_and_time = models.DateTimeField(null=False)
    poster = models.ImageField(null=True, blank=True)
    event_description = models.TextField(
        max_length=500, default="description here ")
    event_pictures = models.ManyToManyField(
        Picture, verbose_name="event pictures", blank=True)
    event_videos = models.ManyToManyField(Video, verbose_name="event videos", blank=True)

    def get_absolute_url(self):
        return reverse('view_event', kwargs={'event_id': self.pk})

    def __str__(self):
        return u'{}'.format(self.name)

    def save(self):
        if self.poster:
            # Opening the uploaded image
            w, h = get_image_dimensions(self.poster)
            aspect_ratio= float(w) / float(h)
            im = Image.open(self.poster)

            output = BytesIO()

            # Resize/modify the image
            im = im.resize((1280, int(1280/aspect_ratio)))

            # after modifications, save it to the output
            im.save(output, format='JPEG', quality=70)
            output.seek(0)

            # change the imagefield value to be the newley modifed image value
            self.poster = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.poster.name.split(
                '.')[0], 'image/jpeg', sys.getsizeof(output), None)

        super(Event, self).save()
