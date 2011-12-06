// ===========================================================================
//  
// collapsable  - a jQuery plugin for simple collapsable sections
// Copyright (c) 2011 Benny Lin
//
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
//
// ===========================================================================


(function($){

  $.collapsable = {
    defaults : {
      "headerClass"         : "collapse-header",
      "contentClass"        : "collapse-content",
      "statusClass"         : "collapse-status",
      "transitionSpeed"     : 140,
      "expandAllSelector"   : "#expand-all",
      "collapseAllSelector" : "#collapse-all",
      "openText"            : "open",
      "closeText"           : "close",
      "fadeSpeed"           : 100,
    }
  };

  $.fn.collapsable = function(config){
      $.collapsable.config = $.extend({}, $.collapsable.defaults, config);

      applyBindings();

      return this.each(function(){
        init(this);
      });
   }

  // Private Functions

   var init = function(el) {
      var headerContainer = $("<div>").addClass($.collapsable.config.headerClass);
      var contentContainer = $("<div>").addClass($.collapsable.config.contentClass);
      var statusContainer = $("<span>").addClass($.collapsable.config.statusClass)
                                        .text($.collapsable.config.closeText);

      headerContainer.css({
        "display" : "block",
        "padding" : "5px",
        "height"  : "auto",
        "cursor" : "pointer",
        "padding-right" : "65px",
        "position" : "relative"
      });

      contentContainer.css({
        "padding" : "5px 0"
      });

      statusContainer.css({
        "width" : "25px",
        "display" : "block",
        "padding" : "5px",
        "position" : "absolute",
        "right" : "0",
        "top" : "0",
        "font-size" : "11px",
        "font-weight" : "bold"
      });

      headerContainer.append($(":first", el)).append(statusContainer);
      contentContainer.append($("*",el));

      $(el).prepend(headerContainer).append(contentContainer);
  };

  var toggleStatus = function(status) {
    return (status == $.collapsable.config.openText)? $.collapsable.config.closeText : $.collapsable.config.openText
  };

  var getStatus = function(el) {
    return $(el).siblings("." + $.collapsable.config.headerClass).find("." + $.collapsable.config.statusClass);
  };

  var applyBindings = function() {

    $("." + $.collapsable.config.headerClass).live("click", function() {
      var content = $(this).siblings("." + $.collapsable.config.contentClass);
      content.slideToggle($.collapsable.config.transitionSpeed, function() {
        var status = getStatus(this);
        status.text(toggleStatus(status.text(),$.collapsable.config));
      });
    });

    $($.collapsable.config.expandAllSelector).live("click", function() {
      $("." + $.collapsable.config.contentClass).each(function(){
        $(this).slideDown($.collapsable.config.transitionSpeed, function() {
          getStatus(this).text($.collapsable.config.closeText);
        });
      });
   });

    $($.collapsable.config.collapseAllSelector).live("click", function() {
      $("." + $.collapsable.config.contentClass).each(function(){
        $(this).slideUp($.collapsable.config.transitionSpeed, function() {
          getStatus(this).text($.collapsable.config.openText);
        });
      });
    });

  };
})(jQuery);
