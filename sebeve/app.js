$(document).ready(function () {
  console.log("Welcome to SebEve!");

  App = {
    loggedIn: !!window.location.hash,
    currentDisplayedPhotoTimestamp: 0,
    lastDownloadTimestamp: 0,
    currentPhotoIndex: 0
  };

  if (!App.loggedIn) {
    window.location.replace(
      "https://instagram.com/oauth/authorize/?client_id=0fbae02a7bc04f3b8020a40caa6dd461&redirect_uri=http://www.martinjosefsson.com/sebeve/&response_type=token"
    );
  } else {
    App.accessToken = window.location.hash.match(/\d.*/)[0];
  }
  var query = "https://api.instagram.com/v1/tags/dannike/media/recent?access_token=" + App.accessToken;

  function main () {
    downloadAllImages().then(function (res) {
      console.log(res.data);
      App.photos = res.data;

      displayPhoto(res.data[0]);

      setInterval(function () {
        if (App.isThereNewPhoto) {
          downloadAllImages().then(function (res) {
            console.log("yo");
            App.currentPhotoIndex = 0;
            displayPhoto(res.data[0]);
          });
        } else {
          if (App.currentPhotoIndex <= 20) {
            App.currentPhotoIndex++;
            displayPhoto(App.photos[App.currentPhotoIndex]);
            console.log("App", App);
          } else {
            console.log("currentPhotoIndex reset");
            App.currentPhotoIndex = -1;
          }
        }
      }, 5000);

      setInterval(function () {
        checkForNewPhotos();
        setAppHeightToDeviceHeight();
      }, 5000);
    });
  }
  main();

  var setAppHeightToDeviceHeight = function setAppHeightToDeviceHeight () {
    $("img").css({
      height: window.innerHeight,
      width: "auto"
    });
  };

  var checkForNewPhotos = function checkForNewPhotos () {
    downloadAllImages().then(function (res) {
      var lastPhotoTimestamp = App.photos[0].created_time;
      App.isThereNewPhoto = (res.data[0].created_time > lastPhotoTimestamp);
      console.log(res.data[0].created_time, lastPhotoTimestamp);
      console.log("new photo? ", App.isThereNewPhoto);
    });
  };

  function downloadAllImages () {
    return $.ajax({
      url: query,
      jsonp: "callback",
      dataType: "jsonp",
    });
  }

  var displayPhoto = function displayPhoto (photoObj) {
    setAppHeightToDeviceHeight();
    var img = document.createElement("img");
    img.src = photoObj.images.standard_resolution.url;
    img.className = "instapic";
    $('img').fadeOut({
      done: function () {
        $(".content").hide().html(img).fadeIn();
        setAppHeightToDeviceHeight();
      }
    });
  };
});
