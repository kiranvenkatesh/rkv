exports.launcher = {

  start : function () {
    var me = this,
      $doc = $(document),
      $win = $( window ),
      $header = $doc.find( '.header' ),
      $btmNav = $doc.find('.bottom-nav');

    $doc.hammer();

    me.$win = $win;
    me.$doc = $doc;
    me.$header = $doc.find('.header');

    me.$header.on( 'tap', 'ul > li', function ( e ) {
      var item = $(this),
        section = item.data( 'navigate' );

      olg.fire( 'navigate:to' , {
        section: section
      } );

    } );

  }

};