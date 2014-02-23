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
    $.dynatableSetup({
      features: {
          paginate: true,

          sort: false,
          pushState: true,
          search: false,
          recordCount: true,
          perPageSelect: false
      },// your global default options here
      params: {
          perPageDefault: 10,
          records: 'results',
          queryRecordCount: 'count'
        }
    });
    $("#city-results").dynatable({
        features: {
            paginate: false,
        },
        dataset: {
            ajax:true,
            ajaxUrl:'/api/city/'+$('input[name="postcode"]').val()+'/',
            ajaxOnLoad: false,
            records:[],
        }
    });
    $("#street-results").dynatable({
        dataset: {
            ajax:true,
            // ajaxUrl:'/api/city/'+$('input[name="postcode"]').val()+'/',
            ajaxOnLoad: false,
            records:[],
        }
    });
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

  var CITY_HEADERS = ["Zipcode", "City", "State"];
  var results;
  var hideResults = function(){
    var $cityresult = $("#city-result-display");
    var $streetresult = $("#street-result-display");
    $cityresult.hide();
    $streetresult.hide();
  }

  var get_city_result = function(event){
    hideResults();
    var $result = $("#city-result-display");
    var dynatable = $('#city-results').data('dynatable');
    dynatable.settings.dataset.ajaxUrl = '/api/city/'+$('input[name="postcode"]').val()+'/';
    // $('#city-results').on("dynatable:beforeProcess", function(data){
    //     $result.hide();
    // })
    $('#city-results').on("dynatable:afterProcess", function(data){
        $result.show();
    })
    dynatable.process();
    return false;
  }

  var get_street_result = function(event){
    hideResults();
    var $result = $("#street-result-display");
    var dynatable = $('#street-results').data('dynatable');
    dynatable.settings.dataset.ajaxUrl = '/api/street/'+$('input[name="postcode"]').val()+'/';
    // $('#street-results').on("dynatable:beforeProcess", function(data){
    //     $result.hide();
    // })
    $('#street-results').on("dynatable:afterProcess", function(data){
        $result.show();
    })
    dynatable.process();
    return false;
  }

  $("#btn_find_city").on("click", get_city_result);
  $("#btn_find_street").on("click", get_street_result);
  $("#paragraphs").submit(get_city_result);

  $( 'input[name="postcode"]' ).keyup(function() {
    if ($('input[name="postcode"]').val().length == 5){
        $("#btn_find_city").removeAttr("disabled");
        $("#btn_find_street").removeAttr("disabled");
    } else {
        $("#btn_find_city").attr("disabled", true);
        $("#btn_find_street").attr("disabled", true);
    }
  });

})(jQuery, this);

  function tablerize(data, header){
      result = []; 
      var table_header = $("");
      var table_body = $("");
      if (header.length > 0){
        table_header = $("<thead>").html(
            $("<tr>").html(
                $.each(header, function(index,value){
                    return $("<th>").text(value[0]);
                })
            )
        )
        console.log("Table headers:" + table_header);
      }

      if (data.length > 0){
        table_result = $("<tbody>").html(
            $.each(data, function(index, value){
                $("<tr>").html(
                    $.each(header, function(index, header){
                        $("<td>").html(value[header]);
                    })
                )
            })
        )
        //   $.each(data, function(index,value){
        //     result.push('<tr><td>' + value['zipcode'] + '</td><td>' + value['city'] + '</td><td>' + value['state'] + '</td></tr>');
        //   });
        // } else {
        //     result.push('<tr><td colspan="3">No results found.</td></tr>');
        } else {
            table_result = '<tr><td colspan="'+header.length+'">No results found</td></tr>';
        }
      return table_header.append(table_result);
    };