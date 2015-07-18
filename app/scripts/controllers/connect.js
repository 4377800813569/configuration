'use strict';

/**
 * @ngdoc function
 * @name configurationApp.controller:ConnectController
 * @description
 * # ConnectController
 * Controller of the configurationApp
 */
angular.module('configurationApp')
  .controller('ConnectController', function(Server, RavenTags, CSystem, PAPI, SConnection, $location, $rootScope, $scope) {
    $scope.state = '';
    $scope.selected = null;

    $scope.servers = [];

    PAPI.resources(true).then(function(data) {
      // Retrieve servers from response
      var servers = _.filter(data.MediaContainer.Device, function(device) {
        return device._provides === 'server';
      });

      $scope.servers = _.map(servers, function(server) {
        return Server.fromElement(server);
      });
    });

    $scope.select = function(server) {
      server.connect().then(function() {
        console.log('Connection successful');

        server.authenticate().then(function() {
          console.log('Authentication successful');

          // Update current server
          $rootScope.$s = server;

          // Update raven tags
          RavenTags.update({
            plugin_version: server.plugin_version
          });

          // Redirect to original view
          $scope.$r.redirect();
        }, function() {
          console.warn('Authentication failed');

          $scope.state = '';
        });
      }, function() {
        console.warn('Unable to find valid connection');

        $scope.state = '';
      });

      $scope.state = 'connecting';
      $scope.selected = server;
    };
  });
