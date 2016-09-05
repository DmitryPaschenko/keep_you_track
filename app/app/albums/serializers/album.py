from rest_framework import serializers
from albums.models import Album


class AlbumSerializer(serializers.ModelSerializer):
    artist_title = serializers.SerializerMethodField()
    track_count = serializers.SerializerMethodField()
    track_duration_minutes = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ('id', 'title', 'artist_title', 'track_count', 'track_duration_minutes')

    def get_artist_title(self, obj):
        return obj.get_artist_title()

    def get_track_count(self, obj):
        return obj.get_track_count()

    def get_track_duration_minutes(self, obj):
        return obj.get_track_duration_minutes()
