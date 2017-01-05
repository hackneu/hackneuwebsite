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


});
