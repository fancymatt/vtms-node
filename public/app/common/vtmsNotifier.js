angular.module('vtms').value('vtmsToastr', toastr);

angular.module('vtms').factory('vtmsNotifier', function(vtmsToastr) {
  
  vtmsToastr.options = {
    "closeButton" : true,
    "newestOnTop" : true,
    "showMethod" : "slideDown",
    "showEasing" : "swing",
    "hideMethod" : "slideUp",
    "hideEasing" : "swing"
  };
  
  return {
    notify: function(msg) {
      vtmsToastr.info(msg);
      console.log(msg);
    },
    success: function(msg) {
      vtmsToastr.success(msg);
      console.log(msg);
    },
    error: function(msg) {
      vtmsToastr.error(msg);
      console.log(msg);
    }
  };
});