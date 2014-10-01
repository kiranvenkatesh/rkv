(function($, global) {

  var $doc = $( document );

  olg = {};

  $.extend( olg, {

    setItem : function(args) {
      var prop = args.prop,
        value = args.value;

      if(Modernizr.localstorage) {
        window.localStorage.setItem(prop, value);
      }
    },

    getItem : function(arg) {
      var prop = arg,
        value;

      if(Modernizr.localstorage) {
        value = window.localStorage.getItem(prop);
      }

      return value;
    },

    navigate : function (path) {
      if(path !== "") {
        window.location.href = path;
      }
    },

    setLogin : function(args) {
      var me = this,
        state = args,
        $doc = $(document),
        $header = $doc.find('.header'),
        $link = $header.find('.lgl-logout');

      if(state === true) {
        $link.removeClass('hide');        
        return;
      }

      $link.addClass('hide');
      me.navigate('#/login');
    },

    ns : function(ns,ns_string) {
      var me = this,
        parts = ns_string.split('.'),
        parent = ns;

      if(parts[0] === "App") {
        parts = parts.slice(1);
      }

      var len = parts.length;

      for (var i =0; i < len; i++) {
        if(typeof parent[parts[i]] === "undefined") {
          parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
        console.log(parent);
      }

      return parent;
    },

    prefix: function () {
       var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
          .call(styles)
          .join('') 
          .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    },

    fire: function( eventName, opts ) {

      var args = opts || {};

      if( eventName ) {
        $doc.triggerHandler.apply( $doc, arguments );
        return olg;
      }

    },

    handle: function( eventName, opts ) {
      var me = this;

      $doc.on.apply( $doc, arguments );
      return olg;

    }

  } );

  // //Main app namespace
  // window.olg = olg;

  // return olg;

} ( jQuery, this ));