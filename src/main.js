(function () {

  let url = 'https://json-data.herokuapp.com/restaurant/news/1';

  //Fetch data and do something with it
  let promise = $.getJSON(url);
  promise.then( function (response) {
    doSomething(response);
  });

  // Templates
  let newst = function (obj) {
    let template = `
    <div>
      <p class='title'>${ obj.title }</p>
      <p class='date'>${ obj.date_published }</p>
    </div>
    <p class='post'>${ obj.post }</p>`;
    return template;

  };

  let doSomething = function(newsItem) {
    // console.log(arr);
    $('.news').append(newst(newsItem));
  };
}());
