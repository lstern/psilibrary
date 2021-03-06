'use strict'; // http://stackoverflow.com/questions/1335851/what-does-use-strict-do-in-javascript-and-what-is-the-reasoning-behind-it
angular.module('psilibrary.controllers')
    .controller('categoryListCtl', ['$scope', 'categoryService', '$state', 'userService', function ($scope, categoryService, $state, userService) {
        $scope.init = function () {            
            $scope.section = 'category';
            if ($state.params.error){
                $scope.msg = {error: $state.params.error}
            }
            
            window.currentScope = $scope;
            $scope.requireAuthorization();

            var call = categoryService.List();
            call.then(function (data) {
                $scope.data = data;
            });
        };
        $scope.edit = function (v) {
            $state.go('categoryEdit', { id: v });
        };
        $scope.create = function () {
            $state.go('categoryCreate');
        };
        $scope.formatter = function (value, row, index) {
            return [
                '<button type="submit" class="btn btn-primary edit" onclick="currentScope.edit(' + value + ')">Editar</button>',
            ].join('');
        };
        $scope.init();
    }]);
