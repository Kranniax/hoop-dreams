var teamInput = document.querySelector(".team-input");
function getNBABlogs() {
  const url =
    "https://nba-latest-news.p.rapidapi.com/articles?limit=10";
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
teamInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    // key code of the keybord key
    event.preventDefault();
    // your code to Run
    location.href = "./team-search.html?team=" + teamInput.value;
  }
});
getNBABlogs();
