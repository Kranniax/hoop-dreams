// var todaysDate = moment().format("LL");
// console.log(todaysDate);
var todaysDate = "2024-05-19";
var fullDate = moment("2024-05-19").format("dddd Do MMM YYYY");

var getNowPlaying = function () {
  var url =
    "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=2023-2024&league=12&date=" +
    todaysDate;

  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  }).then(function (response) {
    response.json().then(function (data) {
      loadNowPlayingGames(data);
      // console.log(data);
    });
  });
};

var getTeamRanking = function (teamID) {
  var url =
    "https://api-basketball.p.rapidapi.com/standings?league=12&team=" +
    teamID +
    "&season=2023-2024";
  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  }).then(function (response) {
    response.json().then(function (data) {
      return data.response[0][0].position;
    });
  });
};

function loadNowPlayingGames(gameData) {
  if (gameData.response.length === 0) {
    // TODO: There are no games being played.
  }

  for (var i = 0; i < gameData.response.length; i++) {
    var currentGameContainer = document.createElement("div");
    currentGameContainer.classList.add("current-game", "level");

    var currentGameItemContainer = document.createElement("div");
    currentGameItemContainer.classList.add("level-item", "has-text-centered");

    var gameCardMatchUpContainer = document.createElement("div");
    gameCardMatchUpContainer.classList.add("gameCardMatchUpContainer");

    var gameStatusTitle = document.createElement("p");
    gameStatusTitle.classList.add("heading");
    gameStatusTitle.textContent = gameData.response[i].status.long;

    var gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container", "is-flex");

    var awayContainer = document.createElement("article");
    awayContainer.classList.add("away-container");

    var awayImage = document.createElement("img");
    awayImage.setAttribute("style", "height:auto; max-width:100%;");
    awayImage.setAttribute("src", gameData.response[i].teams.away.logo);

    var awayTeamContainer = document.createElement("div");
    awayTeamContainer.classList.add("away-team-rank");

    var awayTeamRank = document.createElement("p");
    awayTeamRank.classList.add("away-rank");
    // TODO: Work on Ranking system.
    var awayTeamRankNumber = getTeamRanking(gameData.response[i].teams.away.id);
    console.log(awayTeamRankNumber);
    awayTeamRank.textContent = awayTeamRankNumber;

    var awayTeamName = document.createElement("p");
    awayTeamName.classList.add("away-team");
    awayTeamName.textContent = gameData.response[i].teams.away.name;

    var scoreContainer = document.createElement("div");
    scoreContainer.classList.add(
      "score-container",
      "is-flex",
      "is-align-items-center"
    );

    var awayScore = document.createElement("div");
    awayScore.classList.add("away-score");

    var awayScoreItem = document.createElement("p");
    awayScoreItem.classList.add("away-score-item", "px-3");
    awayScoreItem.textContent = gameData.response[i].scores.away.total;

    var currentGameStatus = document.createElement("div");
    currentGameStatus.classList.add("current-game-status");

    var currentGameStatusItem = document.createElement("p");
    currentGameStatusItem.classList.add("current-game-status-item");
    currentGameStatusItem.textContent = gameData.response[i].status.short;

    var homeScore = document.createElement("div");
    homeScore.classList.add("home-score");

    var homeScoreItem = document.createElement("p");
    homeScoreItem.classList.add("home-score-item", "px-3");
    homeScoreItem.textContent = gameData.response[i].scores.home.total;

    var homeContainer = document.createElement("article");
    homeContainer.classList.add("home-container");

    var homeImage = document.createElement("img");
    homeImage.setAttribute("style", "height:auto; max-width:100%;");
    homeImage.setAttribute("src", gameData.response[i].teams.home.logo);

    var homeTeamContainer = document.createElement("div");
    homeTeamContainer.classList.add("home-team-rank");

    var homeTeamRank = document.createElement("p");
    homeTeamRank.classList.add("home-rank");
    // TODO: Work on Ranking system.
    var homeTeamRankNumber = getTeamRanking(gameData.response[i].teams.home.id);
    homeTeamRank.textContent = homeTeamRankNumber;

    var homeTeamName = document.createElement("p");
    homeTeamName.classList.add("home-team");
    homeTeamName.textContent = gameData.response[i].teams.home.name;

    awayTeamContainer.appendChild(awayTeamRank);
    awayTeamContainer.appendChild(awayTeamName);
    awayContainer.appendChild(awayImage);
    awayContainer.appendChild(awayTeamContainer);

    awayScore.appendChild(awayScoreItem);
    currentGameStatus.appendChild(currentGameStatusItem);
    homeScore.appendChild(homeScoreItem);

    scoreContainer.appendChild(awayScore);
    scoreContainer.appendChild(currentGameStatus);
    scoreContainer.appendChild(homeScore);

    homeTeamContainer.appendChild(homeTeamRank);
    homeTeamContainer.appendChild(homeTeamName);
    homeContainer.appendChild(homeImage);
    homeContainer.appendChild(homeTeamContainer);

    // Append all children to game container.
    gameContainer.appendChild(awayContainer);
    gameContainer.appendChild(scoreContainer);
    gameContainer.appendChild(homeContainer);
    // Append children elements to game match up container.
    gameCardMatchUpContainer.appendChild(gameStatusTitle);
    gameCardMatchUpContainer.appendChild(gameContainer);

    currentGameItemContainer.appendChild(gameCardMatchUpContainer);
    currentGameContainer.appendChild(currentGameItemContainer);
    document
      .querySelector(".now-playing-container")
      .appendChild(currentGameContainer);
  }
}
document.querySelector("p.title").textContent = fullDate;
getNowPlaying();
