from django.views.generic import TemplateView


class AlbumView(TemplateView):
    template_name = 'album.html'

    def get_context_data(self, pk, **kwargs):
        context = super(AlbumView, self).get_context_data(**kwargs)
        context['album_id'] = pk
        return context
