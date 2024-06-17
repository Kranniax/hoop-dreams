// var todaysDate = moment().format("YYYY-MM-DD");
var todaysDate = "2024-05-19";

function getNowPlaying() {
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
      loadNowPlaying(data);
      // console.log(data);
    });
  });
}

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
      // console.log(data);
      nbaLatestNews(data);
    });
  });
}

function loadNowPlaying(nowData) {
  if (nowData.response.length == 0) {
    document.querySelector(".now-playing-container").textContent =
      "NO GAMES SCHEDULED";
    return;
  }
  for (var i = 0; i < nowData.response.length; i++) {
    // create landing page for now playing cards.
    var card = document.createElement("div");
    card.classList.add("card", "column", "m-2");

    var cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "column");

    var cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-header-title", "is-centered");
    cardTitle.textContent =
      nowData.response[i].teams.home.name +
      " vs " +
      nowData.response[i].teams.away.name;

    // NBA Team Logos
    var cardImagecontainer = document.createElement("div");
    cardImagecontainer.className = "card-image";
    cardImagecontainer.classList.add("card-image", "columns", "is-vcentered");

    var cardHomeImage = document.createElement("img");
    cardHomeImage.classList.add("column");
    cardHomeImage.setAttribute("src", nowData.response[i].teams.home.logo);
    cardHomeImage.setAttribute("alt", "nba team image");

    var versusFont = document.createElement("span");
    versusFont.classList.add(
      "column",
      "has-text-centered",
      "is-size-1",
      "has-text-weight-bold"
    );
    versusFont.textContent = "VS";

    var cardAwayImage = document.createElement("img");
    cardAwayImage.classList.add("column");
    cardAwayImage.setAttribute("src", nowData.response[i].teams.away.logo);
    cardAwayImage.setAttribute("alt", "nba team image");

    // Now Playing Game Status and Scores
    var cardContent = document.createElement("div");
    cardContent.className = "card-content";

    // Game Status
    var gameStatus = document.createElement("p");
    gameStatus.textContent = nowData.response[i].status.long;
    gameStatus.classList.add(
      "has-text-centered",
      "has-text-weight-semibold",
      "has-text-danger"
    );
    cardContent.appendChild(gameStatus);

    // Game Scores
    var scoreContainer = document.createElement("div");
    scoreContainer.classList.add("is-flex", "is-justify-content-space-between");

    var homeScore = document.createElement("div");
    homeScore.classList.add("is-inline-block", "is-size-1");
    homeScore.textContent = nowData.response[i].scores.home.total;

    var awayScore = document.createElement("div");
    awayScore.classList.add("is-inline-block", "is-size-1");
    awayScore.textContent = nowData.response[i].scores.away.total;

    scoreContainer.appendChild(homeScore);
    scoreContainer.appendChild(awayScore);
    cardContent.appendChild(scoreContainer);

    // cardContent.appendChild(homeScore);
    // cardContent.appendChild(awayScore);

    cardHeader.appendChild(cardTitle);
    cardImagecontainer.appendChild(cardHomeImage);
    cardImagecontainer.appendChild(versusFont);
    cardImagecontainer.appendChild(cardAwayImage);
    cardImagecontainer.appendChild(cardContent);
    card.appendChild(cardHeader);
    card.appendChild(cardImagecontainer);
    card.appendChild(cardContent);

    document.querySelector(".now-playing-container").appendChild(card);
  }
}
// Latest NBA News Articles
function nbaLatestNews(newsData) {
  for (var i = 0; i < newsData.length; i++) {
    //News Card
    var articleCard = document.createElement("div");
    articleCard.classList.add("card", "column", "m-2", "is-3");
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
      newsData[i].source +
      "</a></span>";

    cardContent.appendChild(cardTitle);
    cardFooter.appendChild(cardFooterItem);
    articleCard.appendChild(cardContent);
    articleCard.appendChild(cardFooter);

    document.querySelector(".blog-container").appendChild(articleCard);
  }
}

getNowPlaying();
getNBABlogs();
