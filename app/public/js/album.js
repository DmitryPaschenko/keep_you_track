album = {

    init: function(albumId){
        var self = album;

        self.data = {}
        self.data.albumId = albumId;

        self.albumInfo.init();
        self.tracks.init();
        self.track.init();
    },

    albumInfo: {
        init: function(){
            var self = album.albumInfo;

            self.data = {};
            self.data.$albumBlock = $('#album-block');
            self.data.$coverImage = self.data.$albumBlock.find('img');
            self.data.$albumName = self.data.$albumBlock.find('.name');
            self.data.$albumCalculated = self.data.$albumBlock.find('.calculated');

            self.load();
        },

        load: function () {
            var self = album.albumInfo;
            var albumId = album.data.albumId;
            var url = 'albums/' + albumId + '/';

            api.request.get(url, function (data) {
                var calcText = data.track_count + ' tracks, ' + data.track_duration_minutes + ' minutes';
                self.data.$albumName.text(data.artist_title + ' - ' + data.title);
                self.data.$albumCalculated.text(calcText);
            });

        }

    },

    track: {
        init: function(){
            var self = album.track;

            self.data = {};
            self.data.addModalId = 'addModal';
            self.data.editModalId = 'editModal';
            self.data.$addBtn = $('#album-block a.add');
            self.data.$createBtn = $('#addModal a.btn-save-new-track');
            self.data.$updateBtn = $('#editModal a.btn-update-track');
            self.data.$editBtn = $('#tracks-block a.act-edit');
            self.data.$deleteBtn = $('#tracks-block a.act-delete');
            self.data.$create_song_name_input = $('#addModal .song-form input[name=song_name]');

            self.data.$update_song_name_input = $('#editModal .song-form input[name=song_name]');
            self.data.$update_song_id_input = $('#editModal .song-form input[name=song_id]');

            self.binds();
        },

        binds: function(){
            var self = album.track;
            self.data.$addBtn.unbind().on('click', self.showAddTrackPopup);
            self.data.$editBtn.unbind().on('click', self.showEditTrackPopup);
            self.data.$createBtn.unbind().on('click', self.create);
            self.data.$updateBtn.unbind().on('click', self.update);
            self.data.$deleteBtn.unbind().on('click', self.remove);
        },

        create: function(){
            var self = album.track;
            var song = self.data.$create_song_name_input.val();
            var albumId = album.data.albumId;
            var url = 'tracks/';
            var requestData = {
                'album': albumId,
                'title': song
            }


            if (song.length > 0) {
                api.request.post(url, requestData, function (data) {
                    album.tracks.init();
                    popup.close();
                });
            } else {
                alert('Please fill song title');
            }

            return false;
        },

        update: function(){
            var self = album.track;
            var song = self.data.$update_song_name_input.val();
            var albumId = album.data.albumId;
            var songId = self.data.$update_song_id_input.val();
            var url = 'tracks/' + songId + '/';
            var requestData = {
                'album': albumId,
                'title': song
            }

            if (song.length > 0) {
                api.request.put(url, requestData, function (data) {
                    album.tracks.init(album.tracks.data.page);
                    popup.close();
                });
            } else {
                alert('Please fill song title');
            }

            return false;
        },

        remove: function(){
            var self = album.track;
            var songId = $(this).attr('data-id');
            var url = 'tracks/' + songId + '/';
            var requestData = {}

            if (confirm("Please confirm remove track with id: " + songId)) {
                api.request.remove(url, requestData, function (data) {
                    album.tracks.init();
                });
            }

            return false;
        },

        showAddTrackPopup: function(){
            var self = album.track;
            popup.init(self.data.addModalId);
            popup.show();
            return false;
        },

        showEditTrackPopup: function(){
            var self = album.track;
            var id = $(this).attr('data-id');
            var url = 'tracks/' + id + '/';

            actions = $(this).closest('td').find('a');
            actions.css('display', 'block');
            popup.init(self.data.editModalId);
            popup.showWithArrow($(this), function () {
                actions.css('display', '');
            });
            self.data.$update_song_id_input.val(id);
            api.request.get(url, function (data) {
                self.data.$update_song_name_input.val(data.title);
            });

            return false;
        }
    },

    tracks: {
        init: function(page){
            var self = album.tracks;

            self.data = {};

            self.data.page = page ? page : 1;
            self.data.tracksTable = $('#tracks-block table');
            self.data.tracksTableBody = self.data.tracksTable.find('tbody');
            self.data.sort_class = '.table-sort';
            self.data.nextPageBtn = $('#tracks-block table tfoot #tracks-next-page');
            self.data.prevPageBtn = $('#tracks-block table tfoot #tracks-prev-page');

            self.data.sortBy = 'title';
            self.data.sortDest = $('#tracks-block table .table-sort[data-sort-by="title"]').attr('data-sord-dest');

            self.binds();
            self.load();
        },

        binds: function () {
            var self = album.tracks;

            self.data.nextPageBtn.unbind().on('click', self.goToPage);
            self.data.prevPageBtn.unbind().on('click', self.goToPage);
            $(self.data.sort_class).unbind().on('click', self.sort);
        },

        sort: function () {
            var self = album.tracks;
            var sortBy = $(this).attr('data-sort-by');
            var dest = $(this).attr('data-sord-dest');

            self.data.sortBy = sortBy;
            self.data.sortDest = self.data.sortDest == '' ? '-' : '';
            $(this).attr('data-sord-dest', self.data.sortDest);
            self.load(self.data.page);

            return false;
        },

        goToPage: function () {
            var self = album.tracks;
            var page = $(this).attr('data-go-to-page');
            if (page !== '') {
                self.data.page = page;
                self.load();
            }

            return false;
        },

        clearList: function () {
            var self = album.tracks;
            self.data.tracksTableBody.html('');
        },

        getParameterByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        load: function () {
            var self = album.tracks;
            var albumId = album.data.albumId;
            var url = 'tracks/?album=' + albumId + '&page=' + self.data.page;
            if (self.data.sortBy) {
                url = url + '&ordering=' + self.data.sortDest + self.data.sortBy;
            }

            api.request.get(url, function (data) {
                if (data.next) {
                    var nextPage = self.getParameterByName('page', data.next);
                    if (nextPage == undefined) {
                        nextPage = 1
                    }
                    self.data.nextPageBtn.attr('data-go-to-page', nextPage);
                } else {
                    self.data.nextPageBtn.attr('data-go-to-page', '');
                }

                if (data.previous) {
                    var prevPage = self.getParameterByName('page', data.previous);
                    if (prevPage == undefined) {
                        prevPage = 1
                    }
                    self.data.prevPageBtn.attr('data-go-to-page', prevPage);
                } else {
                    self.data.prevPageBtn.attr('data-go-to-page', '');
                }


                self.clearList();
                var items = data.results;

                items.forEach(function(item, i, arr) {
                    var row = [
                        '<tr>',
                        '<td>' + item.title + '</td>',
                        '<td>' + item.artist_title + '</td>',
                        '<td>' + item.album_title + '</td>',
                        '<td class="actions"><a href="#" class="act-edit" data-id="' + item.id + '">',
                        '</a><a href="#" class="act-delete" data-id="' + item.id + '"></a></td>',
                        '</tr>'
                    ].join('');

                    self.data.tracksTableBody.append(row);
                });

                album.track.init();

            });
        }
    },
};
