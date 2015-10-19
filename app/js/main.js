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
    var template = '\n    <div>\n      <p class=\'title\'>' + obj.title + '</p>\n      <p class=\'date\'>' + obj.date_published + '</p>\n    </div>\n    <p class=\'post\'>' + obj.post + '</p>';
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
          var template = '\n            <p class=\'eitems\'>' + entree.item + '</p>\n            <p class=\'eprice\'>' + entree.price + '</p>\n            <p class=\'edesc\'>' + entree.description + '</p>';
          doSomethings(template);
        };
      });

      _.filter(sides, function (item) {
        if (item.id === theSpecialId) {
          var template = '\n            <p>' + obj.item + '</p>\n            <p>' + obj.description + '</p>\n            <p>' + obj.price + '</p>';
          doSomethings(template);
        };
      });
      _.filter(appetizers, function (item) {
        if (item.id === theSpecialId) {
          var template = '\n            <p>' + obj.item + '</p>\n            <p>' + obj.description + '</p>\n            <p>' + obj.price + '</p>';
          doSomethings(template);
        };
      });
    });
  });

  var doSomethings = function doSomethings(template) {
    console.log(template);
    $('.special').append(template);
  };

  $('ul.tabs').each(function () {
    var $active,
        $content,
        $links = $(this).find('a');

    $active = $($links.filter('[href="' + location.hash + '"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // Hiding other stuff
    $links.not($active).each(function () {
      $(this.hash).hide();
    });

    $(this).on('click', 'a', function (e) {
      // Make the old tab inactive.
      $active.removeClass('active');
      $content.hide();

      // Update the variables
      $active = $(this);
      $content = $(this.hash);

      // Make the tab active.
      $active.addClass('active');
      $content.show();

      e.preventDefault();
    });
  });

  var buildMenuList = function buildMenuList(categoryItems) {
    var buildItem = function buildItem(menuList, item) {
      menuList += '\n      <div class=\'eachapp\'>\n        <p class=\'titleprice\'>\n          <span class=\'eachtitle\'>' + (item.item + ' ....................................................................................................') + '</span>\n          <span class=\'eachprice\'>' + item.price + '</span>\n        </p>\n        <div class=\'eachdescription\'>' + item.description + '</div>\n          <div class=\'icons\'>\n            <div class=\'allergy\'></div>\n            <div class=\'fav\'></div>\n            <div class=\'spicy\'></div>\n            <div class=\'veg\'></div>\n          </div>\n        </div>\n      </div>\n      ';
      return menuList;
    };
    return _.reduce(categoryItems, buildItem, '');
  };

  var handleMenuData = function handleMenuData(menuData) {
    var appetizers = menuData.appetizers;
    var entrees = menuData.entrees;
    var sides = menuData.sides;

    var appetizersMenu = buildMenuList(appetizers);
    var entreesMenu = buildMenuList(entrees);
    var sidesMenu = buildMenuList(sides);
    $('.appstuff').append(appetizersMenu);
    $('.entreestuff').append(entreesMenu);
    $('.sidestuff').append(sidesMenu);
  };

  //Section 3 Menu
  var menuUrl = 'https://json-data.herokuapp.com/restaurant/menu/1';
  $.getJSON(menuUrl).then(handleMenuData);

  var f = new flickr({
    api_key: 'ddd216cce64def3f113c21f6425c283e',
    api_secret: 'bcf2098767c8d317',
    element: document.querySelector('.food-photos'),
    callback: function callback(e) {
      console.log('Flickr Object', e);
      console.log('Flickr Images', e.images);
      e.append();
      // If you don't want to append the images directly, you can use
      // e.images this hold an array with the img DOM for your easy use ;)
    }
  });

  f.photosSearch({
    tags: 'food,appetizers'
  });
})();