;(function ($, window, undefined) {
  'use strict';
  $(document).ready(function() {
    $.dynatableSetup({
      features: {
          paginate: true,

          sort: false,
          pushState: true,
          search: false,
          recordCount: false,
          perPageSelect: false
      },// your global default options here
      params: {
          perPageDefault: 10,
          records: 'results',
          queryRecordCount: 'count'
        },
      inputs: {
        paginationLinkTarget: $('#paginate'),
        paginationClass: 'pagination',
        processingText: '<img src="' + LOADER_GIF + '" />',
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

  var CITY_HEADERS = ["Zipcode", "City", "State"];
  var results;
  var hideResults = function(){
    var $cityresult = $("#city-result-display");
    var $streetresult = $("#street-result-display");
    $cityresult.hide();
    $streetresult.hide();
    $("#btn_find_street").prop('disabled', true);
    $('#btn_find_street').text('Finding locations...');
    $(".loading").show();
  }

  var get_city_result = function(event){
    hideResults();
    var $result = $("#city-result-display");
    var dynatable = $('#city-results').data('dynatable');
    dynatable.settings.dataset.ajaxUrl = '/api/city/'+$('input[name="postcode"]').val()+'/';
    // $('#city-results').on("dynatable:beforeProcess", function(data){
    //     $result.hide();
    // })
    $('#city-results').on("dynatable:afterUpdate", function(data){
        $result.show();
    })
    dynatable.process();
    return false;
  }

  var get_street_result = function(event){
    event.preventDefault();
    hideResults();
    var $result = $("#street-result-display");
    var dynatable = $('#street-results').data('dynatable');
    var postcode = $('input[name="postcode"]').val();
    dynatable.settings.dataset.ajaxUrl = '/api/street/'+ postcode +'/';
    // $('#street-results').on("dynatable:beforeProcess", function(data){
    //     $result.hide();
    // })
    $('#street-results').on("dynatable:afterUpdate", function(data){
        $("#result-label").text(postcode);
        $result.show();
        $('#btn_find_street').prop('disabled', false);
        $('#btn_find_street').text('Find Locations');
        $('html, body').animate({
                scrollTop: $("#street-result-display").offset().top-20
            }, 500);
        $(".loading").hide();
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