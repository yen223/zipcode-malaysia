;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

  var get_text = function(event){
    var $result = $("#result-display");
    $result.hide();
    $.getJSON('/api/state/' + $('input[name="postcode"]').val() + '/', function(data){
        console.log('Data:' + data);
        $('#results').html(tablerize(data));
    });
    $result.show();
    return false;
  }

  $("#btn_generate").on("click", get_text);
  $("#paragraphs").submit(get_text);
  $( 'input[name="postcode"]' ).change(function() {
    if ($('input[name="postcode"]').val().length >= 5){
        $("#btn_generate").removeAttr("disabled");
    } else {
        $("#btn_generate").attr("disabled", true);
    }
  });

})(jQuery, this);

  function tablerize(data){
      result = [];
      if (data.length > 0){
          $.each(data, function(index,value){
            result.push('<tr><td>' + value['zipcode'] + '</td><td>' + value['city'] + '</td><td>' + value['state'] + '</td></tr>');
          });
        } else {
            result.push('<tr><td colspan="3">No results found.</td></tr>');
        }
      return result.join('');
    };