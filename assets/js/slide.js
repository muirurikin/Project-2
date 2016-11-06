$(document).ready(function() {
  //set initial slider layout/sizes and variables
  fullWidth = 100;
  speed = 400;
  count = 1;
  $(".slider-item:first-of-type").clone().insertAfter(".slider-item:last-of-type");
  $(".slider-item:nth-last-of-type(2)").clone().insertBefore(".slider-item:first-of-type");
  slideItem = $('.slider-item');
  slideInner = $('.slider-inner');
  mLeft = 'margin-left';
  slideInner.css('width', slideItem.length * fullWidth + '%');
  slideItem.css('width', slideInner.width() / slideItem.length);
  slideInner.css(mLeft, '-' + slideItem.width() + 'px');

  slideItem.each(function() {
    var _ = $(this);
    _.css('background', 'url(' + _.find("img").attr("src") + ')');
    _.css('background-size', 'cover');
    _.css('background-position', 'center');
  });

  //set click function statements
  $('.slider-click').each(function() {
    var _ = $(this);
    var active = false;
   
    //on click either slide button
    _.bind('click', function() {
      if (active) {
        return;
      }
      active = true;
      //click right slider and animate, if slider is at end loop back to beginning
      if (_.hasClass('slider-right-click')) {
        count += 1;
        slideInner.stop().animate({
          marginLeft: "-=" + slideItem.width() + 'px',
        }, speed, function() {
          if (count >= $(".slider-item:last-of-type").index()) {
            slideInner.css(mLeft, '-' + slideItem.width() + 'px');
            count = 1;
          }
          active = false;
        });
      }
      //click left slider and animate, if slider is at beginning loop to end
      if (_.hasClass('slider-left-click')) {
        count -= 1;
        slideInner.stop().animate({
          marginLeft: "+=" + slideItem.width() + 'px',
        }, speed, function() {
          if (count <= 0) {
            var thisMargin = slideItem.length * fullWidth - fullWidth * 2;
            slideInner.css(mLeft, '-' + thisMargin + '%');
            count = slideItem.length - 2;
          }
          active = false;
        });
      }
    });
  });

  slideItem.each(function() {
    var _ = $(this);
    _.mousedown(function() {
      $('body').css('cursor', 'move');
      x = event.pageX;
    });
    
    _.mouseup(function() {
      if (xMove < x) {
        $('.slider-right-click').trigger("click");
      }
      if (xMove > x) {
        $('.slider-left-click').trigger("click");
      }
      slideItem.css('margin',  '0');
      xMove = 0;
      x = 0;
      $('body').css('cursor', 'default');
     
    });
  });

});
//on page resize, reset widths and margin
$(window).resize(function() {
  slideInner.css('width', slideItem.length * fullWidth + '%');
  slideItem.css('width', slideInner.width() / slideItem.length);
  slideInner.css(mLeft, '-' + count * slideItem.width() + 'px');
});