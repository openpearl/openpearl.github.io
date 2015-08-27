// INITIALIZATION *************************************************************

var timeouts = []; // Holds references to all the setTimeouts.
var globalIndex = 0; // Provides index for real-time referencing.

var globalDelay = 0; // or false. No delays globally.

var $ellipsis = $('#ellipsis');
var $cards = $('.content-card').not($ellipsis).toArray();

// SKIP BUTTON ****************************************************************

// FIXME: Not sure exactly how to stop the timeouts and render all correctly.
// Disabled for now. Fix when possible.
$('#skip').click(function() {
  
  globalDelay = 1; // Set to true with 1ms.
  
  // Loop through and clear all preset timeouts.
  for (var j in timeouts) {
    clearTimeout(timeouts[j]);
  }

  // Call the timeout method again to re-set the timeouts.
  // This time, our globalDelay will override the calculated delay.
  timeout(globalIndex);
  $($ellipsis).hide(); // Skipping the dialogue does not require the ellipsis.
});

// DELAY MESSAGE **************************************************************

function timeout(index) {
  
  globalIndex = index; // Provide a reference for the current index.
  var textLength = 0; // First, set a base definition.
  
  // Calculate the textLength of the PREVIOUS card.
  // This allows the user to have time to read through the message.
  if (index > 0 && index < $cards.length) {
    textLength = $cards[index-1].innerText.length;
  }

  // Set our delays.
  // var delay = 850 + textLength * 25;
  var delay = 100;
  // var delay = 100 + textLength * 5;
  delay = globalDelay || delay; // If globalDelay is present, overwrite.

  // Create a timeout and provide the reference.
  var myTimeout = setTimeout(function () {

    // First, make sure the ellipsis is hidden.
    $($ellipsis).removeClass('flex-container').hide();

    // Only execute if we have messages.
    if (index < $cards.length) {

      // Reveal the ellipsis.
      $($ellipsis)
        .addClass('flex-container')
        .animate({
          opacity: 0
        }, 1, function() {

          // First, clear align right from our ellipsis.
          $ellipsis.removeClass('right');

          // If the next card is on the right, add the ellipsis to the right.
          if ($cards[index + 1]) {
            var _classList = $cards[index+1].classList; 
            if ($.inArray('right', _classList) > -1) {
              $ellipsis.addClass('right');
            }  
          }

          // Now, reveal the ellipsis.
          $($ellipsis)
            .delay(500)
            .animate({
              opacity: 1
            }, 300);

          // Finally, reveal the card itself.
          $($cards[index])
            .addClass('flex-container')
            .animate({
              opacity: 1,
              'margin-top': "-=30px"
            }, 300);

          // Now recursively call the next card.
          timeout(index + 1);
        });

      // Reveal the footer at the very end.
      if (index === $cards.length - 1) {
        $('#footer').show();
      }
    }
  }, delay);

  timeouts.push(myTimeout);
}

// EXECUTE ********************************************************************

timeout(0); // Start at the first card.
