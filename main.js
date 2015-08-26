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
var $ellipsis = $('#ellipsis')[0];
var $cards = $('.content-card').not($ellipsis).toArray();
function timeout(i) {
  
  globalI = i;
  
  var textLength = 0;
  if (i > 0 && i < $cards.length) {
    textLength = $cards[i-1].innerText.length;
  }

  var delay = 850 + textLength * 25;
  delay = globalDelay || delay;

  var myTimeout = setTimeout(function () {

    $($ellipsis).hide();

    if (i <= $cards.length) {

      $($ellipsis)
        .css({
          display: 'flex'
        })
        .animate({
          opacity: 0
        }, 1, function() {
          if (i < $cards.length - 1) {
            $($ellipsis)
              .delay(500)
              .animate({
                opacity: 1
              }, 300);
          }

          if (i < $cards.length) {
            $($cards[i])
              .css({
                display: 'flex'
              })
              .animate({
                opacity: 1,
                'margin-top': "-=30px"
              }, 300);
          }
        });

      if (i === $cards.length - 1) {
        $('#footer').show();
      }

      timeout(i + 1);
    }
  }, delay);

  timeouts.push(myTimeout);
}

timeout(0);
