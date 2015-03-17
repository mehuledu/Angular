(function() {
  var app = angular.module("githubViewer", []);

  var MainController = function($scope, github, $interval, $log) {

    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onRepos = function(data) {
      $scope.repos = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data!";
    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;
      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var countdownInterval = null;
    var startCountdown = function() {
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      //alert(username);
      $log.info("Searching for " + username);
      github.getUser(username).then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

    $scope.username = "angular";
    $scope.message = "GitHub Viewer";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 5;

    startCountdown();

  };

  app.controller("MainController", ["$scope", "github", "$interval", "$log", MainController]);
}());