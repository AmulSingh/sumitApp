(function(){
    var deleteService = function($http){
        this.deleteTodo = function(res){
            try{
                var request = {
                    method:'DELETE',
                    url:'https://todo-list-sumit.herokuapp.com/todos/' + res._id,
                    //url:'http://localhost:3000/todos/' + res._id
                }
                $http(request).then(function(){
                    return console.log('delete request completed...')
                }, function(){
                    return console.log('error in delete request...')
                });
            }catch(e){
                return console.log(e.message)
            }
        }
    }
    
    deleteService.$inject = ['$http'];
    
    angular.module('TodoApi').service('deleteService',deleteService);
    
}());
