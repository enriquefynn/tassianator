'use strict';
var App = angular.module('App', []);
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}
function isControlChar(ic) { return ((ic >= 33 && ic <= 47) || (ic >= 58 && ic <= 64)); }
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
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
                if(isControlChar(ic))
                {
                    //do smth with sentence
					if(sentence.substring(0, 1) == ' ') sentence = sentence.substring(1);
                    var arr = sentence.split(" ");
					var idxarr = [];
					for(var j = arr.length - 1; j >= 0; j--)
						if(arr[j].length <= 2 && getRandomInt(0, 10) < 5)
							idxarr.push(j)
					for(var j = 0; j < idxarr.length; j++)
						arr.splice(idxarr[j], 1)
					if(arr.length > 1) arr = shuffle(arr);
					if(arr.length == 1 && arr[0] == '') sentence = c;
					else sentence = arr.join(" ") + c;
					if(w > 0 && sentence.length > 0 && !isControlChar(sentence.charCodeAt(0))) text += " ";
					text += sentence;
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
