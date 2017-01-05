$('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
});


// Highlight top nav bar when user starts scrolling
$('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function(){
    $('.navbar-toggle:visible').click();
});

// Offset for Main Navigation
$('#mainNav').affix({
    offset: {
        top: 100
}});

var nuhacksmodule = angular.module('hacks', []);

nuhacksmodule.controller('hacksController',function ($http, $q, $scope) {
    $scope.teamdata = [];
    $scope.rules = [];
    var faqjson = $http.get('js/faq.json');
    var teamjson = $http.get('js/team.json');
    $q.all([faqjson,teamjson]).then(function(allpromises){
        $scope.rules = allpromises[0].data;
        $scope.teamdata = allpromises[1].data;
    });


});

$(window).load(function() {
    "use strict";
    $(".loader").delay(1000).fadeOut();
    $("#mask").delay(1000).fadeOut("slow");

    $(function() {
        var fr = new FilmRoll({
            container: '#film_roll',
            height: 210
        });
    });

    $(".item img").fadeIn(500);

    // clone image
    $('.item img').each(function(){
        var el = $(this);
        el.css({"position":"absolute"}).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({"position":"absolute","z-index":"998","opacity":"0"}).insertBefore(el).queue(function(){
            var el = $(this);
            el.parent().css({"width":this.width,"height":this.height});
            el.dequeue();
        });
        this.src = grayscale(this.src);
    });

    // Fade image
    $('.item img').mouseover(function(){
        $(this).parent().find('img:first').stop().animate({opacity:1}, 1000);
    })
    $('.img_grayscale').mouseout(function(){
        $(this).stop().animate({opacity:0}, 1000);
    });

});

// Grayscale w canvas method
function grayscale(src){
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = src;
    canvas.width = imgObj.width;
    canvas.height = imgObj.height;
    ctx.drawImage(imgObj, 0, 0);
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for(var y = 0; y < imgPixels.height; y++){
        for(var x = 0; x < imgPixels.width; x++){
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    return canvas.toDataURL();
}
