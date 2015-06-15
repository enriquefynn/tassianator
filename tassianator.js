'use strict';
var App = angular.module('App', []);
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}
App.controller('tassianatorCtrl', ['$scope', '$timeout', function($scope, $timeout){
    $scope.waiting = false;
    $scope.tassianate = function(normal){
        $scope.waiting = true;
        $timeout(function(){
            $scope.waiting = false;
			
            var sentence = "";
			var text = "";
			var w = 0;
            for(var i = 0; i < normal.msg.length; i++)
            {
                var c = normal.msg.charAt(i).toLowerCase();
                var ic = normal.msg.charCodeAt(i);
                if((ic >= 33 && ic <= 47) || (ic >= 58 && ic <= 64))
                {
                    //do smth with sentence
					if(sentence.substring(0, 1) == ' ') sentence = sentence.substring(1);
                    var arr = sentence.split(" ");
					arr = shuffle(arr);
					if(w > 0) text += " ";
					text += arr.join(" ") + c;
					sentence = "";
					w++;
					continue;
                }
                sentence += c;
            }
			var arr = sentence.split(" ");
			arr = shuffle(arr);
			text += arr.join(" ");
            normal.msg = text;
        }, Math.random()*2000+1000);
    }
}]);
