// By Eric
'use strict';


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    checkRepeat();
  });


//0 untouched, 1 one function ran, 2 the function choose not to run
var state = 0;

function checkRepeat() {
  state = 0
  var i;
  for (i = 1; i < 11; i++) {
    setTimeout(check(), i*200);
  }
  
}
var portion = 18;

function check() {
  return function () {
    var va = document.getElementsByTagName('video');
    if (va.length != 0 && va[0].videoHeight != 0 && (state == 0 || state == 3) && window.location.href.match('www.youtube.com/watch')) {

      state = 1;
      myObserver.observe(va[0]);
      var vidH = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("height")
      var vidW = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("width")

      var vidWNum = vidW.substring(0, vidW.length - 2);
      vidWNum = vidWNum / portion



      var vidHNum = vidH.substring(0, vidH.length - 2);
      vidHNum -= 60

      if (document.getElementById("forward") != null) {
        var overlay = document.getElementById("forward");
      } else {
        var overlay = document.createElement('BUTTON');
      }

      if (document.getElementById("backk") != null) {
        var overlayBack = document.getElementById("backk");
      } else {
        var overlayBack = document.createElement('BUTTON');
      }

      if (document.getElementById("skip") != null) {
        var overlaySkip = document.getElementById("skip");
      } else {
        var overlaySkip = document.createElement('BUTTON');
      }
      overlay.id = 'forward';
      overlay.style.border = 'none';
      overlay.style.display = 'block';
      overlay.style.padding = '0px';
      overlay.style.position = 'absolute';
      overlay.style.zIndex = '10';
      overlay.style.cursor = "pointer";
      var w = vidWNum * (portion-1);

      overlay.style.left = w + "px";
      overlay.style.top = "0px";
      overlay.style.opacity = "0.0";
      overlay.style.height = vidHNum + "px";
      overlay.style.width = vidWNum + "px";


      overlayBack.id = 'backk';
      overlayBack.style.border = 'none';
      overlayBack.style.display = 'block';
      overlayBack.style.padding = '0px';
      overlayBack.style.position = 'absolute';
      overlayBack.style.zIndex = '10';
      overlayBack.style.cursor = "pointer";
      overlayBack.style.left = "0px";
      overlayBack.style.top = "0px";
      overlayBack.style.opacity = "0.0";
      overlayBack.style.height = vidHNum + "px";
      overlayBack.style.width = vidWNum + "px";


      overlaySkip.id = 'skip';
      overlaySkip.style.border = 'none';
      overlaySkip.style.display = 'block';
      overlaySkip.style.padding = '0px';
      overlaySkip.style.position = 'absolute';
      overlaySkip.style.zIndex = '11';
      overlaySkip.style.cursor = "pointer";
      overlaySkip.style.left = w + "px";
      overlaySkip.style.top = "0px";
      overlaySkip.style.opacity = "0.0";
      overlaySkip.style.height = vidHNum / 2 + "px";
      overlaySkip.style.width = vidWNum + "px";

      var container = document.getElementById("movie_player")
      container.appendChild(overlay);
      container.appendChild(overlayBack);
      container.appendChild(overlaySkip);

      overlay.onclick = function () {
        var ta = document.getElementsByTagName('video');
        if(ta[0].paused){ta[0].play()}else{ta[0].currentTime = (ta[0].currentTime + 10)} ;

      };

      overlayBack.onclick = function () {
        var ta = document.getElementsByTagName('video');
        if(ta[0].paused){ta[0].play()}else{ta[0].currentTime = (ta[0].currentTime - 10)} ;

      };

      overlaySkip.onclick = function () {
        var ta = document.getElementsByTagName('video');
        if (ta[0].playbackRate !=11 && !ta[0].paused){
        for (var i = 0; i < ta.length; i++) { ta[i].playbackRate = 11 };
        setTimeout(normalSpeed(), 1400);
      }else{ta[0].play()}
      };
      function normalSpeed() {
        return function () {
          var ta = document.getElementsByTagName('video');

          for (var i = 0; i < ta.length; i++) { ta[i].playbackRate = 1 };
        }
      }

      function resize_overlay() {
       
        var vidH = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("height")
        var vidW = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("width")

        var vidWNum = vidW.substring(0, vidW.length - 2);
        vidWNum = vidWNum / portion;
        var w = vidWNum * (portion-1);

        overlay.style.left = w + "px";

        var vidHNum = vidH.substring(0, vidH.length - 2);
        vidHNum -= 60;


        overlay.style.top = "0px";
        overlay.style.height = vidHNum + "px";
        overlay.style.width = vidWNum + "px";

      };

      function resize_overlayBack() {
       
        var vidH = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("height")
        var vidW = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("width")

        var vidWNum = vidW.substring(0, vidW.length - 2);
        vidWNum = vidWNum / portion;


        overlayBack.style.left = "0px";

        var vidHNum = vidH.substring(0, vidH.length - 2);
        vidHNum -= 60;


        overlayBack.style.top = "0px";
        overlayBack.style.height = vidHNum + "px";
        overlayBack.style.width = vidWNum + "px";

      };


      function resize_overlaySkip() {
        
        var vidH = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("height")
        var vidW = window.getComputedStyle(document.getElementById("movie_player")).getPropertyValue("width")

        var vidWNum = vidW.substring(0, vidW.length - 2);
        vidWNum = vidWNum / portion;
        var w = vidWNum * (portion-1);

        overlaySkip.style.left = w + "px";

        var vidHNum = vidH.substring(0, vidH.length - 2);
        vidHNum -= 60;


        overlaySkip.style.top = "0px";
        overlaySkip.style.height = vidHNum / 2 + "px";
        overlaySkip.style.width = vidWNum + "px";

      };

      window.addEventListener('resize', resize_overlay, false);
      window.addEventListener('resize', resize_overlayBack, false);
      window.addEventListener('resize', resize_overlaySkip, false);

    } else if (state == 1) {

      //already ran
    } else {
      //didn't find video
      state = 3;
      //alert("else loop ran");
      if (document.getElementById("forward") != null) {
        var overlay = document.getElementById("forward");
        overlay.style.width = "0px";

      }
      if (document.getElementById("skip") != null) {
        var overlaySkip = document.getElementById("skip");
        overlaySkip.style.width = "0px";

      }


      if (document.getElementById("back") != null) {
        var overlayBack = document.getElementById("back");
        overlayBack.style.width = "0px";
      }

    }
  }
}



window.addEventListener('load', checkRepeat(), false);

const myObserver = new ResizeObserver(entries => {
  checkRepeat();
});



function reload() {
  chrome.tabs.executeScript(null,
    { code: "check()" });

}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('#reload');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', reload);
  }
});
