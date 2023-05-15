(function ($) {
    // writes the string
    //
    function typeString($target, string, cursor, delaytyping, calllback) {
      $target.html(function (_, html) {
        return html + string[cursor];
      });
      if (cursor < string.length - 1) {
        setTimeout(function () {
          typeString($target, string, cursor + 1, delaytyping, calllback);
        }, delaytyping);
      }
      else {
        calllback();
      }
    }
    // clears the string after typing it
    function deleteString($target, delaydeleting, callback) {
      var length;
      $target.html(function (_, html) {
        length = html.length;
        return html.substr(0, length - 1);
      });
      if (length > 1) {
        setTimeout(function () {
          deleteString($target, delaydeleting, callback);
        }, delaydeleting);
      }
      else {
        callback();
      }
    }
    // jQuery hook
    $.fn.extend({
      typewritereffect: function (opts) {
        var settings = $.extend({}, $.typewritereffect.defaults, opts);
        return $(this).each(function () {
          (function loop($tar, idx) {
            // type
            typeString($tar, settings.text[idx], 0, settings.delaytyping, function () {
              // delete
              setTimeout(function () {
                deleteString($tar, settings.delaydeleting, function () {
                  loop($tar, (idx + 1) % settings.text.length);
                });
              }, settings.pause);
            });
          }($(this), 0));
        });
      }
    });
    // Here you can set the default timings for the typewriter effects
    // 1) delaytyping: number of milliseconds between each character being typed
    // 2) delaydeleting: number of milliseconds between each character being removed
    // 3) pause: number of milliseconds to pause after a line is fully typed
    $.extend({
      typewritereffect: {
        defaults: {
          delaytyping: 150,
          delaydeleting: 50,
          pause: 1000,
          text: []
        }
      }
    });
  }(jQuery));
  jQuery(document).ready(function($) {
    // This bit types the text into our element with ID 'typewriter'
    // Update the values in the text array to display the text you want
    $('#typewriter').typewritereffect({
      text: ['my dick and balls','my cock and balls','my left teste']
    });
  }
  )