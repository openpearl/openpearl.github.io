var timeouts = [];
var globalI = 0;
var ellipsis = $('#ellipsis');


// SKIP
var globalDelay = 0;
$('#skip').click(function() {
  globalDelay = 1;
  for (var j in timeouts) {
    clearTimeout(timeouts[j]);
  }

  timeout(globalI);

  // FIXME: Hacky fix.
  $($ellipsis).hide();
});

// DELAY MESSAGE
var $ellipsis = $('#ellipsis');
var $cards = $('.content-card').not($ellipsis).toArray();
function timeout(index) {
  
  globalI = index;
  
  var textLength = 0;
  if (index > 0 && index < $cards.length) {
    textLength = $cards[index-1].innerText.length;
  }

  // var delay = 850 + textLength * 25;
  var delay = 100 + textLength;
  // var delay = 100 + textLength * 5;
  delay = globalDelay || delay;

  var myTimeout = setTimeout(function () {

    $($ellipsis).hide();

    if (index <= $cards.length) {

      $($ellipsis)
        .css({
          display: 'flex'
        })
        .animate({
          opacity: 0
        }, 1, function() {

          if ($cards[index + 1]) {
            var _classList = $cards[index+1].classList; 
            
            $ellipsis.removeClass('right');
            if ($.inArray('right', _classList) > -1) {
              $ellipsis.addClass('right');
            }

            if (index < $cards.length - 1) {
              $($ellipsis)
                .delay(500)
                .animate({
                  opacity: 1
                }, 300);
            }
          }

          if (index < $cards.length) {
            $($cards[index])
              .css({
                display: 'flex'
              })
              .animate({
                opacity: 1,
                'margin-top': "-=30px"
              }, 300);
          }
        });

      if (index === $cards.length - 1) {
        $('#footer').show();
      }

      timeout(index + 1);
    }
  }, delay);

  timeouts.push(myTimeout);
}

timeout(0);
