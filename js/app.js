console.log('app.js loaded');

$(function() {
//function to run if Gilded is cicked
  function getGildedData(){
      console.log('link works');

      var url ="https://www.reddit.com/gilded/.json";
        $.get(url, function(response){

          $('#results').empty();

          var newLinks = response.data;
          var newArray = newLinks.children;
          for (var i=0, x=newArray.length; i<x; i++){
            var newObjects = newArray[i].data;

            var titleName = newObjects.link_title;
            var commentText = newObjects.body;
            var linkToPost = newObjects.link_url;

            var elements = [
                  '<div class="row">' ,
                  '<div class="col-md-8">' ,
                      '<h5>' ,
                      '<a href ="' , linkToPost , '">',
                      titleName , '</a>','</h5>' ,
                      '<p>', commentText, '</p>',
                    '</div>' ,
                  '</div>' ,
                ].join('');

                $('#results').append(elements);
          }
        })
  }
  //function to run if everything else is clicked
  function getData (linkName){
    console.log('linkName: ', linkName)
    var url = [
      'https://www.reddit.com/',
      linkName ? linkName + '/.json' : '.json'
      ].join('');

      $.get(url, function(response){

        $('#results').empty();

        var newLinks = response.data;
        var newArray = newLinks.children;

        for (var i=0, x=newArray.length; i<x; i++){
          var newObjects = newArray[i].data;
          var titleName = newObjects.title;
          var newImage = newObjects.thumbnail;
          var emptyImage = newImage.indexOf('http') === -1;
          var linkToPost = newObjects.url;
          var score = newObjects.score;
          var subreddit = newObjects.subreddit;
          var linkToSubreddit = 'http://www.reddit.com/r/'+ subreddit;
            console.log(subreddit);

          var elements = [
                '<div class="list-container" id="list-row">' ,
                '<div class="list-score">' ,
                  '<h2>' ,
                    score,
                  '</h2>' ,
                '</div>' ,
                  '<div class="list-image">' ,
                    '<img src="' , emptyImage ? 'img/reddit.png' : newImage ,'" width="150" margin-right: "10" alt="thumbnail of post" />' ,
                  '</div>' ,
                  '<div class="list-content">' ,
                    '<h3>' ,
                    '<a href ="' , linkToPost , '">',
                    titleName , '</a>','</h3>' ,
                    '<h5>found on ' ,
                    '<a href ="' , linkToSubreddit , '">',
                    'r/', subreddit , '</a>','</h5>' ,
                  '</div>' ,
                '</div>' ,
              ].join('');

              $('#results').append(elements);
        }
      })
  }
  // writing click handler
  $('#menu li a').on('click', function(e){
    console.log('link works');
    var word = $(this).text();
    switch(word){
      case 'gilded' :
          getGildedData();
        break;
        default:
          getData(word);
        break;
    }
})
// calling the home page to load
getData();

});
