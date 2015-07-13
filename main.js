// Add the id tag of the doc as well as the Rawgit to the README.md as well.
var docs = {
  "#PearlAPI": "//cdn.rawgit.com/openpearl/PearlAPI/master/README.md",
  "#PearlClient": "//cdn.rawgit.com/openpearl/PearlClient/master/README.md",
  "#PearlEngine": "//cdn.rawgit.com/openpearl/PearlEngine/master/README.md"
}

// UNDER THE HOOD ********************

var requestREADME = function(doctag, rawgit) {
  $.ajax({
    url: rawgit,
    success: function(data) {
      var converter = new showdown.Converter();
      $(doctag).html(converter.makeHtml(data));
      // Makes links open in a new tab.
      $(doctag).find("a").attr('target', '_blank');
    },
    error: function(error) {
      console.log(error);
    }
  });
}

// Render all READMEs.
for (doctag in docs) {
  requestREADME(doctag, docs[doctag]);
}
