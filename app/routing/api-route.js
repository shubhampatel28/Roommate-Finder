var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var totalDifference = 0;

    var bestMatch = {
      name: "",
      aboutme: "",
      emailm: "",
      facebook: "",
      photo: "",
      friendDifference: 1000
    };

    var userData = req.body;
    var userName = userData.name;
    var aboutme = userData.aboutme;
    var emailm = userData.emailm;
    var facebook = userData.facebook;
    var userScores = userData.scores;

    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.name,
      aboutme: req.body.aboutme,
      emailm: req.body.emailm,
      facebook: req.body.facebook,
      photo: req.body.photo,
      scores: b
    };

    console.log("Name: " + userName);
    console.log("about me:" + aboutme);
    console.log("email:" + emailm);
    console.log("fb:" + facebook);
    console.log("User Score " + userScores);

    var sum = b.reduce((a, b) => a + b, 0);

    console.log("Sum of users score " + sum);
    console.log("Best match friend diff " + bestMatch.friendDifference);
    console.log("+++++++=================++++++++++");

    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].name);
      console.log(friends[i].emailm);
      console.log(friends[i].aboutme);
      console.log(friends[i].facebook);
      totalDifference = 0;
      console.log("Total Diff " + totalDifference);
      console.log("Best match friend diff " + bestMatch.friendDifference);

      var bfriendScore = friends[i].scores.reduce((a, b) => a + b, 0);
      console.log("Total friend score " + bfriendScore);
      totalDifference += Math.abs(sum - bfriendScore);
      console.log("-------------------------> " + totalDifference);

      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.name = friends[i].name;
        bestMatch.aboutme = friends[i].aboutme;
        bestMatch.emailm = friends[i].emailm;
        bestMatch.facebook = friends[i].facebook;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
      console.log(totalDifference + " Total Difference");
    }
    console.log(bestMatch);

    friends.push(userData);
    console.log("New user added");
    console.log(userData);
    res.json(bestMatch);
  });
};