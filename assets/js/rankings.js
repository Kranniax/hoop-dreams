
// a fetch function to retrieve the eastern conference standings.
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
      createEasternTables(data);
      console.log(data);
    });
  });
}
// a fetch function to retrieve the western conference standings. 
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
      createWesternTables(data);
      console.log(data);
    });
  });
}
// Initiate the creation of the eastern standing table. 
function createEasternTables(easternData) {
  var westernHeading = document.createElement("h3");
  westernHeading.textContent = "Eastern Conference";
  document
    .querySelector(".eastern-conference-standing")
    .appendChild(westernHeading);

  var table = document.createElement("table");
  table.className = "table";
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");

  // Table Headings
  var rank = document.createElement("th");
  rank.innerHTML = "<abbr title ='rank'>Rank</abbr>";
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
  // append all children to the table header
  thead.appendChild(tr);

  // append  completed table header to table element.
  table.appendChild(thead);

  // append table to eastern conference standing section
  document.querySelector(".eastern-conference-standing").appendChild(table);

  // create table rows for eastern conference standings.
  var tablerow = createEasternRows(easternData);
  table.appendChild(tablerow);
}
// populate to data with information retrieved from the fetch request. 
function createEasternRows(data) {
  var tbody = document.createElement("tbody");

  for (var i = 0; i < data.response[0].length; i++) {
    // create a row of data from sever side information.
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = data.response[0][i].position;
    var tdName = document.createElement("td");
    tdName.textContent = data.response[0][i].team.name;
    var tdWins = document.createElement("td");
    tdWins.textContent = data.response[0][i].games.win.total;
    var tdLoss = document.createElement("td");
    tdLoss.textContent = data.response[0][i].games.lose.total;
    var tdWinPercentage = document.createElement("td");
    tdWinPercentage.textContent = data.response[0][i].games.win.percentage;

    // append all children to table row
    tr.appendChild(th);
    tr.appendChild(tdName);
    tr.appendChild(tdWins);
    tr.appendChild(tdLoss);
    tr.appendChild(tdWinPercentage);
    tbody.appendChild(tr);
  }

  return tbody;
}

function createWesternTables(westernData) {
  var westernHeading = document.createElement("h3");
  westernHeading.textContent = "Western Conference";
  document
    .querySelector(".western-conference-standing")
    .appendChild(westernHeading);

  var table = document.createElement("table");
  table.className = "table";
  var thead = document.createElement("thead");
  var tr = document.createElement("tr");

  // Table Headings
  var rank = document.createElement("th");
  rank.innerHTML = "<abbr title ='rank'>Rank</abbr>";
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
  // append all children to the table header
  thead.appendChild(tr);

  // append  completed table header to table element.
  table.appendChild(thead);

  // append table to eastern conference standing section
  document.querySelector(".eastern-conference-standing").appendChild(table);

  // create table rows for eastern conference standings.
  var tablerow = createWesternRows(westernData);
  table.appendChild(tablerow);
}

function createWesternRows(data) {
  var tbody = document.createElement("tbody");

  for (var i = 0; i < data.response[0].length; i++) {
    // create a row of data from sever side information.
    var tr = document.createElement("tr");

    var th = document.createElement("th");
    th.textContent = data.response[0][i].position;
    var tdName = document.createElement("td");
    tdName.textContent = data.response[0][i].team.name;
    var tdWins = document.createElement("td");
    tdWins.textContent = data.response[0][i].games.win.total;
    var tdLoss = document.createElement("td");
    tdLoss.textContent = data.response[0][i].games.lose.total;
    var tdWinPercentage = document.createElement("td");
    tdWinPercentage.textContent = data.response[0][i].games.win.percentage;

    // append all children to table row
    tr.appendChild(th);
    tr.appendChild(tdName);
    tr.appendChild(tdWins);
    tr.appendChild(tdLoss);
    tr.appendChild(tdWinPercentage);
    tbody.appendChild(tr);
  }

  return tbody;
}

getEasternRanks();
getWesternRanks();
