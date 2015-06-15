'use strict';
var App = angular.module('App', []);
App.controller('tassianatorCtrl', ['$scope', '$timeout', function($scope, $timeout){
    $scope.waiting = false;
    $scope.tassianate = function(normal){
        $scope.waiting = true;
        $timeout(function(){
            $scope.waiting = false;
            normal.msg = 'eita';
        }, Math.random()*2000+1000);
    }
}]);
