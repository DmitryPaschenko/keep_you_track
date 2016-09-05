popup = {

    init: function (modalId) {
        var self = popup;
        self.data = {};
        self.data.$modal = $('#' + modalId);
        self.data.$modalContent = self.data.$modal.find('.modal-content');
        self.data.onClose = function () {};

        window.onclick = function(event) {
            if (event.target == self.data.$modal[0]) {
                self.data.$modal.css('display', 'none');
                self.data.onClose();
                self.data.onClose = function () {};
            }
        }
    },

    getWindowHeight: function () {
        var height = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        return height
    },

    show: function () {
        var self = popup;
        self.data.$modal.css('display', 'block');
    },

    showWithArrow: function (element, onClose, arrowWidth = 30) {
        var self = popup;
        var popupHeight = self.data.$modalContent.outerHeight();
        var popupWidth = self.data.$modalContent.outerWidth();
        var arrowPosition = $(element).position();
        var elementHeight = $(element).outerHeight();

        self.data.onClose = onClose;
        self.data.$modal.css('position', 'absolute');
        self.data.$modal.css('display', 'block');
        self.data.$modalContent.css('margin', '0px');
        self.data.$modalContent.css('top', arrowPosition.top - popupHeight/2 + elementHeight/2);
        self.data.$modalContent.css('left', arrowPosition.left - popupWidth - arrowWidth);
        self.data.$modal.css('height', self.getWindowHeight());
    },

    close: function () {
        var self = popup;
        self.data.$modal.css('display', 'none');
        self.data.onClose();
    }

};
