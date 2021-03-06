'use strict';

angular.module('configurationApp')
  .directive('coConfigurationHeader', function() {
    return {
      restrict: 'E',
      scope: {
        title: '=coTitle',

        self: '=coSelf',
        refresh: '=coRefresh',
        discard: '=coDiscard',
        save: '=coSave',
        delete: '=coDelete'
      },
      templateUrl: 'directives/configuration/header.html'
    };
  });
