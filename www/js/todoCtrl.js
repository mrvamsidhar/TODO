app.controller('ToDoController', function($scope, $localStorage, $cordovaDialogs,$ionicPopup){
    $scope.todoList = [];

    if (angular.isDefined($localStorage.taskList)) {
        $scope.todoList = $localStorage.taskList;
    }

    $scope.taskCount = function() {
        var items = _.filter($scope.todoList, { 'done': false });
        return 0||items.length;
    };

    $scope.addNewItem = function() {
        var inputTitle = "";
        $scope.data = {}
        if (angular.isDefined(navigator.notification)) {            
                var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.task">',
                title: 'Add Task',
                subTitle: 'Please enter your Task',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },    
                  {
                    text: '<b>Add</b>',
                    type: 'button-positive',
                    onTap: function(e) {                        
                        if (!$scope.data.task) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                        } else {
                            $scope.todoList.push({
                            title: $scope.data.task,
                            done: false
                            });  
                            $localStorage.taskList = $scope.todoList; 
                        return $scope.data.task;
                        }                         
                    }
                  }         
                ]
              });
            myPopup.then(function(res) {                      
                                           
            });
            
        } else {
            // Running on PC
            inputTitle = prompt("Please enter task").replace(/\s+/g, ' ').trim();
            if (inputTitle != "") {
                $scope.todoList.push({
                    title: inputTitle,
                    done: false
                });

                $localStorage.taskList = $scope.todoList;
            }
        }
    };

    $scope.checkDone = function(i) {
        $scope.todoList[i].done = true;
        $localStorage.taskList = $scope.todoList;
    };

    $scope.restoreTask = function(i) {
        // Check if Notification plugin is available (only available on mobile)
        if (angular.isDefined(navigator.notification)) {
            $cordovaDialogs.confirm('Do you wanna restore this task?', 'Task', 'Restore,Cancel')
            .then(function(result) {
              if (result == 1) {
                    $scope.todoList[i].done = false;
                }
            });
        } else {
            // Else, you're running on PC
            if (confirm("Do you wanna restore this task?")) {
                $scope.todoList[i].done = false;
            }
        }

        $localStorage.taskList = $scope.todoList;
    };

});