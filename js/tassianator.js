'use strict';
var App = angular.module('App', []);
function shuffle(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}
function isControlChar(ic) { return ((ic >= 33 && ic <= 47) || (ic >= 58 && ic <= 64)); }
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
function isVowel(c) { return (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'); }
function removeVowels(msg)
{
	var newstr = "";
	for(var i = 0; i < msg.length; i++)
		if(!isVowel(msg.charAt(i)) || getRandomInt(0, 10) >= 1) //10% de chance de remover vogal
			newstr += msg.charAt(i);
	return newstr;
}
function removeDoubles(msg)
{
	var last = msg.charAt(0);
	var newstr = "" + last;
	for(var i = 1; i < msg.length; i++)
	{
		var c = msg.charAt(i);
		if(c != last || getRandomInt(0, 10) >= 2) newstr += c; //20% de chance de remover letra dupla
		last = c;
	}
	return newstr;
}
function handleSentence(sentence, c, w)
{
	var newstr = "" + sentence;
	if(sentence.substring(0, 1) == ' ') newstr = sentence.substring(1);
	var arr = newstr.split(" ");
	var idxarr = [];
	for(var j = arr.length - 1; j >= 0; j--)
		if(arr[j].length <= 2 && getRandomInt(0, 10) < 5) //50% de chance de remover palavras de tamanho <= 2
			idxarr.push(j)
	for(var j = 0; j < idxarr.length; j++)
		arr.splice(idxarr[j], 1)
	if(arr.length > 1) arr = shuffle(arr);
	if(arr.length == 1 && arr[0] == '') newstr = c;
	else newstr = arr.join(" ") + c;
	if(w > 0 && newstr.length > 0 && !isControlChar(newstr.charCodeAt(0))) newstr = " " + newstr;
	return newstr;
}
App.controller('tassianatorCtrl', ['$scope', '$timeout', function($scope, $timeout){
    $scope.waiting = false;
    $scope.tassianate = function(normal){
        $scope.waiting = true;
        var audio = document.getElementById('horror');
        audio.play();
        $timeout(function(){
            $scope.waiting = false;
			
            var sentence = "";
			var text = "";
			var w = 0;
			normal.msg = removeVowels(normal.msg);
			normal.msg = removeDoubles(normal.msg);
			
            for(var i = 0; i < normal.msg.length; i++)
            {
                var c = normal.msg.charAt(i).toLowerCase();
                var ic = normal.msg.charCodeAt(i);
                if(isControlChar(ic))
                {
					text += handleSentence(sentence, c, w);
					sentence = "";
					w++;
					continue;
                }
                sentence += c;
            }
			text += handleSentence(sentence, '', w);
            normal.msg = text;
        }, Math.random()*2000+1000);
    }
}]);
