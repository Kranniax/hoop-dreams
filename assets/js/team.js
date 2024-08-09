var teamContainer = document.querySelector(".team-container");
var teamInput = document.querySelector(".team-input");

var getTeamStandings = function (teamID) {
  var url =
    "https://api-basketball.p.rapidapi.com/standings?stage=NBA%20-%20Regular%20Season&league=12&team=" +
    teamID +
    "&season=2023-2024";
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
      var teamRecords = {
        name: data.response[0][0].team.name,
        logo: data.response[0][0].team.logo,
        wins: data.response[0][0].games.win.total,
        losses: data.response[0][0].games.lose.total,
        conference: data.response[0][0].group.name,
        division: data.response[0][1].group.name,
        rank: data.response[0][0].position,
      };
      displayTeamStatistics(teamRecords);
      getTeamArticles(teamRecords.name);
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
      getTeamStandings(data.response[0].id);
    });
  });
};

function displayTeamStatistics(teamInfo) {
  var teamCard = document.createElement("div");
  teamCard.classList.add("card", "container");

  var teamName = document.createElement("h2");
  teamName.classList.add("card-header-title");
  teamName.textContent = teamInfo.name;

  var teamImg = document.createElement("img");
  teamImg.classList.add("card-image");
  teamImg.setAttribute("src", teamInfo.logo);

  var teamCardContent = document.createElement("div");
  teamCardContent.classList.add("card-content");
  var record = document.createElement("p");
  record.innerHTML =
    "<strong>Record: </strong>" + teamInfo.wins + "-" + teamInfo.losses;
  var conference = document.createElement("p");
  conference.innerHTML =
    "<strong>Conference: </strong>" +
    teamInfo.conference +
    " | <strong>Division: </strong>" +
    teamInfo.division;

  var rank = document.createElement("p");
  rank.innerHTML = "<strong>Team Rank: </strong> " + teamInfo.rank;

  // append all card content elements together.
  teamCardContent.appendChild(record);
  teamCardContent.appendChild(conference);
  teamCardContent.appendChild(rank);

  teamCard.appendChild(teamName);
  teamCard.appendChild(teamImg);
  teamCard.appendChild(teamCardContent);

  teamContainer.appendChild(teamCard);
}

function getTeamArticles(team) {
  var shortenTeamName = team.split(" ");
  var teamName = shortenTeamName[shortenTeamName.length - 1];

  var url =
    "https://nba-latest-news.p.rapidapi.com/articles?team=" +
    teamName +
    "&limit=5";
  var options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "nba-latest-news.p.rapidapi.com",
    },
  };

  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      displayTeamArticles(data);
    });
  });
}
function toTitleCase(str) {
  return str.replace("_", " ").replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}
function displayTeamArticles(team) {
  // console.log(team);

  for (var i = 0; i < team.length; i++) {
    var source = toTitleCase(team[i].source);
    var articleCard = document.createElement("div");
    articleCard.classList.add("card", "mt-3");

    var articleContent = document.createElement("div");
    articleContent.classList.add("card-content");

    var articleTitle = document.createElement("p");
    articleTitle.classList.add("title");
    articleTitle.textContent = team[i].title;

    var articleCardFooter = document.createElement("footer");
    articleCardFooter.classList.add("card-footer");

    var cardFooterItem = document.createElement("p");
    cardFooterItem.classList.add("card-footer-item");
    cardFooterItem.innerHTML =
      "<span>View on <a href=" +
      team[i].url +
      " target='_blank'>" +
      source +
      "</a></span>";

    articleContent.appendChild(articleTitle);
    articleCardFooter.appendChild(cardFooterItem);

    articleCard.appendChild(articleContent);
    articleCard.appendChild(articleCardFooter);

    // console.log(articleCard);
    document.querySelector(".blog-container").appendChild(articleCard);
  }
}
function init() {
  // get query paramater of searched team.
  var team = location.search;
  var teamArray = team.split("=");
  var searchedTeam = teamArray[1];

  // create a header for searched value.
  var teamName = document.createElement("h2");
  teamName.textContent = "You searched for: " + searchedTeam;
  document.querySelector(".team-container").appendChild(teamName);

  // get team information from fetch api.
  getTeamID(searchedTeam);
}
teamInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    // your code to Run
    location.href = "./team-search.html?team=" + teamInput.value;
  }
});
init();
