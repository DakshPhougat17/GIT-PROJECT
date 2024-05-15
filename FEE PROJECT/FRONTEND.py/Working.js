const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector(".buttons button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;
function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random")
        .then((response) => response.json())
        .then((result) => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}
speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(
            `${quoteText.innerText} by ${authorName.innerText}`
        );
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking
                ? speechBtn.classList.remove("active")
                : speechBtn.classList.add("active");
        }, 10);
    }
});
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});
twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});
quoteBtn.addEventListener("click", randomQuote);
function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "flex";
}
function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}
function submitLogin() {
    alert('Login successful!');
    closeLoginPopup();
    document.getElementById("profileIcon").style.display = "block";
    document.querySelector(".btnLogin-popup").style.display = "none";
    document.querySelector(".btnProfile-popup").style.display = "flex";
}
function openProfilePage() {
    window.location.href = "index.html";
}
function closeProfilePopup() {
    document.getElementById("profilePopup").style.display = "none";
}
function saveProfile() {
    var profileUsername = document.getElementById("profileUsername").value;
    var profileEmail = document.getElementById("profileEmail").value;
    localStorage.setItem("username", profileUsername);
    localStorage.setItem("email", profileEmail);
    closeProfilePopup();
    document.getElementById("profileIcon").style.display = "block";
}
function checkLoggedIn() {
    var username = localStorage.getItem("username");
    if (username) {
        document.getElementById("profileIcon").style.display = "block";
    }
}
document.addEventListener('DOMContentLoaded', function () {
    checkLoggedIn();
});
function submitLogin() {
    alert('Login successful!');
    closeLoginPopup();
    document.getElementById("profileIcon").style.display = "block";
    document.querySelector(".btnLogin-popup").style.display = "none";
    document.querySelector(".btnProfile-popup").style.display = "flex";
}
function openSignupPopup() {
    closeLoginPopup();
    document.getElementById("signupPopup").style.display = "flex";
}
function closeSignupPopup() {
    document.getElementById("signupPopup").style.display = "none";
}
function openForgotPasswordPopup() {
    closeLoginPopup();
    document.getElementById("forgotPasswordPopup").style.display = "flex";
}
function closeForgotPasswordPopup() {
    document.getElementById("forgotPasswordPopup").style.display = "none";
}
function resetPassword() {
    alert('Your password has been reset');
}

function randomQuote(category = "all") {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    let apiUrl = category === "all" ? "http://api.quotable.io/random" : `http://api.quotable.io/random?category=${category}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}

function filterQuotesByCategory(category) {
    randomQuote(category);
}
function filterQuotesByAuthor(author) {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    let apiUrl = author === "all" ? "http://api.quotable.io/random" : `http://api.quotable.io/random?author=${author}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}

function toggleFilterOptions() {
    const filterOptions = document.getElementById("filterOptions");
    filterOptions.classList.toggle("active");
}
function randomQuote(category = "all", author = "all") {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    let apiUrl = "http://api.quotable.io/random";

    // Append category parameter to API URL
    if (category !== "all") {
        apiUrl += `?category=${category}`;
    }

    // Append author parameter to API URL
    if (author !== "all") {
        apiUrl += category === "all" ? "?" : "&";
        apiUrl += `author=${author}`;
    }

    fetch(apiUrl)
        .then((response) => response.json())
        .then((result) => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}

// Function to handle category change
function filterQuotesByCategory(category) {
    randomQuote(category, document.getElementById("author").value);
}

// Function to handle author change
function filterQuotesByAuthor(author) {
    randomQuote(document.getElementById("category").value, author);
}
