from albums.models import Track
from albums.serializers.track import TrackSerializer
from rest_framework import viewsets
from rest_framework import filters


class TrackViewSet(viewsets.ModelViewSet):
    """
    List all tracks.
    """
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('album',)
    ordering_fields = '__all__'
