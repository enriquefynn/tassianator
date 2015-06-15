'use strict';
var App = angular.module('App', []);
App.controller('tassianatorCtrl', ['$scope', function($scope) {
    $scope.tassianate = function(normal){
        normal.msg = 'eita';
    }
}]);
