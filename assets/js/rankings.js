function getEasternRanks() {
  var url =
    "https://api-basketball.p.rapidapi.com/standings?stage=NBA%20-%20Regular%20Season&group=Eastern%20Conference&league=12&season=2023-2024";

  fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  }).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
}

function getWesternRanks() {
  var url =
    "https://api-basketball.p.rapidapi.com/standings?stage=NBA%20-%20Regular%20Season&group=Western%20Conference&league=12&season=2023-2024";
  var options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };

  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    });
  });
}

function createEasternTables(easternData) {
  var table = document.createElement("table");
  table.className = "table";
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");

  // Table Headings
  var rank = document.createElement("th");
  rank.innerHTML = "<abbr title ='Rank'>Rank</abbr>";
  var team = document.createElement("th");
  team.textContent = "Team";
  var wins = document.createElement("th");
  wins.innerHTML = "<abbr title ='wins'>W</abbr>";
  var loss = document.createElement("th");
  loss.innerHTML = "<abbr title ='loss'>L</abbr>";
  var winPercentage = document.createElement("th");
  winPercentage.innerHTML = "<abbr title ='Win Percentage'>WIN%</abbr>";

  //   append all heading titles to top table row.
  tr.appendChild(rank);
  tr.appendChild(team);
  tr.appendChild(wins);
  tr.appendChild(loss);
  tr.appendChild(winPercentage);
}

function createWesternTables(westernData) {}

getEasternRanks();
getWesternRanks();
