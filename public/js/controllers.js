'use strict';

/* Controllers */
// require('/app.js');

// myApp
angular.module('myApp.controllers', [])
//users controller
  .controller('UsersCtrl', function($scope, TopicsFactory, $routeParams){
  	TopicsFactory.getUser($routeParams.id, function(data){
  		$scope.getuser = data;
  		$scope.getuser.postcount = $scope.getuser.length
  		// console.log($scope.getuser);
  	})
  	//data
  	
  	TopicsFactory.getUserComments($routeParams.id, function(data2){

  		$scope.getusercomments = data2;
  		$scope.getusercomments.commentcount = 0;
  		for(var i=0;i<data2.length;i++){
  			$scope.getusercomments.commentcount += data2[i].comments.length;
  		}
  		// console.log(data2);
  	})
 })
 // topics controller
  .controller('TopicCtrl', function($scope, TopicsFactory, $routeParams){

  	TopicsFactory.getComments(function(data){
  		$scope.comments = data;
  	})
	TopicsFactory.findTopic($routeParams.id, function(data){
	$scope.topic = data;
	// console.log(data);
	})
	$scope.addComment = function() {
		$scope.new_comment.topic_id = $scope.topic._id;
		TopicsFactory.addComment($scope.new_comment, function(data){
			TopicsFactory.findTopic($routeParams.id, function(topic){
				$scope.comments = data;
				$scope.topic = topic;
				// console.log(comments);
				
			});
				$scope.new_comments = {};
				$scope.new_topic = {};
		})
	}
	$scope.upvote = function(comment){
	
		TopicsFactory.upvote(comment, function(data){
		// console.log($routeParams.id);
			TopicsFactory.findTopic(comment, function(topic){
				$scope.comments = data;
				$scope.topic = topic;
			})
		});
	}
})

  .controller('HomeCtrl', function($scope, TopicsFactory){
  
	TopicsFactory.getTopics(function(data){
		$scope.topics = data;
	})
	$scope.addTopic = function() {
		// console.log($scope.new_topic);
		TopicsFactory.addTopic($scope.new_topic, function(data){
			TopicsFactory.getTopics(function(data){
				$scope.topics = data;
			});
		})
	}

	//new removetopic
})
//FACTORY
	.factory('TopicsFactory', function($http){
		var factory = {};
		var topics = [];
		var comments = [];
		factory.getTopics = function(callback) {
			$http.get('/topics').success(function(output){
				topics = output;
				callback(topics);
			})
		}
		factory.getComments = function(callback) {
			$http.get('/comments').success(function(output){
				comments = output;
				callback(comments);
			})
		}
		factory.getUser = function(id, callback) {
			$http.get('/user/'+id).success(function(getuser){
				callback(getuser);
			})
		}
		factory.getUserComments = function(id, callback){
			$http.get('/usercomments/'+id).success(function(getusercomments){
				callback(getusercomments);
			})
		}
		factory.findTopic = function(id, callback) {
			$http.get('/topic/'+id).success(function(topic){
				callback(topic);
				// console.log(topic);
			})
		}
		factory.addTopic = function(info, callback) {
			$http.post('/addtopic', info).success(function(data){
				callback(data);
			});
		}
		factory.addComment = function(info, callback) {
			// console.log(info);
			$http.post('/addcomment', info).success(function(data){
				callback(data);
			});
		}
		factory.upvote = function(comment, callback) {
			$http.post('/upvote', comment).success(function(data){
				callback(data);
			});
		}
		//factory functions
		return factory;
	})


  .controller('ArticlesCtrl', ['$scope', '$http', function($scope, $http) {
  	$scope.loading = true;
  	$scope.error = null;

		// Call the back-end API which will be authenticated using our session token
		$http({method: 'GET', url: '/articles'}).
			success(function(data, status, headers, config) {
				//The API call to the back-end was successful (i.e. a valid session)
				$scope.articles = data;
				$scope.loading = false;

			}).
			error(function(data, status, headers, config) {
				$scope.error = {
					message: "The API call to the back-end was not successful. Make sure that your back-end verifies the token.",
					link: "https://app.userapp.io/#/docs/libs/angularjs/#back-end"
				};
				$scope.loading = false;
			});
  }]);
