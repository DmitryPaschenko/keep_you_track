from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from albums.views.album import AlbumView
from albums.views.index import IndexView
from albums.api_views.album import AlbumViewSet
from albums.api_views.track import TrackViewSet
from rest_framework.routers import DefaultRouter


class MainView(TemplateView):
    template_name = 'index.html'

api = DefaultRouter()
api.register(r'albums', AlbumViewSet)
api.register(r'tracks', TrackViewSet)

urlpatterns = [
    # API
    url(r'^api/v1/', include(api.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^albums/(?P<pk>\d+)/$', AlbumView.as_view()),
    url(r'^$', IndexView.as_view()),
]
