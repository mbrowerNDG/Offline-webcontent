
var os ="";
function getOS() {
  var userAgent = window.navigator.userAgent,
    platform = window.navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
  console.log(os)
}

window.addEventListener('load', function () {
 getOs();
 console.log(os);


  if (os == 'Windows') {
    (function () {

      function triggerEvent(type) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent(type, true, true);
        event.eventName = type;
        (document.body || window).dispatchEvent(event);
      }

      function testConnection() {
        // make sync-ajax request
        var xhr = new XMLHttpRequest();
        // phone home
        xhr.open('HEAD', 'http://www.ndgcommunications.com/', false); // async=false
        try {
          xhr.send();
          onLine = true;
        } catch (e) {
          // throws NETWORK_ERR when disconnected
          onLine = false;
        }

        return onLine;
      }

      var onLine = true,
        lastOnLineStatus = true;

      // note: this doesn't allow us to define a getter in Safari
      navigator.__defineGetter__("onLine", testConnection);
      testConnection();

      if (onLine === false) {
        lastOnLineStatus = false;
        // trigger offline event
        triggerEvent('offline');
      }

      setInterval(function () {
        testConnection();
        if (onLine !== lastOnLineStatus) {
          triggerEvent(onLine ? 'online' : 'offline');
          lastOnLineStatus = onLine;
        }
      }, 5000); // 5 seconds, made up - can't find docs to suggest interval time
    })();
    //ie app cache
    var sCacheStatus = "Not supported";
    if (window.applicationCache) {
      var oAppCache = window.applicationCache;
      switch (oAppCache.status) {
        case oAppCache.UNCACHED:
          sCacheStatus = "Not cached";
          break;
        case oAppCache.IDLE:
          sCacheStatus = "Idle";
          break;
        case oAppCache.CHECKING:
          sCacheStatus = "Checking";
          break;
        case oAppCache.DOWNLOADING:
          sCacheStatus = "Downloading";
          break;
        case oAppCache.UPDATEREADY:
          sCacheStatus = "Update ready";
          break;
        case oAppCache.OBSOLETE:
          sCacheStatus = "Obsolete";
          break;
        default:
          sCacheStatus = "Unexpected Status ( " +
            oAppCache.status.toString() + ")";
          break;
      }
    }

    function testConnection() {
      // make sync-ajax request
      var xhr = new XMLHttpRequest();
      // phone home
      xhr.open('HEAD', 'http://www.ndgcommunications.com/', false); // async=false
      try {
        xhr.send();
        onLine = true;
      } catch (e) {
        // throws NETWORK_ERR when disconnected
        onLine = false;
      }

      return onLine;
    }
    window.addEventListener('load', function () {
      var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
      var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
      var showImage = navigator.onLine ? 'none' : 'block';
      document.querySelector('.connection').innerHTML = condition;
      document.querySelector('.subcondition').innerHTML = subcondition;
      document.getElementById('showImage').style.display = showImage;
      document.getElementById('showVideo').style.display = showImage;

      function updateOnlineStatus(event) {

        var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
        var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
        var showImage = navigator.onLine ? 'none' : 'block';
        document.getElementById('showImage').style.display = showImage;
        document.getElementById('showVideo').style.display = showImage;
        document.querySelector('.connection').innerHTML = condition;
        document.querySelector('.subcondition').innerHTML = subcondition;
        console.log('network event!', condition);

      }
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });


  } else {
    var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
    var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
    var showImage = navigator.onLine ? 'none' : 'block';
    document.querySelector('.connection').innerHTML = condition;
    document.querySelector('.subcondition').innerHTML = subcondition;
    document.getElementById('showImage').style.display = showImage;
    document.getElementById('showVideo').style.display = showImage;

    function updateOnlineStatus(event) {

      var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
      var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
      var showImage = navigator.onLine ? 'none' : 'block';
      document.getElementById('showImage').style.display = showImage;
      document.getElementById('showVideo').style.display = showImage;
      document.querySelector('.connection').innerHTML = condition;
      document.querySelector('.subcondition').innerHTML = subcondition;
      console.log('network event!', condition);

    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

});


