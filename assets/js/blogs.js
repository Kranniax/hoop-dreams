function getNBABlogs() {
  const url =
    "https://nba-latest-news.p.rapidapi.com/articles?source=nba&limit=10";
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

// Latest NBA News Articles
function nbaLatestNews(newsData) {
  for (var i = 0; i < newsData.length; i++) {
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
      newsData[i].source +
      "</a></span>";

    cardContent.appendChild(cardTitle);
    cardFooter.appendChild(cardFooterItem);
    articleCard.appendChild(cardContent);
    articleCard.appendChild(cardFooter);

    document.querySelector(".blog-cards").appendChild(articleCard);
  }
}

getNBABlogs();