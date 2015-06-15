'use strict';
var App = angular.module('App', []);
App.controller('tassianatorCtrl', ['$scope', '$timeout', function($scope, $timeout){
    $scope.tassianate = function(normal){
		var sentence = "";
		for(var i = 0; i < normal.msg.length; i++)
		{
			var c = normal.msg.charAt(i).toLowerCase();
			var ic = normal.msg.charCodeAt(i);
			if((ic >= 33 && ic <= 47) || (ic >= 58 && ic <= 64))
			{
				//do smth with sentence
				arr = sentence.split(" ");

			}
			sentence += c;
		}
        normal.msg = sentence;
        $scope.waiting = true;
        $timeout(function(){
            $scope.waiting = false;
            normal.msg = "eita";
        }, Math.random()*2000+1000);
    }
}]);
