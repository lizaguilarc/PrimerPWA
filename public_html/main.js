
////Service Worker
if ('serviceWorker' in navigator) {
    console.log('Se puede usar el service worker');
    window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registro satisfactorio con scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registro fallido: ', err);
    });
  });
}else{
    console.log('No se encuentra el servicio para service worker');
}

//Scroll suavizado
$(document).ready(function(){
    //alert($("#services").offset().top);    
    $("#menu a").click(function(e){
       e.preventDefault();
       $("html,body").animate({
           scrollTop:$($(this).attr("href")).offset().top
       });
       return false;
    });
});