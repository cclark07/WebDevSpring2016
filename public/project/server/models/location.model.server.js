var q = require('q');

module.exports = function(db, mongoose) {
    var LocationSchema = require("./location.schema.server.js")();
    var Location = mongoose.model("ProjectLocation", LocationSchema);

    var api = {
        getAllLocations: getAllLocations,
        createLocationForUser: createLocationForUser,
        deleteLocationById: deleteLocationById,
        updateLocationById: updateLocationById,
        findAllLocationsForUser: findAllLocationsForUser,
        getLocationsByName: getLocationsByName,
        getLocationById: getLocationById,
        addCommentToLocation: addCommentToLocation
    };

    return api;

    function getAllLocations() {
        var deferred = q.defer();
        Location.find(
            function(err, locations) {
                if(!err) {
                    deferred.resolve(locations);
                }
                else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;
    }

    function createLocationForUser(userId, location) {
        location.userId = userId;

        var deferred = q.defer();
        Location.create(location,
            function (err, doc) {
                if (err) {
                    deferred.reject (err);
                } else {
                    deferred.resolve (doc);
                }
            });
        return deferred.promise;
    }

    function findAllLocationsForUser(userId) {
        var deferred = q.defer();
        Location.find(
            {
                userId: userId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function deleteLocationById(locationId) {
        var deferred = q.defer();
        Location.findOneAndRemove (
            {_id: locationId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function updateLocationById(locationId, newLocation) {
        var deferred = q.defer();
        Location.findOneAndUpdate(
            {_id: locationId},
            {$set: newLocation},
            {new: true},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function getLocationsByName(name) {
        var deferred = q.defer();
        Location.find(
            {
                name: name
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function getLocationById(locationId) {
        var deferred = q.defer();
        Location.findOne(
            {
                _id: locationId
            },
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            }
        );

        return deferred.promise;
    }

    function addCommentToLocation(locationId, comment) {
        var deferred = q.defer();
        Location.findOneAndUpdate(
            {_id: locationId},
            {$push: {comments: comment}},
            {upsert: true, new: true},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    console.log(err);
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }
}