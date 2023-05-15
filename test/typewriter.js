(function ($) {
  // writes the string
  function typeString($target, string, cursor, delaytyping, callback) {
    $target.html(function (_, html) {
      return html + string[cursor];
    });
    if (cursor < string.length - 1) {
      setTimeout(function () {
        typeString($target, string, cursor + 1, delaytyping, callback);
      }, delaytyping);
    } else {
      setTimeout(callback, delaytyping); // Add a delay before deleting
    }
  }

  // clears the string after typing it
  function deleteString($target, delaydeleting, callback) {
    var length = $target.html().length;
    if (length > 0) {
      setTimeout(function () {
        $target.html(function (_, html) {
          return html.substr(0, length - 1);
        });
        deleteString($target, delaydeleting, callback);
      }, delaydeleting);
    } else {
      callback();
    }
  }

  // jQuery hook
  $.fn.extend({
    typewritereffect: function (opts) {
      var settings = $.extend({}, $.typewritereffect.defaults, opts);
      return $(this).each(function () {
        var $element = $(this);
        var currentIndex = 0;

        function typeNextString() {
          var text = settings.text[currentIndex];
          typeString($element, text, 0, settings.delaytyping, function () {
            setTimeout(function () {
              deleteString($element, settings.delaydeleting, function () {
                currentIndex = (currentIndex + 1) % settings.text.length;
                typeNextString();
              });
            }, settings.pause);
          });
        }

        typeNextString();
      });
    },
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
        text: [],
      },
    },
  });
})(jQuery);

jQuery(document).ready(function ($) {
  // This bit types the text into our element with ID 'typewriter'
  // Update the values in the text array to display the text you want
  $('#typewriter').typewritereffect({
    text: ['test1', 'test2', 'test3'],
    pause: 2000, // Add a longer pause between cycles
  });
});
