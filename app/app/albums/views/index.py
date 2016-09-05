from django.views.generic import TemplateView
from albums.models import Album


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        albums = Album.objects.all()
        context['albums'] = albums
        return context
