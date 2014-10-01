;
(function($, window) {
  'use strict';

  var isopen = false;

  var $main = $('body'),
      tpl = '<div class="olg-msgBox hide"><i class="olg-msgBox-close fa fa-times-circle-o"></i><div class="olg-msgBox-ctn"><h3 class="msgBox-title"></h3><div class="msgBox-content"></div></div></div>',
      modal = '<div class="olg-modal hide"></div>';

  olg.msgBox = {

      init: function(args) {
          var me = this;

          me.options = args || {};
          me.options.title = args.title || "";
          me.options.content = args.content || "";

          return me;
      },

      alert: function() {

      },

      dialog: function(content, title, args) {
          var me = this,
              args = args || {};

          if (isopen) {
              return;
          }

          args.title = title || "";
          args.content = content || "";

          me.init(args);
          me.appendModal();            

          $main.find('.olg-modal').removeClass('hide');

          me._bind();
      },

      appendModal: function() {
          var me = this,
              opts = me.options,
              hasModal = (typeof(opts.modal) === 'undefined') ? true : opts.modal;

          if(hasModal) {
              $main.append(modal);
          }

          $main.append(tpl);


          me.$modal = $main.find('.olg-modal');
          me.$msgBox = $main.find('.olg-msgBox');

          me.addOptions();
      },

      addOptions: function() {
        var me = this,
            opts = me.options,
            maxWidth = 800,
            maxHeight = 600;

        if (opts.title !== "") {
            me.$msgBox.find('h3').html(opts.title);
        }

        if (opts.content !== "") {
            me.$msgBox.find('.msgBox-content').html(opts.content);
        }

        if ((opts.height) && (opts.height <= 600)) {
            me.$msgBox.css({
                "height" : opts.height
            });
        }

        if (opts.width) {
            var _dWidth = (opts.width > maxWidth) ? maxWidth : opts.width,
                diff = _dWidth/2;
                
            me.$msgBox.css({
                "width" : _dWidth,
                "margin-left" : -Math.abs(diff)
            });
        }

        me.open();
      },

      open : function() {
        var me = this;

        me.$msgBox.removeClass('hide').playAnimation( 'fadeInDown' );

        me.$modal.removeClass('hide').playAnimation( 'fadeIn' );

        isopen = true;
      },

      _bind: function() {
          var me = this,
            $msgBox = $main.find('.olg-msgBox'),
            $modal = $main.find('.olg-modal');

          $msgBox.on('click', '.olg-msgBox-close', function() {            

            $msgBox.playAnimation('fadeOutDown', function() {
              
              $msgBox.addClass('hide');

              $modal.playAnimation( 'fadeOut', function() {
                $modal.addClass( 'hide' );
                me.destroy();
              } );

            } );

          });
      },
      /*
        Destroy modal and msgBox elements
      */
      destroy: function() {
          var me = this;

          me.$modal.remove();
          me.$msgBox.remove();

          isopen = false;
      },

      options: {

      }
  }

}(jQuery, window));