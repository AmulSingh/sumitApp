(function(){
    var posttodoController = function($scope, $http, deleteService){
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
        $scope.post = function(){
            try{
                if($scope.name.length > 0){
                    if($scope.plays === true){
                        $scope.plays = true;
                    }else{
                        $scope.plays = false;
                    }
                    var req = {
                        method:'POST',
                        url:'https://todo-list-sumit.herokuapp.com/todos',
                        //url:'http://localhost:3000/todos',
                        data:{
                            "task":$scope.name,
                            "taskstatus":$scope.plays
                        }
                    }
                    return $http(req).then(function(){
                        $scope.name = "";
                        $scope.plays = false;
                        console.log('post request completed...');
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
                    },function(){
                        console.log('something is wrong in POST request...');
                    });
                }else{
                    alert('Name cannot be empty!');
                }
            }catch(e){
                console.log(e.message);
                alert('Name cannot be empty!');
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
    
    posttodoController.$inject = ['$scope', '$http', 'deleteService'];
    
    angular.module('TodoApi').controller('posttodoController',posttodoController);
    
}());
