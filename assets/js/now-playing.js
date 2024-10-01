// var todaysDate = moment().format("YYYY-MM-DD");
var todaysDate = "2024-09-17";
var fullDate = moment().format("dddd Do MMM YYYY");
var currentMonth = moment().format("M");
var currentYear = moment().format("Y");
var previousYear = moment().subtract(1, "y").format("Y");
var nextYear = moment().add(1, "y").format("Y");
var teamInput = document.querySelector(".team-input");
var modalContents = document.querySelector(".modal-card-body");
var searchHistory = [];

// Get now playing games based on the month and date of this year.
var getNowPlaying = function () {
  var url = "";

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
    // Between January and June, we use the previous year and the current year
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
    });
  });
};
// Load games that are being played right now.
function loadNowPlayingGames(gameData) {
  // if no games are being played. Show a message informing the user.
  if (gameData.response.length === 0) {
    // TODO: There are no games being played.
    var noGames = $("<h2>")
      .addClass(
        "has-text-centered has-text-danger has-text-weight-bold is-size-4"
      )
      .text("NO GAMES ARE BEING PLAYED TODAY");

    $(".now-playing-container").append(noGames);
  }

  for (var i = 0; i < gameData.response.length; i++) {
    // A div container element to show the different now playing matchups.
    var currentGameContainer = $("<div>").addClass("current-game level");

    var currentGameItemContainer = $("<div>").addClass(
      "level-item has-text-centered"
    );

    var gameCardMatchUpContainer = $("<div>").addClass(
      "gameCardMatchUpContainer"
    );

    var gameStatusTitle = $("<p>")
      .addClass("heading")
      .text(gameData.response[i].status.long);

    var gameContainer = $("<div>").addClass("game-container is-flex");

    var awayContainer = $("<article>").addClass("away-container");

    var awayImage = $("<img>")
      .css("height", "auto")
      .css("max-width", "100%")
      .css("max-height", "auto")
      .css("object-fit", "contain")
      .css("overflow", "hidden")
      .css("background-size", "cover")
      .attr("src", gameData.response[i].teams.away.logo);

    var awayTeamContainer = $("<div>").addClass("away-team-rank");

    var awayTeamName = $("<p>")
      .addClass("away-team")
      .text(gameData.response[i].teams.away.name);

    var scoreContainer = $("<div>").addClass(
      "score-container is-flex is-align-items-center"
    );

    var awayScore = $("<div>").addClass("away-score");

    var awayScoreItem = $("<p>")
      .addClass("away-score-item px-3")
      .text(gameData.response[i].scores.away.total);

    var currentGameStatus = $("<div>").addClass("current-game-status");

    var currentGameStatusItem = $("<p>")
      .addClass("current-game-status-item")
      .text(gameData.response[i].status.short);

      // console.log(gameData.response[i].status.short);
      

    var homeScore = $("<div>").addClass("home-score");

    var homeScoreItem = $("<p>")
      .addClass("home-score-item px-3")
      .text(gameData.response[i].scores.home.total);

    var homeContainer = $("<article>").addClass("home-container");

    var homeImage = $("<img>")
      .css("height", "auto")
      .css("max-width", "100%")
      .css("max-height", "auto")
      .css("object-fit", "contain")
      .css("overflow", "hidden")
      .css("background-size", "cover")
      .attr("src", gameData.response[i].teams.home.logo);

    var homeTeamContainer = $("<div>").addClass("home-team-rank");

    var homeTeamName = $("<p>")
      .addClass("home-team")
      .text(gameData.response[i].teams.home.name);

    // Compare Game Scores.
    if (gameData.response[i].status.short === "FT") {
      if (
        parseInt(gameData.response[i].scores.home.total) >
        parseInt(gameData.response[i].scores.away.total)
      ) {
        homeScore.addClass("has-text-weight-bold");
      } else {
        awayScore.addClass("has-text-weight-bold");
      }
    }

    // Append children elements to game match up containers.
    awayTeamContainer.append(awayTeamName);
    awayContainer.append(awayImage, awayTeamContainer);
    awayScore.append(awayScoreItem);
    currentGameStatus.append(currentGameStatusItem);
    homeScore.append(homeScoreItem);
    scoreContainer.append(awayScore, currentGameStatus, homeScore);
    homeTeamContainer.append(homeTeamName);
    homeContainer.append(homeImage, homeTeamContainer);
    gameContainer.append(awayContainer, scoreContainer, homeContainer);
    gameCardMatchUpContainer.append(gameStatusTitle, gameContainer);
    currentGameItemContainer.append(gameCardMatchUpContainer);
    currentGameContainer.append(currentGameItemContainer);
    $(".now-playing-container").append(currentGameContainer);
  }
}
// A script to activate the modal UI.
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
// Display the recent search history in a modal UI.
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

// Load recently searched NBA teams.
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
// Get input value for the team.
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
