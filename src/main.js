(function () {
//Section 1:  Restaurant news
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
    $('.news').append(newst(newsItem));
  };


  //Section 2 specials

  let url2 = 'https://json-data.herokuapp.com/restaurant/menu/1';
  let urls = 'https://json-data.herokuapp.com/restaurant/special/1';
  //Get the Special
  let promises = $.getJSON(urls);
  //Get the Menu
  let promise2 = $.getJSON(url2);

  promises.then( function (obj) {

    var theSpecialId = obj.menu_item_id;

    promise2.then( function (obj) {
      var entrees = obj.entrees;
      var sides = obj.sides;
      var appetizers = obj.appetizers;




      _.filter(entrees, function(entree) {
        if (entree.id === theSpecialId) {
          let template = `
            <p class='eitems'>${ entree.item }</p>
            <p class='eprice'>${ entree.price }</p>
            <p class='edesc'>${ entree.description }</p>`;
          doSomethings(template);
        };
      });






      _.filter(sides, function(item) {
        if (item.id === theSpecialId) {
          let template = `
            <p>${ obj.item }</p>
            <p>${ obj.description }</p>
            <p>${ obj.price }</p>`;
          doSomethings(template);
        };
      });
      _.filter(appetizers, function(item) {
        if (item.id === theSpecialId) {
          let template = `
            <p>${ obj.item }</p>
            <p>${ obj.description }</p>
            <p>${ obj.price }</p>`;
          doSomethings(template);
        };
      });

    });
  });


  let doSomethings = function(template) {
    console.log(template);
    $('.special').append(template);
  };

}());
