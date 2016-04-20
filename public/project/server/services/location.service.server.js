module.exports = function(app, locationModel) {
    app.get("/api/project/location/search/:name", getLocationsByName);
    app.get("/api/project/location?id=id", getLocationById);
    app.put("/api/project/location/:locationId/comment", addCommentToLocation);
    app.get("/api/project/location", requestRouter);
    app.post("/api/project/location/:userId", createLocationForUser);
    app.delete("/api/project/location/:locationId", deleteLocationById);
    app.put("/api/project/location/:locationId", updateLocationById);
    app.get("/api/project/location/:userId", findAllLocationsForUser);

    function requestRouter(req, res) {
        if (req.query.id) {
            getLocationById(req, res);
        }
        else {
            getAllLocations(req, res);
        }
    }

    function getAllLocations(req, res) {
        locationModel.getAllLocations()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllLocationsForUser(req, res) {
        var userId = req.params.userId;
        locationModel.findAllLocationsForUser(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createLocationForUser(req, res) {
        var userId = req.params.userId;
        var location = req.body;
        locationModel.createLocationForUser(userId, location)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteLocationById(req, res) {
        var locationId = req.params.locationId;
        locationModel.deleteLocationById(locationId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateLocationById(req, res) {
        var locationId = req.params.locationId;
        var newLocation = req.body;
        locationModel.updateLocationById(locationId, newLocation)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getLocationById(req, res) {
        var locationId = req.query.id;
        locationModel.getLocationById(locationId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function getLocationsByName(req, res) {
        var name = req.params.name;
        locationModel.getLocationsByName(name)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function addCommentToLocation(req, res) {
        var locationId = req.params.locationId;
        var comment = req.body;
        locationModel.addCommentToLocation(locationId, comment)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}