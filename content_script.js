var commentBlockSelectors = "#fbComments, #disqus_thread, #comments, .comments-iframe-container";
var blurbClass = "antisocial-comments-disabled-blurb";
var hideCss = "antisocial-comments-disabled-section";
var hidingComments = true;
var tabId;

if (window == top) {

  var hideComments = function() {
    var commentBlocks = $(commentBlockSelectors).not("." + hideCss);
    var blurb = $("<div>").html("🙈🙉🙊").addClass(blurbClass);
    blurb.insertBefore(commentBlocks);
    commentBlocks.addClass(hideCss);
  };

  var showComments = function() {
    $("." + blurbClass).remove();
    $("." + hideCss).removeClass(hideCss);
  };

  var hideOrShow = function() {
    chrome.runtime.sendMessage({ 
      tabId: tabId,
      commentBlocks: $(commentBlockSelectors).length,
      hidingComments: hidingComments
    });

    if(hidingComments) {
      hideComments();
    } else {
      showComments();
    }    
  }

  chrome.runtime.onMessage.addListener(function(req, sender, callback) {
    hidingComments = req.hideComments;
    tabId = req.tabId;

    hideOrShow();

    // hide things inserted *after* the page loaded
    $('body').on('DOMNodeInserted', commentBlockSelectors, function(e) {
      hideOrShow();
    });

  });
}