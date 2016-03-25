module.exports = function(app, locationModel) {
    app.get("/api/project/location", getAllLocations);

    function getAllLocations(req, res) {
        var locations = locationModel.getAllLocations();
        res.json(locations);
    }
}