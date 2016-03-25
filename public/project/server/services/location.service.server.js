module.exports = function(app, locationModel) {
    app.get("/api/project/location", getAllLocations);
    app.post("/api/project/location/:userId", createLocationForUser);
    app.delete("/api/project/location/:locationId", deleteLocationById);

    function getAllLocations(req, res) {
        var locations = locationModel.getAllLocations();
        res.json(locations);
    }

    function createLocationForUser(req, res) {
        var userId = req.params.userId;
        var location = req.body;
        var newLocation = locationModel.createLocationForUser(userId, location);
        res.json(newLocation);
    }

    function deleteLocationById(req, res) {
        var locationId = req.params.locationId;
        var locations = locationModel.deleteLocationById(locationId);
        res.json(locations);
    }
}