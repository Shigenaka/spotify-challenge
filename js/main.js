var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {

    //gets artists from query search
    $http.get(baseUrl + $scope.track).success(function(response){
      var iD = response.artists.items[0].id;
      $scope.name = response.artists.items[0].name;
      console.log(iD);
      console.log(name);

      //uses artist's id to get their top tracks
      $http.get('https://api.spotify.com/v1/artists/' + iD + '/top-tracks?country=US').success(function(response) {
        data = $scope.tracks = response.tracks;
        console.log(data);
      })
      
    })
  }

  //plays the preview of song a user clicked on
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});