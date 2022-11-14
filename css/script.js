//generate heading navigation list

function generateNavigationList() {
	addHomepageLinkToNavList();
	var article = document.getElementById("article");
	Array.from(article.childNodes)
		.filter(e => ["H1","H2"].includes(e.nodeName))
		.forEach(e => addElementToNavList(e));
}

function addElementToNavList(e) {
	var menu = document.getElementById("navmenu");
	var li = document.createElement("li");
	li.classList.add("ul" + e.nodeName);
	var a = document.createElement("a");
	a.textContent = shortenHeadingText(e.textContent);
	a.href = "#" + e.id;
	li.appendChild(a);
	menu.appendChild(li);
}

function addHomepageLinkToNavList() {
	var menu = document.getElementById("navmenu");
	var li = document.createElement("li");
	li.classList.add("ula");
	var a = document.createElement("a");
	a.textContent = "homepage";
	a.href = "https://eforrest8.github.io";
	li.appendChild(a);
	menu.appendChild(li);
}

function shortenHeadingText(text) {
	const MAX_LENGTH = 30;
	if (text.length > MAX_LENGTH) {
		return text.substring(0, MAX_LENGTH - 1) + "\u2026";
	}
	else {
		return text;
	}
}
