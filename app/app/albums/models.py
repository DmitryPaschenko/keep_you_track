from __future__ import unicode_literals

from django.db import models
from base_libs.models import BaseModel
from django.db.models import Sum


class Artist(BaseModel):
    title = models.CharField(max_length=255, null=False, blank=False)

    class Meta:
        ordering = ('title',)

    def __unicode__(self):
         return self.title


class Album(BaseModel):
    artist = models.ForeignKey(Artist, null=False, blank=False, related_name='albums')
    title = models.CharField(max_length=255, null=False, blank=False)
    # cover_image = models.ImageField()

    class Meta:
        ordering = ('title',)

    def __unicode__(self):
         return self.title

    def get_artist_title(self):
        return self.artist.title

    def get_track_count(self):
        return self.tracks.count()

    def get_track_duration_minutes(self):
        duration_sec = self.tracks.all().aggregate(Sum('duration_sec'))
        duration_min = int(duration_sec.get('duration_sec__sum', 0) / 60)

        return duration_min


class Track(BaseModel):
    album = models.ForeignKey(Album, null=False, blank=False, related_name='tracks')
    title = models.CharField(max_length=255, null=False, blank=False)
    duration_sec = models.IntegerField(null=False,blank=False, default=0)

    class Meta:
        ordering = ('title',)

    def __unicode__(self):
         return self.title

    def get_album_title(self):
        return self.album.title

    def get_artist_title(self):
        return self.album.artist.title