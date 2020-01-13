"use strict"

function initialLoad() {
    let dbLocation = "./data/db.json?nocache=" + (new Date()).getTime();
    let request = new XMLHttpRequest();
    request.open("GET", dbLocation);
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
        const database = request.response;
        let entries = database.articles.length;
        if (entries > 0) {
            database.articles.sort(dateSort).reverse();
            window.database = database;
            loadArticle(database.articles[0]);
            populateArticleList(Math.min(entries, 5), database.articles);
        }
    }
}

function populateArticleList(entryCount, articles) {
    let listElement = document.getElementById("entries");
    while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }
    for (let i = 0; i < entryCount; i++) {
        let li = document.createElement("li");
        li.textContent = articles[i].title;
        li.addEventListener("click", e => {
            loadArticle(articles[i]);
        })
        listElement.append(li);
    }
}

function loadArticle(article) {
    let location = article.location;
    let request = new XMLHttpRequest();
    request.open("GET", location);
    request.responseType = "json";
    request.send();
    
    request.onload = function() {
        let database = window.database;
        const data = request.response;
        document.getElementById("title").textContent = article.title;
        document.getElementById("date").textContent = article.date;
        document.getElementById("content").innerHTML = data.text;
        document.getElementById("showmore").style.display = "";
        populateArticleList(Math.min(database.articles.length, 5), database.articles);
    }
}

function dateSort(a, b) {
    if ( a.date < b.date ){
        return -1;
    } else if ( a.date > b.date ){
        return 1;
    } else {
        return 0;
    }
}

function showMoreOnclickHandler(event) {
    let database = window.database;
    event.currentTarget.style.display = "none";
    populateArticleList(database.articles.length, database.articles);
}
