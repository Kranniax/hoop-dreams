// var todaysDate = moment().format("LL");
// console.log(todaysDate);
var todaysDate = "2024-05-19";

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
    //   console.log(data);
    });
  });
};

function loadNowPlayingGames(gameData) {
  if (gameData.response.length === 0) {
    // TODO: There are no games being played.
  }

  for (var i = 0; i < gameData.response.length; i++) {
    var currentGameContainer = document.createElement("div");
    currentGameContainer.classList.add("current-game level");
    
    var cur
    
  }
}
document.querySelector("p.title").textContent = todaysDate;
getNowPlaying();
