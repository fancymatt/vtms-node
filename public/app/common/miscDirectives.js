angular.module('vtms')
.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
})
.filter('videoTime', function() {
  return function(input) {
    input = Math.floor(input);

    //Less than an hour
    if (input < 3600) {
      var minutes = Math.floor(input / 60);
      var seconds = input - (minutes * 60);
      return minutes + ":" + ("0" + seconds).slice(-2);
    }
    //one hour or more
    else {
      var hours = Math.floor(input / 3600);
      var minutes = Math.floor((input - (hours * 3600)) / 60);
      var seconds = input - (hours * 3600) - (minutes * 60);
      return hours + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
    }
  };
})
.directive('moDateInput', function ($window) {
    return {
        require:'^ngModel',
        restrict:'A',
        link:function (scope, elm, attrs, ctrl) {
            var moment = $window.moment;
            var dateFormat = attrs.moMediumDate;
            attrs.$observe('moDateInput', function (newValue) {
                if (dateFormat == newValue || !ctrl.$modelValue) return;
                dateFormat = newValue;
                ctrl.$modelValue = new Date(ctrl.$setViewValue);
            });

            ctrl.$formatters.unshift(function (modelValue) {
                if (!dateFormat || !modelValue) return "";
                var retVal = moment(modelValue).format(dateFormat);
                return retVal;
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var date = moment(viewValue, dateFormat);
                return (date && date.isValid() && date.year() > 1950 ) ? date.toDate() : "";
            });
        }
    };
})
.factory('vtmsList', function() {

  var findIdOnList = function(id, list) {
    for(var i = 0; i < list.length; i++) {
      if(id === list[i].id) {
        return i;
      }
    }
    return -1;
  };

  return {

    removeFromList: function(item, list) {
      var indexToDelete = findIdOnList(item.id, list);
      if(indexToDelete > -1) {
        list.splice(indexToDelete, 1);
        return true;
      } else {
        return false;
      }
    },

    addToList: function(item, list) {
      if(findIdOnList(item.id, list) > -1) {
        return false;
      } else {
        list.push(item);
        return true;
      }
    }
  };
});
