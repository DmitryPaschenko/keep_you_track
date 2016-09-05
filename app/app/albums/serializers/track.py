from rest_framework import serializers
from albums.models import Track


class TrackSerializer(serializers.ModelSerializer):
    album_title = serializers.SerializerMethodField()
    artist_title = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ('id', 'title', 'album', 'album_title', 'artist_title')

    def get_album_title(self, obj):
        return obj.get_album_title()

    def get_artist_title(self, obj):
        return obj.get_artist_title()
