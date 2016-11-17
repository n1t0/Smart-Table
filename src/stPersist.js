ng.module('smart-table')
  .directive('stPersist', ['$parse', function ($parse) {
  return {
    require: '^stTable',
    link: function (scope, element, attr, ctrl) {
      var nameSpace = attr.stPersist;
      
      var default_key = attr.stPersistDefault;
      var default_state = $parse(default_key)(scope);

      //fetch the table state when the directive is loaded
      var tableState = ctrl.tableState();
      if (localStorage.getItem(nameSpace)) {
        var savedState = JSON.parse(localStorage.getItem(nameSpace));
        angular.extend(tableState, savedState);
        ctrl.pipe();
      } else if (default_state) {
        angular.extend(tableState, default_state);
        ctrl.pipe();
      }

      //save the table state every time it changes
      scope.$watch(function () {
        return ctrl.tableState();
      }, function (newValue, oldValue) {
        if (newValue !== oldValue) {
          localStorage.setItem(nameSpace, JSON.stringify(newValue));
        }
      }, true);
    }
  };
}]);