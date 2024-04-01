function init() {
  var url =
    "https://api-basketball.p.rapidapi.com/games?timezone=America%2FNew_York&season=2023-2024&league=12&date=2024-04-01";

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

function loadNowPlaying (nowData){
    for (var i =0; i < nowData.response.length; i++){
        var nowPlayingCard = document.createElement("div");
        nowPlayingCard.classList.add("card", "column","m-2");

        var 

        nowData.response[i].teams.away.name
    }
   
};

init();
