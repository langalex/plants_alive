Cobot = function() {
  var store = {};
  return {
    all: function(conditions, options) {
      options = options || {};
      var all = [];
      for(var i in store) {
        if(conditions === undefined ||
            conditions['type'] === undefined ||
            conditions['type'] == store[i]['type']) {
          all.push(store[i]);
        };
      };
      all.sort(function(a, b) {
        if(a == b) {
          return 0;
        } else {
          return a['created_at'] < b['created_at'] ? -1 : 1
        };
      });
      if(options.descending) {
        all.reverse();
      };
      if(options.limit) {
        all = all.slice(0, options.limit - 1);
      };
      return all;
    },
    put: function(value) {
      value._id = value._id || (new Date() * 1) + '';
      value.created_at = this.formatted_now();
      store[value._id] = value;
    },
    get: function(id) {
      return store[id];
    },
    current_user: {
      login: 'alex'
    },
    current_space: {
      name: 'co.up'
    },
    formatted_now: function() {
      var now = new Date();
      return now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' +
        now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    }
  };
};
