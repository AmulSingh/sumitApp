(function(){
    var updatetodoController = function($scope, $routeParams, $http, deleteService){
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
        $scope.temp = function(){
            alert('working on it, be patient...');
        }
        $scope.update = function(){
            try{
                if($scope.plays === true && $scope.name.length > 0 && $scope.todo_id != 0){
                    var data2 = {
                        "task":$scope.name,
                        "taskstatus":true
                    }
                }else if($scope.plays === false && $scope.name.length > 0 && $scope.todo_id != 0){
                    var data2 = {
                        "task":$scope.name,
                        "taskstatus":false
                    }
                }else{
                    console.log('no values passed...');
                }
                var req1 = {
                    method:'PUT',
                    url:'https://todo-list-sumit.herokuapp.com/todos/' + $scope.todo_id,
                    //url:'http://localhost:3000/todos/' + $scope.todo_id,
                    data:data2
                }
                $http(req1).then(function(todos){
                    $scope.todo_id = null;
                    $scope.name = "";
                    $scope.plays = false;
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
                }, function(){
                    console.log('error in update request...')
                });
            }catch(e){
                console.log(e.message);
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
    
    updatetodoController.$inject = ['$scope', '$routeParams', '$http', 'deleteService'];
    
    angular.module('TodoApi').controller('updatetodoController',updatetodoController);
    
}());
