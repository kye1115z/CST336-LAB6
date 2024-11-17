// side bar
const currentUrl = window.location.pathname;

const links = document.querySelectorAll(".sidebar a");

links.forEach((link) => link.classList.remove("active"));

if (currentUrl === "/") {
  document.getElementById("home").classList.add("active");
} else if (currentUrl === "/allAuthors") {
  document.getElementById("allAuthors").classList.add("active");
} else if (currentUrl === "/addAuthor") {
  document.getElementById("addAuthor").classList.add("active");
} else if (currentUrl === "/searchQuotes") {
  document.getElementById("searchQuotes").classList.add("active");
} else if (currentUrl === "/allQuotes") {
  document.getElementById("allQuotes").classList.add("active");
} else if (currentUrl === "/newQuote") {
  document.getElementById("newQuote").classList.add("active");
}
