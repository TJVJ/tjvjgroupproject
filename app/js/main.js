'use strict';

(function () {
  //Section 1:  Restaurant news
  var url = 'https://json-data.herokuapp.com/restaurant/news/1';

  //Fetch data and do something with it
  var promise = $.getJSON(url);
  promise.then(function (response) {
    doSomething(response);
  });

  // Templates
  var newst = function newst(obj) {
    var template = '\n    <p>Latest News</p>\n    <div>\n      <p class=\'title\'>' + obj.title + '</p>\n      <p class=\'date\'>' + obj.date_published + '</p>\n    </div>\n    <p>' + obj.post + '</p>';
    return template;
  };

  var doSomething = function doSomething(newsItem) {
    $('.news').append(newst(newsItem));
  };

  //Section 2 specials

  var url2 = 'https://json-data.herokuapp.com/restaurant/menu/1';
  var urls = 'https://json-data.herokuapp.com/restaurant/special/1';
  //Get the Special
  var promises = $.getJSON(urls);
  //Get the Menu
  var promise2 = $.getJSON(url2);

  promises.then(function (obj) {

    var theSpecialId = obj.menu_item_id;

    promise2.then(function (obj) {
      var entrees = obj.entrees;
      var sides = obj.sides;
      var appetizers = obj.appetizers;

      _.filter(entrees, function (entree) {
        if (entree.id === theSpecialId) {
          var template = '\n            <p>Todays Special</p>\n            <p>' + entree.item + '</p>\n            <p>' + entree.description + '</p>\n            <p>' + entree.price + '</p>';
          doSomethings(template);
        };
      });

      _.filter(sides, function (item) {
        if (item.id === theSpecialId) {
          var template = '\n            <p>Todays Special</p>\n            <p>' + obj.item + '</p>\n            <p>' + obj.description + '</p>\n            <p>' + obj.price + '</p>';
          doSomethings(template);
        };
      });
      _.filter(appetizers, function (item) {
        if (item.id === theSpecialId) {
          var template = '\n            <p>Todays Special</p>\n            <p>' + obj.item + '</p>\n            <p>' + obj.description + '</p>\n            <p>' + obj.price + '</p>';
          doSomethings(template);
        };
      });
    });
  });

  var doSomethings = function doSomethings(template) {
    console.log(template);
    $('.special').append(template);
  };
})();