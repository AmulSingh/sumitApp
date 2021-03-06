(function(){
    var app = angular.module('TodoApi', ['ngRoute']);
    app.config(function($routeProvider){
        $routeProvider.when('/',{
            controller:'defaultController',
            templateUrl:'/template/default.html'
        })
        .when('/post',{
            controller:'posttodoController',
            templateUrl:'/template/post.html'
        })
        .when('/get',{
            controller:'gettodoController',
            templateUrl:'/template/get.html'
        })
        .when('/put',{
            controller:'updatetodoController',
            templateUrl:'/template/update.html'
        })
        .otherwise({redirectTo:'/'})
    });
}());