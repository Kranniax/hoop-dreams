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
      console.log(data);
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
      console.log(data);
      nbaLatestNews(data);
    });
  });
}

function loadNowPlaying(nowData) {
  if (nowData.response.length == 0) {
    document.querySelector(".now-playing-container").textContent =
      "NO GAMES SCHEDULED";
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
    var homeScore = document.createElement("div");
    homeScore.textContent = nowData.response[i].scores.home.total;

    var awayScore = document.createElement("div");
    awayScore.textContent = nowData.response[i].scores.away.total;
    cardContent.appendChild(homeScore);
    cardContent.appendChild(awayScore);

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
function nbaLatestNews(newsData) {
  for (var i = 0; i < newsData.length; i++) {
    var articleLink = document.createElement("a");
    articleLink.setAttribute("href", newsData[i].url);
    articleLink.setAttribute("target", "_blank");

    var nbaArticle = document.createElement("article");
    nbaArticle.className = "column";

    var articleTitle = document.createElement("h4");
    articleTitle.innerHTML = "<strong>" + newsData[i].title + "</strong>";

    
    nbaArticle.appendChild(articleTitle);
    articleLink.appendChild(nbaArticle);
    document.querySelector(".blog-container").appendChild(articleLink);
  }
}

getNowPlaying();
getNBABlogs();
