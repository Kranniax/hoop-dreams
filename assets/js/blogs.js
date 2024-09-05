var teamInput = document.querySelector(".team-input");
var modalContents = document.querySelector(".modal-card-body");
function getNBABlogs() {
  const url = "https://nba-latest-news.p.rapidapi.com/articles?limit=10";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "x-rapidapi-host": "nba-latest-news.p.rapidapi.com",
    },
  };

  fetch(url, options).then(function (response) {
    response.json().then(function (data) {
      // console.log(data);
      nbaLatestNews(data);
    });
  });
}

function toTitleCase(str) {
  return str.replace("_", " ").replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}

// Latest NBA News Articles
function nbaLatestNews(newsData) {
  for (var i = 0; i < newsData.length; i++) {
    var source = toTitleCase(newsData[i].source);
    //News Card
    var articleCard = document.createElement("div");
    articleCard.classList.add("card", "column", "m-2");
    // News Card Content
    var cardContent = document.createElement("div");
    cardContent.className = "card-content";

    var cardTitle = document.createElement("p");
    cardTitle.className = "title";
    cardTitle.textContent = newsData[i].title;

    var cardFooter = document.createElement("footer");
    cardFooter.className = "card-footer";

    var cardFooterItem = document.createElement("p");
    cardFooterItem.classList.add("card-footer-item");
    cardFooterItem.innerHTML =
      "<span> View on <a href=" +
      newsData[i].url +
      " target='_blank'>" +
      source +
      "</a></span>";

    cardContent.appendChild(cardTitle);
    cardFooter.appendChild(cardFooterItem);
    articleCard.appendChild(cardContent);
    articleCard.appendChild(cardFooter);

    document.querySelector(".blog-cards").appendChild(articleCard);
  }
}
// a script to trigger the modal element.
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
  searchHistory.push(team);
  // reverse order of teams array. recently added teams will show first.
  var reversedSearchHistory = searchHistory.toReversed();
  // limit the array to 6 teams.
  var updatedSearchHistory = formatSearchHistory(reversedSearchHistory);
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

teamInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    // save to localStorage
    saveSearchHistory(teamInput.value);
    // your code to Run
    location.href = "./team-search.html?team=" + teamInput.value;
  }
});
loadSearchHistory();
getNBABlogs();
