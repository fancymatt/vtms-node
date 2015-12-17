angular.module('vtms').factory('vtmsPublishDate', function($resource, $q, vtmsNotifier) {
  var PublishDateResource = $resource('/api/publish-dates/:id', {id: "@id"}, {
    update: {method:'PUT', isArray:false},
    getIncomplete: {method: 'GET', isArray:true, url:'/api/publish-dates/incomplete'},
    getListForLesson: {method: 'GET', isArray: true, url:'/api/lessons/:id/publish-dates'},
    getUpcoming: {method: 'GET', isArray: true, url: '/api/publish-dates/upcoming'},
    getDelivered: {method: 'GET', isArray: true, url: '/api/publish-dates/delivered'},
    getReadyToDeliverPublishDates: {method: 'GET', isArray: true, url: '/api/publish-dates/ready'},
    getUpcomingPublishDatesForChannel: {method: 'GET', isArray: true, url: '/api/channels/:id/publish-dates'}
  });

  PublishDateResource.prototype.deliver = function() {
    var dfd = $q.defer();

    var lessonString = this.lesson.languageSery.title + " #" + this.lesson.number;
    var notification = "Delivered " + lessonString + " for " + this.platform.name + ".";

    this.update({
      isDelivered: true,
      deliveredTime: moment(Date.now()).utc().format('YYYY-MM-DD HH:mm:ss')
    }).then(function(newData) {
      vtmsNotifier.notify(notification);
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject(response.data.reason);
    });

    return dfd.promise;
  };

  PublishDateResource.prototype.update = function(newData) {
    var dfd = $q.defer();

    this.$update(newData).then(function() {
      dfd.resolve(newData);
    }, function(response) {
      dfd.reject("You don't have permission to edit.");
    });

    return dfd.promise;
  };

  PublishDateResource.prototype.delete = function() {
    var dfd = $q.defer();

    var lessonString = this.lesson.languageSery.title + " #" + this.lesson.number;
    var notification = "Removed a publish date from " + lessonString + ".";

    this.$delete().then(function() {
      vtmsNotifier.notify(notification);
      dfd.resolve();
    }, function(response) {
      dfd.reject("You don't have permission to delete.");
    });

    return dfd.promise;
  };

  return PublishDateResource;
});
