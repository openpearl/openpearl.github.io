var converter = new showdown.Converter();

$.get( "//cdn.rawgit.com/openpearl/PearlAPI/master/README.md", 
  function(data) {
    var text = data;
    var html = converter.makeHtml(text);
    console.log(html);
    $('#PearlAPI').html(html);
  });