;(function($, window) {
  'use strict';

  $.fn.playAnimation = function(anim,cb) {
    var me = this,
      $target = me;

    if($target.length !== 0) {

      $target.addClass('playing-anim ' + anim);

      $target.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function () {
        $target.removeClass('playing-anim ' + anim);
        
        if(cb) {
          cb();
        }
      });

    }

  };

}(jQuery, window));