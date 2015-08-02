$(document).ready(function () {
  console.log("Welcome to SebEve!");

  App = {
    loggedIn: !!window.location.hash
  };

  if (!App.loggedIn) {
    window.location.replace(
      "https://instagram.com/oauth/authorize/?client_id=0fbae02a7bc04f3b8020a40caa6dd461&redirect_uri=http://www.martinjosefsson.com/sebeve/&response_type=token"
    );
  } else {
    App.accessToken = window.location.hash.match(/\d.*/)[0];
  }

  var query = "https://api.instagram.com/v1/tags/sweden/media/recent?access_token=" + App.accessToken;

  var getAndDisplayImages = function getAndDisplayImages () {
    $.ajax({
      url: query,
      jsonp: "callback",
      dataType: "jsonp",

      success: function (res) {
        App.data = res.data;
        console.log("New data: ", res.data);

        constructImages(res.data).forEach(function (image) {
          document.body.appendChild(image);
        });

      }
    });
  };
  getAndDisplayImages();

  var constructImages = function constructImages (imageColl) {
    return imageColl.map(function (item) {
      console.log(item);
      var pictureFrame = document.createElement("div");
      pictureFrame.className = "pictureFrame";

      var img = document.createElement("img");
      img.src = item.images.standard_resolution.url;
      img.className = "instapic";

      var picLink = document.createElement("a");
      picLink.href = item.link;
      picLink.appendChild(img);

      var subtext = document.createElement("div");
      subtext.className = "subtext";

      var userPic = document.createElement("img");
      userPic.src = item.user.profile_picture;
      userPic.className = "profilePicture";

      subtext.appendChild(userPic);

      var caption = document.createElement("span");
      caption.className = "caption";
      caption.textContent = item.caption.text;
      subtext.appendChild(caption);

      var realName = document.createElement("span");
      realName.textContent = item.user.real_name;
      realName.className = "real_name";
      subtext.appendChild(realName);

      pictureFrame.appendChild(picLink);
      pictureFrame.appendChild(subtext);
      return pictureFrame;
    });
  };



});
