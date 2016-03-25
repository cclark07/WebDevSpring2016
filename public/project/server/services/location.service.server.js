module.exports = function(app, locationModel) {
    app.get("/api/project/location?id=id", getLocationById);
    app.get("/api/project/location", getAllLocations);
    app.post("/api/project/location/:userId", createLocationForUser);
    app.delete("/api/project/location/:locationId", deleteLocationById);
    app.put("/api/project/location/:locationId", updateLocationById);
    app.get("/api/project/location/:userId", findAllLocationsForUser);

    function getAllLocations(req, res) {
        var locations = locationModel.getAllLocations();
        res.json(locations);
    }

    function findAllLocationsForUser(req, res) {
        var userId = req.params.userId;
        var locations = locationModel.findAllLocationsForUser(userId);
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

    function updateLocationById(req, res) {
        var locationId = req.params.locationId;
        var newLocation = req.body;
        var updatedLocation = locationModel.updateLocationById(locationId, newLocation);
        res.json(updatedLocation);
    }

    function getLocationById(req, res) {
        var locationId = req.query.locationId;
        var location = locationModel.getLocationById(locationId);
        res.json(location);
    }
}