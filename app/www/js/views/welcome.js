
var $ = require( '../lib/jquery' ),
  $html = $( 'html' ),
  $body = $( 'body' );
  
var tpl = require( "./../templates/welcome.html" );

module.exports = {

  init : function () {
    var me = this,
      doc = $(document),
      $header = doc.find('.header');

    console.log( 'init in welcome' );
    console.log( tpl );
      // ele = me.$el;

    // olg.handle( 'app:ready', function ( e, args ) { 

    //   me.params = args || {};

    //   me._bind();

    // } );

    ele.addClass('hide');

    // var template = _.template( welcomeTemplate );

    // opts = {
    //   height: 400,
    //   width: 700
    // };

    ele.html(template).removeClass('hide');

  },
  
  events : {

  },

  render : function() {
    var me = this,
      ele = me.$el,
      data = {};
  },

  _bind: function() {
    var me = this,
      params = me.params,
      ele = me.$el,
      $ctn = ele.find( '.content' ),
      $header = params.$header,
      $doc = params.$doc,
      $win = params.$win,
      stopScroll = 'stop-scroll',
      viewClass = 'in-view';

    var offset = $doc.offset(),
      $work = $ctn.find( '[data-section=work]'),
      $about = $ctn.find( '[data-section=about]'),
      aboutOffset = $about.offset(),
      workOffset = $work.offset(),
      aboutTop = aboutOffset.top - 500,
      workTop = workOffset.top - 500;

    $win.on( 'scroll', function ( e ) {        

      var docTop = $doc.scrollTop(),
        animating;

      if( docTop >= workTop ) {
        if( !$work.hasClass( viewClass ) ) {
          $work.addClass( viewClass );
        }
      }

      if( docTop >= aboutTop ) {
        if( !$about.hasClass( viewClass ) ) {
          $about.addClass( viewClass );
        }
      }
      
    } );
    

    $doc.on( 'scroll', function () { 

      var windowHeight = $win.scrollTop() + $win.height();

      if( windowHeight === $doc.height() ) {
        console.log( 'reached the end' );
      }

    } );

    ele.on( 'tap', '.work > div', function ( e ) { 
      var $card = $(this),
        id = $card.data( 'card' ),
        $section = ele.find( '[data-section=work]'),
        $panels = ele.find( '.work-panels' );

      $panels.find( 'card-expand' ).removeClass();

      if( id ) {
        $panel = ele.find( '[ data-card-panel='+ id +']');          

        var d = me.scrollToSection( $section );

        $.when( d ).then( function () { 
          $panel.addClass( 'card-expand' );
          $header.addClass( 'hide' );
          $html.addClass( stopScroll );
        } );
      }

    } );

    ele.on( 'tap', '.fa', function ( e, args ) { 
      var $item = $(this),
        $panel = $item.parent();

      $panel.removeClass( 'card-expand' );
      $html.removeClass( stopScroll );
      $header.removeClass( 'hide' );

    } );

    ele.on( 'tap', '.social', function ( e ) {
      var item = $(this),
        title = item.data( 'title' );

      var first = title.substr( 0,1 ).toUpperCase();
      title = first + title.substr( 1, title.length );

      olg.msgBox.dialog( 'Welcome to my social circle!', title );
    } );

    olg.handle( 'navigate:to', function ( e, args ) { 
      var params = args || {};

      if( params ) {
        var section = params.section;
        var $section = ele.find( '[data-section='+ section +']');

        me.scrollToSection( $section );

      }

    } );

  },

  scrollToSection: function ( section ) {
    var $ele = section;

    var offset = $ele.offset(),
      top = offset.top;

    $body.animate({
      scrollTop: top
    }, 500 );

  },

  remove : function() {
    console.log('Leaving Welcome');
  },

  onHide : function() {
    var me = this;
  }
};

