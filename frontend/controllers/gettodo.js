(function(){
    var gettodoController = function($scope, $http, deleteService){
        var req = {
            method:'GET',
            url:'https://todo-list-sumit.herokuapp.com/todos'
            //url:'http://localhost:3000/todos'
        }
        $http(req).then(function(todos){
            $scope.results = todos.data;
        },function(){
            console.log('something is wrong in GET request...');
        });
        $scope.getBySearch = function(){
            try{
                if($scope.search == "true" || $scope.search == "false"){
                    var params = {
                        'taskstatus':$scope.search
                    }
                }else{
                    var params = {
                        'task':$scope.search,
                        'taskstatus':$scope.search
                    }
                }
                var req1 = {
                    method:'GET',
                    url:'https://todo-list-sumit.herokuapp.com/todos',
                    //url:'http://localhost:3000/todos',
                    params:params
                }
                $http(req1).then(function(todos){
                    $scope.results = todos.data;
                    $scope.search = "";
                },function(){
                    console.log('something is wrong in GET request with query params...');
                });
            }catch(e){
                console.log(e);
            }
        }
        $scope.delete = function(res){
            deleteService.deleteTodo(res);
            var req2 = {
                method:'GET',
                url:'https://todo-list-sumit.herokuapp.com/todos'
                //url:'http://localhost:3000/todos'
            }
            $http(req2).then(function(todos){
                $scope.results = todos.data;
            },function(){
                console.log('something is wrong in DELETE request in get page...');
            });
        }
    }
    
    gettodoController.$inject = ['$scope', '$http', 'deleteService'];
    
    angular.module('TodoApi').controller('gettodoController',gettodoController);
    
}());
