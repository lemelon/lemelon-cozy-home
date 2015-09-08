// Generated by CoffeeScript 1.10.0
var allSlug, byApps, cozydb, imageByDate;

cozydb = require('cozydb');

byApps = function() {
  if (doc.type === 'persistent') {
    return emit([doc.app, doc.ref], doc);
  }
};

allSlug = function() {
  return emit(doc.slug, doc);
};

imageByDate = function(doc) {
  var ref;
  if (doc["class"] === "image" && (((ref = doc.binary) != null ? ref.file : void 0) != null)) {
    return emit(doc.lastModification, doc);
  }
};

module.exports = {
  user: {
    all: cozydb.defaultRequests.all
  },
  alarm: {
    all: cozydb.defaultRequests.all
  },
  event: {
    all: cozydb.defaultRequests.all
  },
  cozyinstance: {
    all: cozydb.defaultRequests.all
  },
  notification: {
    all: cozydb.defaultRequests.all,
    byDate: function(doc) {
      return emit(doc.publishDate, doc);
    },
    byApps: byApps
  },
  application: {
    all: cozydb.defaultRequests.all,
    bySlug: allSlug
  },
  stack_application: {
    all: cozydb.defaultRequests.all
  },
  background: {
    all: cozydb.defaultRequests.all
  },
  file: {
    imageByDate: imageByDate,
    imageByMonth: {
      map: function(doc) {
        var d, ref;
        if (doc["class"] === "image" && (((ref = doc.binary) != null ? ref.file : void 0) != null)) {
          d = new Date(doc.lastModification);
          return emit([d.getFullYear(), d.getMonth() + 1, d.getDate()], doc._id);
        }
      },
      reduce: '_count'
    }
  }
};