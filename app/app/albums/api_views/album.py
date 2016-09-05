from albums.models import Album
from albums.serializers.album import AlbumSerializer
from rest_framework import viewsets


class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    """
    List all albums.
    """
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer