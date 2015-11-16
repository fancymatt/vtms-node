angular.module('vtms').controller('vtmsLanguageSeriesDetailController', function($scope, vtmsLanguageSeries, vtmsLesson, $routeParams, vtmsNotifier) {

  $scope.sortOptions = [
    {value: "number", text: "Sort by Number"},
    {value: "trt", text: "Sort by Length"},
    {value: "title", text: "Sort by Title"}
  ];

  $scope.selectedSortOption = $scope.sortOptions[0].value;

  $scope.languageSeries = vtmsLanguageSeries.get({id: $routeParams.id});

  $scope.lessonsConfig = {
    title: 'Lessons',
    update: function() {
      return vtmsLesson.getList({id: $routeParams.id});
    },
    sortable: true,
    actions: {
      addtoRenderQueue: false,
      removeFromRenderQueue: false,
      markAsExported: false,
      delete: true
    },
    sortOptions: {
      number: true
    },
    columns: {
      actions: true,
      series: false,
      number: true,
      title: true,
      lastRender: false,
      lastAction: false,
      queuedTime: false,
      trt: true,
      dueDate: true,
      status: true
    }
  };

  $scope.update = function(newData) {

    angular.extend($scope.languageSeries, newData);

    $scope.languageSeries.update(newData).then(function() {
      var string = "Updated Language Series: ";
      for(var key in newData) {
        string += key + " changed to \"" + newData[key] + "\" ";
      }
      vtmsNotifier.notify(string);
    }, function(reason) {
      vtmsNotifier.error(reason);
    });
  };

});
