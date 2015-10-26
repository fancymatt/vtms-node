angular.module('vtms').directive('publishDatesList', function() {
  return {
    templateUrl: '/partials/publishDates/publish-dates-list',
    restrict: 'E',
    scope: {
      config: '='
    },

    controller: function($scope, $rootScope, vtmsPublishDate, vtmsIdentity, vtmsNotifier, vtmsList) {

      $scope.refresh = function() {
        $scope.list = $scope.config.update();
      };

      $scope.newDateValues = {
        fkLesson: null,
        fkPlatform: 1,
        date: moment(),
        isDelivered: 0
      }
      $scope.newDatePlatform = 1;

      var sortOptions = [
        {key: 'status', value: 'status', text: 'Sort by Status'},
        {key: 'date', value: 'date', display: 'Sort by Date'},
        {key: 'series', value: ['lesson.languageSery.series.title', 'lesson.number'], display: 'Sort by Series'},
        {key: 'number', value: 'lesson.number', display: 'Sort by Lesson Number'},
        {key: 'title', value: 'lesson.title', display: 'Sort by Lesson Title'},
        {key: 'platform', value: ['platform.name', 'date'], display: 'Sort by Platform'},
        {key: 'deliveredOnPlatform', value: ['platform.name', '-deliveredTime'], display: 'Sort by Platform'},
        {key: 'deliveredOn', value: '-deliveredTime', display: 'Delivered Time'}
      ];

      var initializeSortOptions = function(sortOptionsConfig) {
        $scope.sortOptions = [];

        // If sort option is set in config, add object to sortOptions array
        if(sortOptionsConfig) {
          sortOptions.forEach(function(sortOption) {
            if(sortOption.key in sortOptionsConfig) { $scope.sortOptions.push(sortOption); }
          });
        } else {
          // By default, use the top option in sortOptions array
          $scope.sortOptions.push(sortOptions[0]);
        }

        $scope.sortOrder = $scope.sortOptions[0].value;
      };

      var initialize = function() {
        $scope.refresh();
        initializeSortOptions($scope.config.sortOptions);
        $scope.identity = vtmsIdentity.currentUser;
      };

      initialize();

      $scope.deliver = function(publishDate) {
        publishDate.deliver().then(function(newData) {
          angular.extend(publishDate, newData);
          $rootScope.$broadcast('publishDate:delivered', publishDate);
        });
      };

      $scope.updatePublishDate = function(date, event) {
        for(var i = 0; i < event.target.classList.length; i++) {
          if(event.target.classList[i] === 'ng-dirty') {
            if(moment(date.date).isValid()) {
              date.update({date: moment(date.date).format('YYYY-MM-DD')}).then(function() {
                vtmsNotifier.success('Updated Publish Date to: ' + moment(date.date).format('ddd, MMMM Do YYYY'));
              });
            } else {
              vtmsNotifier.error('Please supply a valid date.');
            }
          }
        }
      };

      $scope.newDate = function() {
        $scope.newDateValues.fkLesson = $scope.config.lessonId;
        var newDate = new vtmsPublishDate($scope.newDateValues);
        newDate.$save().then(function(date) {
          $scope.refresh();
        });

        vtmsNotifier.notify('Added new date.');
      };

      $scope.delete = function(deletedPublishDate) {
        deletedPublishDate.delete().then(function() {
          vtmsList.removeFromList(deletedPublishDate, $scope.list);
        });
      };

      $rootScope.$on('publishDate:delivered', function(event, publishDate) {
        if($scope.config.type === 'readyToPublish') { vtmsList.removeFromList(publishDate, $scope.list); }
      });

    }

  };

});
