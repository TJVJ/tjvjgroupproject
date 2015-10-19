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
            <p>${ obj.price}</p>`;
          doSomethings(template);
        };
      });

    });
  });

  let doSomethings = function(template) {
    console.log(template);
    $('.special').append(template);
  };

  $('ul.tabs').each(function(){
    var $active, $content, $links = $(this).find('a');

    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');

    $content = $($active[0].hash);

    // Hiding other stuff
    $links.not($active).each(function () {
      $(this.hash).hide();
    });


    $(this).on('click', 'a', function(e){
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

  let buildMenuList = (categoryItems) => {
    let buildItem = function (menuList, item) {
      menuList += `
      <div class='eachapp'>
        <p class='titleprice'>
          <span class='eachtitle'>${ item.item + ' ....................................................................................................'}</span>
          <span class='eachprice'>${ item.price }</span>
        </p>
        <div class='eachdescription'>${ item.description }</div>
          <div class='icons'>
            <div class='allergy'></div>
            <div class='fav'></div>
            <div class='spicy'></div>
            <div class='veg'></div>
          </div>
        </div>
      </div>
      `;
      return menuList;
    }
    return _.reduce(categoryItems, buildItem, '');
  };

  let handleMenuData = function(menuData) {
    let {
      appetizers,
      entrees,
      sides
    } = menuData;
    let appetizersMenu = buildMenuList( appetizers );
    let entreesMenu = buildMenuList( entrees );
    let sidesMenu = buildMenuList( sides );
    $('.appstuff').append( appetizersMenu );
    $('.entreestuff').append( entreesMenu );
    $('.sidestuff').append( sidesMenu );
  };

  //Section 3 Menu
  let menuUrl = 'https://json-data.herokuapp.com/restaurant/menu/1';
  $.getJSON(menuUrl).then(handleMenuData);

  var f = new flickr({
      api_key: 'ddd216cce64def3f113c21f6425c283e',
      api_secret: 'bcf2098767c8d317',
      element: document.querySelector('.food-photos'),
      callback: function(e){
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

}());
