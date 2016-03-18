module.exports = function(app, userModel) {
    app.get("/api/assignment/user", findUserByCredentials);

    function findUserByCredentials(req, res) {
        var test = req.body;
        console.log(test + " server");
        userModel.findUserByCredentials(test);
        //res.send(200);
    }
}