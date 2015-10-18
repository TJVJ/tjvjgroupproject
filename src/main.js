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
            <p>Todays Special</p>
            <p>${ entree.item }</p>
            <p>${ entree.description }</p>
            <p>${ entree.price }</p>`;
          doSomethings(template);
        };
      });

      _.filter(sides, function(item) {
        if (item.id === theSpecialId) {
          let template = `
            <p>Todays Special</p>
            <p>${ obj.item }</p>
            <p>${ obj.description }</p>
            <p>${ obj.price }</p>`;
          doSomethings(template);
        };
      });
      _.filter(appetizers, function(item) {
        if (item.id === theSpecialId) {
          let template = `
            <p>Todays Special</p>
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

//Section 3 Menu
var url3 = 'https://json-data.herokuapp.com/restaurant/menu/1';
var promise3 = $.getJSON(url3);
  promise3.then(function (obj) {
    doSomething3(obj);
  });

let menuA = function (obj) {
    let A = '';
    _.each(obj.appetizers, function(obj){
      A += `
        <div class='eachapp'>
          <p class='titleprice'>
            <span class='eachtitle'>${ obj.item + ' ....................................................................................................'}</span>
            <span class='eachprice'>${ obj.price }</span>
          </p>
          <div class='eachdescription'>${ obj.description }</div>
            <div class='icons'>
              <div class='allergy'></div>
              <div class='fav'></div>
              <div class='spicy'></div>
              <div class='veg'></div>
            </div>
          </div>
        </div>`;
    });
    return A;
  };

    let menuE = function (obj) {
    let E = '';
    _.each(obj.entrees, function(obj){
      E += `
        <div class='eachentree'>
         <p class='titleprice'>
            <span class='eachtitle'>${ obj.item + ' ....................................................................................................'}</span>
            <span class='eachprice'>${ obj.price }</span>
          </p>
          <div class='eachdescription'>${ obj.description }</div>
            <div class='icons'>
              <div class='allergy'></div>
              <div class='fav'></div>
              <div class='spicy'></div>
              <div class='veg'></div>
            </div>
          </div>
        </div>`;
    });
    return E;
  };

    let menuS = function (obj) {
    let S = '';
    _.each(obj.sides, function(obj){
      S += `
        <div class='eachside'>
          <p class='titleprice'>
            <span class='eachtitle'>${ obj.item + ' ....................................................................................................'}</span>
            <span class='eachprice'>${ obj.price }</span>
          </p>
          <div class='eachdescription'>${ obj.description }</div>
            <div class='icons'>
              <div class='allergy'></div>
              <div class='fav'></div>
              <div class='spicy'></div>
              <div class='veg'></div>
            </div>
          </div>
        </div>`;
    });
    return S;
  };

  let doSomething3 = function(objOfArrays) {
    $('.appstuff').append(menuA(objOfArrays));
    $('.entreestuff').append(menuE(objOfArrays));
    $('.sidestuff').append(menuS(objOfArrays));
  };
}());
