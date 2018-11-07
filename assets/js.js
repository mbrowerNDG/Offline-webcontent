window.addEventListener('load', function () {
  var condition = navigator.onLine ? "Go Offline To See This Pages Content." : "What Wizardry is This??";
  var subcondition = navigator.onLine ? "Come On it'll Be Neat" : "Cool.";
  var showImage = navigator.onLine ? 'none' : 'block';
  document.querySelector('.connection').innerHTML = condition;
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
    console.log( 'network event!', condition);

  }
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

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
//ie app cache
var sCacheStatus = "Not supported";
if (window.applicationCache)
{
   var oAppCache = window.applicationCache;
   switch ( oAppCache.status )
   {
      case oAppCache.UNCACHED :
         sCacheStatus = "Not cached";
         break;
      case oAppCache.IDLE :
         sCacheStatus = "Idle";
         break;
      case oAppCache.CHECKING :
         sCacheStatus = "Checking";
         break;
      case oAppCache.DOWNLOADING :
         sCacheStatus = "Downloading";
         break;
      case oAppCache.UPDATEREADY :
         sCacheStatus = "Update ready";
         break;
      case oAppCache.OBSOLETE :
         sCacheStatus = "Obsolete";
         break;
      default :
        sCacheStatus = "Unexpected Status ( " +
                       oAppCache.status.toString() + ")";
        break;
   }
}

