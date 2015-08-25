var timeouts = [];
var globalI = 0;

// SKIP
var globalDelay = 0;
$('#skip').click(function() {
  globalDelay = 1;
  for (var j in timeouts) {
    clearTimeout(timeouts[j]);
  }

  timeout(globalI);
});

// DELAY MESSAGE
var $cards = $('.content-card').toArray();
function timeout(i) {
  globalI = i;
  var textLength = 0;
  if (i > 0) {
    textLength = $cards[i-1].innerText.length;
  }

  var delay = 850 + textLength * 25;
  delay = globalDelay || delay;

  var myTimeout = setTimeout(function () {
    if (i < $cards.length) {
      $($cards[i]).animate({
        opacity: 1,
        'margin-top': "-=30px"
      }, 200);  
      timeout(i + 1);
    }
  }, delay);

  timeouts.push(myTimeout);
}

timeout(0);
