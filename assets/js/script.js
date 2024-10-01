// var todaysDate = moment().format("YYYY-MM-DD");
var todaysDate = "2024-09-17";
var currentYear = moment().format("Y");
var currentMonth = moment().format("M");
var previousYear = moment().subtract(1, "y").format("Y");
var nextYear = moment().add(1, "y").format("Y");

var teamInput = document.querySelector(".team-input");
var modalContents = document.querySelector(".modal-card-body");
var searchHistory = [];

// A fetch api to retrieve today's now playing games.
function getNowPlaying() {
  var url = "";

  if (currentMonth === "7" || currentMonth === "8" || currentMonth === "9") {
    url =
      "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
      currentYear +
      "&league=13&date=" +
      todaysDate;
  } else if (currentMonth >= 10) {
    // Between October and December, we use the current year and next year.
    url =
      "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
      currentYear +
      "-" +
      nextYear +
      "&league=12&date=" +
      todaysDate;
  } else {
    // Between January and June, we use the previous year and the current year.
    url =
      "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=" +
      previousYear +
      "-" +
      currentYear +
      "&league=12&date=" +
      todaysDate;
  }

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  };
  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      loadNowPlaying(data);
    });
  });
}
// A fetch api to retrieve recent nba articles or blogs.
function getNBABlogs() {
  const url =
    "https://nba-latest-news.p.rapidapi.com/articles?source=nba&limit=6";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "nba-latest-news.p.rapidapi.com",
    },
  };

  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      nbaLatestNews(data);
    });
  });
}
// Display now playing games on main landing page.
function loadNowPlaying(nowData) {
  if (nowData.response.length == 0) {
    $(".now-playing-container")
      .text("NO GAMES SCHEDULED")
      .addClass(
        "is-justify-content-center has-text-danger has-text-weight-bold is-size-4"
      );
    return;
  }
  for (var i = 0; i < nowData.response.length; i++) {
    // Create landing page for now playing cards.

    var card = $("<div>").addClass("card column m-2 is-3");

    var cardHeader = $("<div>").addClass("card-header column");

    var cardTitle = $("<h3>")
      .addClass("card-header-title is-centered")
      .text(
        nowData.response[i].teams.home.name +
          " vs " +
          nowData.response[i].teams.away.name
      );

    // NBA Team Logos
    var cardImagecontainer = $("<div>").addClass(
      "card-image columns is-vcentered"
    );
    var cardHomeImage = $("<img>")
      .addClass("column")
      .attr("src", nowData.response[i].teams.home.logo)
      .attr("alt", "nba team image")
      .css("max-width", "100%")
      .css("max-height", "auto")
      .css("object-fit", "contain")
      .css("overflow", "hidden")
      .css("background-size", "cover");
    var versusFont = $("<span>")
      .addClass(
        "column has-text-centered is-size-1 has-text-weight-bold is-inline-block"
      )
      .text("VS");
    var cardAwayImage = $("<img>")
      .addClass("column")
      .attr("src", nowData.response[i].teams.away.logo)
      .attr("alt", "nba team image")
      .css("max-width", "100%")
      .css("max-height", "auto")
      .css("object-fit", "contain")
      .css("overflow", "hidden")
      .css("background-size", "cover");

    // Now Playing Game Status and Scores
    var cardContent = $("<div>").addClass("card-content");
    // Game Status
    var gameStatus = $("<p>")
      .addClass("has-text-centered has-text-weight-semibold has-text-danger")
      .text(nowData.response[i].status.long);
    cardContent.append(gameStatus);

    // console.log(nowData.response[i].status.long);
    // PSEDO: If the game status is " Game Finished"
    // Compare the away score against the home score.
    //If the away score is greater than the home, add bold CSS. else home score has bold css.
    // Game Scores
    var scoreContainer = $("<div>").addClass(
      "is-flex is-justify-content-space-between"
    );
    var homeScore = $("<div>")
      .addClass("is-inline-block is-size-1")
      .text(nowData.response[i].scores.home.total);
    var awayScore = $("<div>")
      .addClass("is-inline-block is-size-1")
      .text(nowData.response[i].scores.away.total);

    // Compare Game Scores.
    if (nowData.response[i].status.long === "Game Finished") {
      if (
        parseInt(nowData.response[i].scores.home.total) >
        parseInt(nowData.response[i].scores.away.total)
      ) {
        homeScore.addClass("has-text-weight-bold");
      } else {
        awayScore.addClass("has-text-weight-bold");
      }
    }
    // Append all children to parent elements
    scoreContainer.append(homeScore, awayScore);
    cardContent.append(scoreContainer);
    cardHeader.append(cardTitle);
    cardImagecontainer.append(
      cardHomeImage,
      versusFont,
      cardAwayImage,
      cardContent
    );
    card.append(cardHeader, cardImagecontainer, cardContent);
    $(".now-playing-container").append(card);
  }
}
// Latest NBA News Articles
function nbaLatestNews(newsData) {
  for (var i = 0; i < newsData.length; i++) {
    //News Card
    var articleCard = $("<div>").addClass("card column m-2 is-3");

    // News Card Content
    var cardContent = $("<div>").addClass("card-content");
    var cardTitle = $("<p>").addClass("title").text(newsData[i].title);
    var cardFooter = $("<footer>").addClass("card-footer");
    var cardFooterItem = $("<p>")
      .addClass("card-footer-item")
      .html(
        "<span> View on <a href=" +
          newsData[i].url +
          " target='_blank'>" +
          newsData[i].source +
          "</a></span>"
      );

    cardContent.append(cardTitle);
    cardFooter.append(cardFooterItem);
    articleCard.append(cardContent, cardFooter);

    $(".blog-container").append(articleCard);
  }
}
// A script to trigger the modal element.
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
// Limit teams array to 6 teams.
var formatSearchHistory = function (searchHistory) {
  if (searchHistory.length > 6) {
    searchHistory.pop();
  }

  return searchHistory;
};
// Save searched team to localStorage.
var saveSearchHistory = function (team) {
  //  Load any pre-existing items in localStorage. If there aren’t any, you create an empty array
  var saveTeams = localStorage.getItem("teams")
    ? JSON.parse(localStorage.getItem("teams"))
    : [];

  searchHistory = saveTeams;
  searchHistory.unshift(team);

  // Limit the array to 6 teams.
  var updatedSearchHistory = formatSearchHistory(searchHistory);
  // Store teams array in localStorage.
  localStorage.setItem("teams", JSON.stringify(updatedSearchHistory));
};
//  Display recent search history in modal UI.
var displayRecentSearch = function (recentSearchArray) {
  for (var i = 0; i < recentSearchArray.length; i++) {
    var recentSearchBtn = document.createElement("button");
    recentSearchBtn.classList.add("button", "is-primary", "m-2");
    recentSearchBtn.setAttribute("type", "button");
    recentSearchBtn.textContent = recentSearchArray[i];

    // Append all recently searched teams to modal content section.
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

// Display Searched Team Statistics and Blogs.
teamInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    // save search history to localStorage.
    saveSearchHistory(teamInput.value);
    // your code to Run
    location.href = "./team-search.html?team=" + teamInput.value;
  }
});
loadSearchHistory();
getNowPlaying();
getNBABlogs();
