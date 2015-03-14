if (window == top) {
  var selectors;

  var hideComments = function() {
    console.log("Anti-Social: Hiding comments...");
    $("<div>").html("🙈🙉🙊").addClass("antisocial-comments-disabled-blurb").insertBefore($(selectors));
    $(selectors).addClass("antisocial-comments-disabled-section");
  };

  var showComments = function() {
    console.log("Anti-Social: Showing comments...");
    $(".antisocial-comments-disabled-blurb").remove();
    $(selectors).removeClass("antisocial-comments-disabled-section");
  };

  chrome.extension.onRequest.addListener(function(req, sender, callback) {
    selectors = req.selectors;
    var found = $(req.selectors);
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