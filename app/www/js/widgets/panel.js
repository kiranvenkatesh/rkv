;
(function($, window) {
  'use strict';

  var isopen = false;

  var $main = $('body'),
      tpl = '<div class="olg-panel hide"><i class="olg-panel-close fa fa-times-circle-o"></i><div class="olg-panel-ctn"><div class="panel-content"></div></div></div>',
      modal = '<div class="olg-modal hide"></div>';

  olg.panel = {

    init: function (args) {
      var me = this;

      me.options = args || {};
      me.options.title = args.title || "";
      me.options.content = args.content || "";

      return me;
    },

    show: function () {
      var me = this;

      me.init();

      var isPanel = me.addPanel();

      if( isPanel ) {
        me.addOptions( args );
      }

    },

    addPanel: function () {
      var me = this;

      $main.append( tpl );

      return true;
    },

    addOptions: function () { 

    }

  }

}(jQuery, window));