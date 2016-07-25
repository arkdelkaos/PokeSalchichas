'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, $log) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.$log = $log;

      this.user = {
        proveedor: 'pct',
        localization: 'Plaza del Sol 1, Madrid, 28013 Spain'
      };
      this.submitted = false;

      this.error = false;

      this.pokeLista = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }

    getPokemons(form) {
      this.$http.get('/pgo/'+this.user.user+'/'+this.user.password+'/'+this.user.proveedor+'/'+this.user.localization)
        .then(response => {
          this.$log.info(response);
          this.pokeLista = response.data;
        })
    }
  }

  angular.module('pgoPokeSalchichasApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
