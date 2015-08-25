$(function() {

  var ie = $.browser.msie;
  var ie6 = ie && $.browser.version.substr(0,1)<7;

  // $('.phr-definition-body').hide(); // collapse all definitions
  
  // toggle visibility of terms/definitions
  $('#phr-definitions-toggle').click(function(){
    if($(this).text() == "(Show all definitions)") {
      $('.phr-definition h3').css('background-position','-600px 8px');
      $('.phr-definition-body').slideDown('fast');
      $('#phr-definitions-hide').show();
      $(this).text("(Hide all definitions)");
    } else { 
      $('.phr-definition h3').css('background-position','0 8px');
      $('.phr-definition-body').slideUp('fast');
      $('#phr-definitions-show').show(); 
      $(this).text("(Show all definitions)")
    }
    return false;
  });

  // toggle visibility of terms/definitions (h3 tag)
  $('#phr-definitions .phr-definition h3').click(function(){
    if($(this).next().is(":visible")) {
      $(this).next().slideUp('fast');
      $(this).css('background-position','0 8px');
    } else {
      $(this).next().slideDown('fast');
      $(this).css('background-position','-600px 8px');
    }
    return false;
  });
  
  // toggle visibility of terms/definitions (a tag - for keyboard accessibility)
  $('#phr-definitions .phr-definition h3 a').click(function(){
    if($(this).parent().next().is(":visible")) {
      $(this).parent().next().slideUp('fast');
      $(this).parent().css('background-position','0 8px');
    } else {
      $(this).parent().next().slideDown('fast');
      $(this).parent().css('background-position','-600px 8px');
    }
    return false;
  });
    
  // hide tooltip on ESC key
  $(window).keyup(function(event) {
    if(event.keyCode == '27') { // ESC key
      $('#phr-tooltip').hide();
    }
  });

  // handle tooltip click events
  $('a.phr-tip').click(function(e){

    if($('#phr-tooltip').is(':visible')) {
      $('#phr-tooltip').hide();
    } 
    else {
      target_id = $(this).attr('href').replace(/#phr_/,"");
      $('#phr-tooltip .phr-tooltip-content').html($('#'+target_id).html());
	
      offset = $(this).offset();
      offset.bottom = offset.top + $(this).height() - 10;
      offset.right = offset.left - $('#phr-tooltip').width() + 30;
      offset.left = offset.left + $(this).width() - 30;
  
      $('#phr-tooltip').css('position','absolute');
      $('#phr-tooltip .phr-definition-body').show();
      $('#phr-tooltip h3').css('background-image','none');
      $('#phr-tooltip').css('top',offset.bottom);
        
      if($(this).attr('rel')=='bl') { // show phr-tooltip @ bottom left
        $('#phr-tooltip').css('left',offset.right);
        $('#phr-tooltip').css('top',offset.bottom);
        $('#phr-tooltip .phr-tooltip-arrow').css('background-position',$('#phr-tooltip').width()-30-18);
        var bg_arrow = 'url(images/tooltip/arrow-bl.png)';
        if(ie6) bg_arrow = 'url(images/tooltip/arrow-bl.gif)';
        $('#phr-tooltip .phr-tooltip-arrow').css('background-image',bg_arrow);
      }
      else { // show tooltip @ bottom right
        $('#phr-tooltip').css('left',offset.left);
        $('#phr-tooltip').css('top',offset.bottom);
        $('#phr-tooltip .phr-tooltip-arrow').css('background-position',30);
        var bg_arrow = 'url(images/tooltip/arrow-br.png)';
        if(ie6) bg_arrow = 'url(images/tooltip/arrow-br.gif)';
        $('#phr-tooltip .phr-tooltip-arrow').css('background-image',bg_arrow);
      }
      $('#phr-tooltip').show();
    }
    return false;
  });
  // when a user clicks the link of an open tooltip, close the tooltip
  $('a').click(function(e){
    if(!($(this).hasClass('phr-tip'))) {
      $('#phr-tooltip').hide();
    }
  });
  // when a user clicks outside the tooltip, close the tooltip
  $('body').click(function(e){
    if($(e.target).parents('#phr-tooltip').length===0) {
      $('#phr-tooltip').hide();
    }
  });
  
});
