var todaysDate = moment().format("YYYY-MM-DD");
// var todaysDate = "2024-09-15";
var fullDate = moment().format("dddd Do MMM YYYY");
var currentMonth = moment().format("M");
var currentYear = moment().format("Y");
var previousYear = moment().subtract(1, "y").format("Y");
var nextYear = moment().add(1, "y").format("Y");
var teamInput = document.querySelector(".team-input");
var modalContents = document.querySelector(".modal-card-body");
var searchHistory = [];

var getNowPlaying = function () {
  // var url =
  //   "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
  //   previousYear +
  //   "-" +
  //   currentYear +
  //   "&league=12&date=" +
  //   todaysDate;
  var url = "";
  // console.log(currentMonth);

  if (currentMonth === "7" || currentMonth === "8" || currentMonth === "9") {
    url =
      "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
      currentYear +
      "&league=13&date=" +
      todaysDate;
  } else if (currentMonth >= 10) {
    // Between October and December, we use the current year and next year
    url =
      "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
      currentYear +
      "-" +
      nextYear +
      "&league=12&date=" +
      todaysDate;
  } else {
    // Between January and April, we use the previous year and the current year
    url =
      "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
      previousYear +
      "-" +
      currentYear +
      "&league=12&date=" +
      todaysDate;
  }

  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  };

  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      loadNowPlayingGames(data);
      // getNowPlayingIDs(data);
      // console.log(data.response);
    });
  });
};
/*
async function fetchRankings(id) {
  var url =
    "https://api-basketball.p.rapidapi.com/standings?league=12&team=" +
    id +
    "&season=2023-2024";

  var options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

async function getNowPlayingRankings(gameIDs) {
  const results = [];

  for (const id of gameIDs) {
    const awayData = await fetchRankings(id.away);
    const homeData = await fetchRankings(id.home);

    const combinedResult = {
      away: awayData.response[0][0].position,
      home: homeData.response[0][0].position,
    };

    results.push(combinedResult);
  }

  console.log(results);
}

// a function to retrieve the now playing games ID's
function getNowPlayingIDs(gameData) {
  var rankings = [];
  for (var i = 0; i < gameData.response.length; i++) {
    var gamesRankings = {
      away: gameData.response[i].teams.away.id,
      home: gameData.response[i].teams.home.id,
    };
    rankings.push(gamesRankings);
  }

  getNowPlayingRankings(rankings);
}
*/
function loadNowPlayingGames(gameData) {
  // if no games are being played. Show a message informing the user.
  if (gameData.response.length === 0) {
    // TODO: There are no games being played.
    var noGames = document.createElement("h2");
    noGames.textContent = "NO GAMES ARE BEING PLAYED";

    document.querySelector(".now-playing-container").appendChild(noGames);
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

    // TODO: Work on Ranking system.
    var awayTeamRank = document.createElement("p");
    awayTeamRank.classList.add("away-rank");

    // var awayTeamRankNumber = getTeamRanking(gameData.response[i].teams.away.id);
    // console.log(awayTeamRankNumber);
    // awayTeamRank.textContent = awayTeamRankNumber;

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

    // TODO: Work on Ranking system.
    var homeTeamRank = document.createElement("p");
    homeTeamRank.classList.add("home-rank");

    // var homeTeamRankNumber = getTeamRanking(gameData.response[i].teams.home.id);
    // homeTeamRank.textContent = homeTeamRankNumber;

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
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });
});
// limit teams array to 6 teams.
var formatSearchHistory = function (searchHistory) {
  if (searchHistory.length > 6) {
    searchHistory.pop();
  }

  return searchHistory;
};
// Save searched team to localStorage.
var saveSearchHistory = function (team) {
  var saveTeams = localStorage.getItem("teams")
    ? JSON.parse(localStorage.getItem("teams"))
    : [];

  searchHistory = saveTeams;
  searchHistory.unshift(team);

  // limit the array to 6 teams.
  var updatedSearchHistory = formatSearchHistory(searchHistory);
  // store teams array in localStorage.
  localStorage.setItem("teams", JSON.stringify(updatedSearchHistory));
};

var displayRecentSearch = function (recentSearchArray) {
  for (var i = 0; i < recentSearchArray.length; i++) {
    var recentSearchBtn = document.createElement("button");
    recentSearchBtn.classList.add("button", "is-primary", "m-2");
    recentSearchBtn.setAttribute("type", "button");
    recentSearchBtn.textContent = recentSearchArray[i];

    // append all recently searched teams to modal content section.
    modalContents.appendChild(recentSearchBtn);
  }
};

// load recently searched NBA teams.
var loadSearchHistory = function () {
  var recentSearch = JSON.parse(localStorage.getItem("teams"));

  displayRecentSearch(recentSearch);
};
// Search for team based on recent search history.
modalContents.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    saveSearchHistory(event.target.innerText);
    location.href = "./team-search.html?team=" + event.target.innerText;
  }
});
// Get input value for team.
teamInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    // save search history to localStorage
    saveSearchHistory(teamInput.value);
    // your code to Run
    location.href = "./team-search.html?team=" + teamInput.value;
  }
});
// Display full date as a sub header.
document.querySelector("p.title").textContent = fullDate;

loadSearchHistory();
getNowPlaying();
