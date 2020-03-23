
tabControl();

/*
We also apply the switch when a viewport change is detected on the fly
(e.g. when you resize the browser window or flip your device from 
portrait mode to landscape). We set a timer with a small delay to run 
it only once when the resizing ends. It's not perfect, but it's better
than have it running constantly during the action of resizing.
*/
var resizeTimer;
$(window).on('resize', function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    tabControl();
  }, 250);
});

/*
The function below is responsible for switching the tabs when clicked.
It switches both the tabs and the accordion buttons even if 
only the one or the other can be visible on a screen. We prefer
that in order to have a consistent selection in case the viewport
changes (e.g. when you esize the browser window or flip your 
device from portrait mode to landscape).
*/
function tabControl() {
  var contentClicked = false; // tracks if content area was clicked
  var tabs = $('.tabbed-content').find('.tabs');
  if(tabs.is(':visible')) {
    tabs.find('a').on('click', function(event) {
      event.preventDefault();
      var target = $(this).attr('href'),
          tabs = $(this).parents('.tabs'),
          buttons = tabs.find('a'),
          item = tabs.parents('.tabbed-content').find('.item');
      buttons.removeClass('openTab');
      item.removeClass('openTab');
      $(this).addClass('openTab');
      $(target).addClass('openTab');
    });
  } else {
    $('.item-content').on('click', function(){
      contentClicked = true;
    });
    $('.item').on('click', function() {
      var container = $(this).parents('.tabbed-content'),
          currId = $(this).attr('id'),
          items = container.find('.item');

      if(contentClicked){} // if the content area was clicked, do nothing
      else if(this.classList.contains("openTab")){
        $(this).removeClass('openTab');
        container.find('.tabs a[href$="#'+ currId +'"]').removeClass('openTab');
      }
      else{
        container.find('.tabs a').removeClass('openTab');
        items.removeClass('openTab');
        $(this).addClass('openTab');
        container.find('.tabs a[href$="#'+ currId +'"]').addClass('openTab');
      }

      contentClicked = false;
    });
  } 
}

function closeContent(element){
  element.getElementsByClassName("item-content")[0].classList.removeClass("openTab");
  element.classList.addClass("openTab");
}

function openContent(element){
  element.getElementsByClassName("item-content")[0].classList.addClass("openTab");
  element.classList.removeClass("openTab");
}