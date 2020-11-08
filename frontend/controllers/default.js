(function(){
    var defaultController = function($scope){
        $scope.heading = 'TODO API';
    }
    
    defaultController.$inject = ['$scope'];
    
    angular.module('TodoApi').controller('defaultController',defaultController);
    
}());