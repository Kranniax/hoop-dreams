var todaysDate = moment().format("YYYY-MM-DD");

function init() {
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

function loadNowPlaying(nowData) {
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

    // Now Playing Game Statuses and Scores
    var cardContent = document.createElement("div");
    cardContent.className = "card-content";

    var gameStatus = document.createElement("p");
    gameStatus.textContent = nowData.response[i].status.long;

    cardContent.textContent =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate minima ducimus autem laboriosam iusto illo dolorum,maiores ullam voluptatem nihil fugiat odio nobis neque liberotempore reprehenderit explicabo pariatur veniam.";

    cardHeader.appendChild(cardTitle);
    cardImagecontainer.appendChild(cardHomeImage);
    cardImagecontainer.appendChild(versusFont);
    cardImagecontainer.appendChild(cardAwayImage);
    card.appendChild(cardHeader);
    card.appendChild(cardImagecontainer);
    card.appendChild(cardContent);
    
    document.querySelector(".now-playing-container").appendChild(card);
  }
}

init();
