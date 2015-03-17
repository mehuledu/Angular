/* function to function
var work = function() {
  console.log("working");
}

var doWork = function(f) {
  console.log("Start");
  try { 
    f();    
  }
  catch(ex) {
    console.log(ex);
  }
  console.log("End");
}
 
doWork(work);*/


/* object to function*/
/* IIFE - Immediately invoked function expression also known as "iffy"
(function() {
  var createWorker = function() {

    var workCount = 0;

    var task1 = function() {
      workCount += 1;
      console.log("task1 " + workCount);
    }
    var task2 = function() {
      workCount += 1;
      console.log("task2 " + workCount);
    }

    return {
      job1: task1,
      job2: task2
    };
  }

  var worker = createWorker();
  worker.job1();
  worker.job2();
  worker.job1();
  worker.job2();
}());
*/

(function() {
  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http) {

    var onUserComplete = function(response) {
      $scope.user = response.data;

      $http.get($scope.user.repos_url)
        .then(onRepos, onError);
    };

    var onRepos = function(response) {
      $scope.repos = response.data;
    }

    var onError = function(reason) {
      $scope.error = "Could not fetch the data!";
    };

    $scope.search = function(username) {
      $http.get("https://api.github.com/users/" + username)
        .then(onUserComplete, onError);
    }

    $scope.message = "GitHub Viewer";
    //$scope.username = "angular";
    $scope.repoSortOrder = "-stargazers_count";
  };

  app.controller("MainController", ["$scope", "$http", MainController]);

}());