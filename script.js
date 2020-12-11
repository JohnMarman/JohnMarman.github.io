$(function() {
     $('.tab-link').on('click', function() {
          // Switch the class on the previously active div to make it hidden
          $('.active-demo').removeClass('active-demo').addClass('inactive');
          // Switch the class on the new active div to show it
          var selectorForActiveDemo = $(this);
          $(selectorForActiveDemo).removeClass('inactive').addClass('active-demo');
     });
});