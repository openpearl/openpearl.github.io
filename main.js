$cards = $('.content-card').toArray();
console.log($cards);

function timeout(i) {
  setTimeout(function () {
    console.log(i);
    if (i < $cards.length) {

      $cards[i].animate({
        opacity: 1
      }, 200);  
      
      timeout(i + 1);

    }
  }, 1000);
}

timeout(0);
