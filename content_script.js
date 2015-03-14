var commentBlockSelectors = "#fbComments, #disqus_thread, #comments, .comments-iframe-container";

if (window == top) {

  var hideComments = function() {
    console.log("Anti-Social: Hiding comments...");
    $("<div>").html("🙈🙉🙊").addClass("antisocial-comments-disabled-blurb").insertBefore($(commentBlockSelectors));
    $(commentBlockSelectors).addClass("antisocial-comments-disabled-section");
  };

  var showComments = function() {
    console.log("Anti-Social: Showing comments...");
    $(".antisocial-comments-disabled-blurb").remove();
    $(commentBlockSelectors).removeClass("antisocial-comments-disabled-section");
  };

  chrome.extension.onRequest.addListener(function(req, sender, callback) {
    var found = $(commentBlockSelectors);
    callback({ 
      commentBlocks: found.length, 
      hidingComments: req.hideComments
    });

    if(req.hideComments) {
      hideComments();
    } else {
      showComments();
    }
  });
}