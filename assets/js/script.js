var date = 

function init() {
  var url =
    "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=2023-2024&league=12&date=2024-04-02";

  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6127f14de5msh612ece9ab1405a8p1e0f35jsnd4ba0173c7d7",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
    },
  }).then(function (response) {
    response.json().then(function (data) {
      loadNowPlaying(data);
    });
  });
}

function loadNowPlaying(nowData) {
  for (var i = 0; i < nowData.response.length; i++) {
    // create landing page for now playing cards.
    var card = document.createElement("div");
    card.classList.add("card", "column", "m-2");

    var cardHeader = document.createElement("div");
    cardHeader.className = "card-header";

    var cardTitle = document.createElement("h3");
    cardTitle.className = "card-title";
    cardTitle.textContent =
      nowData.response[i].teams.home.name +
      " vs " +
      nowData.response[i].teams.away.name;

    var cardImagecontainer = document.createElement("div");
    cardImagecontainer.className = "card-image";
    var cardImage = document.createElement("img");
    cardImage.setAttribute("src", "https://placehold.co/200x200");
    cardImage.setAttribute("alt", "placeholder image");

    var cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardContent.textContent =
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate minima ducimus autem laboriosam iusto illo dolorum,maiores ullam voluptatem nihil fugiat odio nobis neque liberotempore reprehenderit explicabo pariatur veniam.";

    cardHeader.appendChild(cardTitle);
    cardImagecontainer.appendChild(cardImage);
    card.appendChild(cardHeader);
    card.appendChild(cardImagecontainer);
    card.appendChild(cardContent);
    document.querySelector(".now-playing-container").appendChild(card);
  }
}

init();
