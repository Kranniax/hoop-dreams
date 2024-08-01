var team = location.search;
var teamarray = team.split("=");
console.log(teamarray[1]);

var getTeamInformation = function (teamID) {
  var url =
    "https://api-basketball.p.rapidapi.com/statistics?season=2023-2024&league=12&team=" +
    teamID;
  var options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };
  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      // the team information is retrieved from the server side.
      console.log(data);
    });
  });
};

var getTeamID = function (value) {
  var url =
    "https://api-basketball.p.rapidapi.com/teams?league=12&season=2023-2024&search=" +
    value;

  var options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };

  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      getTeamInformation(data.response[0].id);
    });
  });
};

getTeamID(teamarray[1]);
