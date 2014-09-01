var navigationAction = function(){
  var mapContainer = $("#beta-container"),
  contentContainer = $("#project-contents"),
  contentHeadBox = $(".content-box-head");

  $("body").on("click", ".subcategory", function(e){
    e.preventDefault();
    var thisSelf = $(this),
    replace = thisSelf.attr("data-replace")
    controller = null,
    url = null,
    filter = thisSelf.attr("data-filter"),
    parent_id = $("body").attr("data-parent-id"),
    user_id = $("body").attr("data-user-id"),
    parentElement = thisSelf.parent(),
    previousActive = parentElement.children(".subcategory.active"),
    defaultText = thisSelf.text();

    if(thisSelf.hasClass("project-category")){
      controller = "communities";
    }else if(thisSelf.hasClass("media-category")){
      controller = "media";
    }else if(thisSelf.hasClass("discussion-category")){
      controller = "discussions";
    }

    if(user_id.length == 0 && parent_id.length == 0)
    {
      url = "/" + controller + "/c/" + filter
    }
    else if(user_id.length >= 1 && parent_id.length == 0)
    {
      url = "/users/" + user_id + "/" + controller + "/c/" + filter
    }
    else if(parent_id.length >= 1 && user_id.length == 0)
    {
      url = "/communities/" + parent_id + "/" + controller + "/c/" + filter
    }

    jqxhr = $.ajax({
      url: url,
      type: "GET",
      beforeSend: function(){
        NProgress.set(0.8);
        parentElement.children(".subcategory").removeClass("active");
        thisSelf.html("<i class=\"fa fa-refresh fa-spin\"></i>").addClass("active");
      },
      success: function(data){
        NProgress.done();
        console.log("success");
        previousActive.removeClass("active");
        thisSelf.text(replace).addClass("active");
        thisSelf.text(replace);
      },
      error: function(data){
        NProgress.done();
        thisSelf.text(replace);
        thisSelf.text(replace).removeClass("active");
        alertNotice("Something went wrong, Please try again.");
      }
    });
  });

  $("body").on("click", ".switch-map-type", function(e){
    dataMap = $(this).attr("data-map");
    var thisElement = $(this);

    $(".ui-effects-wraer").remove();
    $(".google-earth-alert").remove();

    $.ajax({
      url: "/switch/" + dataMap + "/map",
      type: "GET",
      beforeSend: function(){
        thisElement.html("<i class=\"fa fa-refresh fa-spin\"></i>").addClass("active");
      },
      success: function(data){
        console.log("success");
        thisElement.text(dataMap + " Map");
        if(dataMap == "3D" && data.map_type == "earth"){
          if(ge){
            progressNotice("You already using google earth.")
          }else{
            if(map){
              map.remove();
              map = null;
              $("#map").html("");
            }
            loadGoogleEarth();

            $("#switch-map").children("li").removeClass("active");
            thisElement.parent().addClass("active");
          }
        }else if(dataMap == "2D" && data.map_type == "leaflet"){
          if(map){
            progressNotice("You already using leaflet map.");
          }else{
            ge = null;
            $("#map").html("");
            leafletMapsView(dataContent, latLong);

            $("#switch-map").children("li").removeClass("active");
            thisElement.parent().addClass("active");
          }
        }else{
          progressNotice("Sorry, we do not provide a map for the keyword " + dataMap);
        }

        $("#switch-map").removeClass("open").attr("style","position: absolute; left: -99999px; top: 437px;")
        $("#switch-button").removeClass("open");
      },
      error: function(data){
        thisElement.text(dataMap + " Map");
        alertNotice("Something went wrong, Please try again.");
      }
    });

    e.preventDefault();
  });

  if($(window).width() > 1024){
    $(window).on("scroll",function(){
      console.log("aaaaaaaaaaaaa");

      var mapContainer = $("#beta-container"),
      contentContainer = $("#project-contents"),
      contentHeadBox = $(".content-box-head");

      if (!mapContainer.hasClass("child-content")){
        if(mapContainer.hasClass("fixed-on-top") && (!mapContainer.hasClass("hidden-map") && !mapContainer.hasClass("single-head"))){
          console.log("------------------------------------------------");
          if($(window).scrollTop() > 510 && mapContainer.hasClass("fixed-on-top") ){
            mapContainer.addClass("fix").addClass("header-scroll");
            console.log("////////////////////////////////////////////////////////");

            $("#container-projects").css("margin-top", "565px");
            $("#switch-map-box").animate({marginRight: '-146px'}, 200);
            $("#toggle-map").addClass("disable");
            $(".subcategories").fadeOut();
          }else if(mapContainer.hasClass("header-scroll")){
            mapContainer.removeClass("fix").removeClass("header-scroll");
            console.log("*********************************************");

            $("#container-projects").css("margin-top", "0");
            $("#switch-map-box").animate({marginRight: '0'}, 100);
            $(".subcategories").show("slide", {direction: "up"});
            $("#toggle-map").removeClass("disable");
          }
        }
      }

      if (!mapContainer.hasClass("child-content")){
        // if(contentContainer){
        //   if($(window).scrollTop() > (contentHeadBox.height() + 36)){
        //     console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        //     $("#container-content-left.stay-on-page").removeClass("stay");
        //   }
        //   else{
        //     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        //     $("#container-content-left.stay-on-page").addClass("stay");
        //   }
        // }
        if(contentContainer){
          if($(window).scrollTop() > (contentHeadBox.height() + 36)){
            console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            $("#container-content-left.stay-on-page").removeClass("stay");
          }else{
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
            $("#container-content-left.stay-on-page").addClass("stay");
          }
        }
      }
    });
  }else{
    $("#container-projects").css("margin-top", "0");
    $("#beta-container").removeClass("fix");
  }

  $("#toggle-map").on("click", function(){
    var button = $(this);

    if(mapContainer.hasClass("fixed-on-top") && !mapContainer.hasClass("header-scroll") && !button.hasClass("disable")){
      if(button.hasClass("hide-map")){
        mapContainer.addClass("fix").addClass("hidden-map");
        button.removeClass("hide-map").addClass("show-map").html("Show Map");

        $("#container-projects").css("margin-top", "100px");
        $("#switch-map-box").hide("slide", {direction: "right"});
      }else if(button.hasClass("show-map")){
        mapContainer.removeClass("fix").removeClass("hidden-map");
        button.removeClass("show-map").addClass("hide-map").html("Hide Map");

        $("#container-projects").css("margin-top", "0");
        $("#switch-map-box").show("slide", {direction: "right"}, 500);
      }
    }
  });

  $("#toggle-map-content").on("click", function(e){
    e.preventDefault;
    var button = $(this);

    if(button.hasClass("show-map")){
      button.removeClass("show-map").addClass("hide-map").html("Hide Map");

      setTimeout(function(){
        map.invalidateSize();
        map.setView(new L.LatLng(0, 0),2);
      }, 200)

      $(".map-content").removeClass("hide");
    }else if(button.hasClass("hide-map")){
      button.removeClass("hide-map").addClass("show-map").html("Show Map");

      $(".map-content").addClass("hide");
    }
  });

  $("body").on('click', ".left-menu", function(){
    var location = $(this).find(".image-loader-change");
    var image = $(this).find(".image-loader-change").html();

    location.html("<i class=\"fa fa-refresh fa-spin\"></i>");
  });
}

var accordionLeft = function(element) {
  var showAccordion = $(element).attr("data-show");
  var except = $(element).attr("data-except");

  if(showAccordion === "true" && except !== "all"){
    var accordionStatus = {collapsible: true, icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" } }
  }else{
    var accordionStatus = {collapsible: true, active: false, icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" } }
  }

  $(element).accordion(accordionStatus);
}

$(document).on('page:load', function(){
  // accordionLeft(".resource-accordion");
  // accordionLeft(".community-accordion");
  // accordionLeft(".media-accordion");
});

$(document).on('ready', function(){
  // accordionLeft(".resource-accordion");
  // accordionLeft(".community-accordion");
  // accordionLeft(".media-accordion");
});
