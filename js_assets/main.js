// Initialise the image lightbox only when the library and gallery exist
if (
    typeof GLightbox !== "undefined" &&
    document.querySelector(".glightbox")
) {
    GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        closeButton: true,
        closeOnOutsideClick: true
    });
}

// FAQ accordion
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
question.addEventListener("click", function () {

    const answer = question.nextElementSibling;

    // Check whether this answer is currently open
    const isExpanded = question.getAttribute("aria-expanded") === "true";

    // Toggle the answer's visibility
    answer.hidden = isExpanded;

    // Update the accessibility state
    question.setAttribute("aria-expanded", String(!isExpanded));

    });

});

// Dynamic homepage stories

const stories = [
    {
        category: "Football",
        title: "A New Generation Rising in South African Football",
        description: "Discover the emerging talent looking to make their mark in South African football.",
        link: "sports.html"
    },
    {
        category: "Rugby",
        title: "The Next Chapter in South African Rugby",
        description: "Explore the next generation of rugby players and their ambitions.",
        link: "sports.html"
    },
    {
        category: "Cricket",
        title: "South Africa's Emerging Cricket Stars",
        description: "Meet the young players beginning to establish themselves on the cricketing stage.",
        link: "sports.html"
    },
    {
        category: "Basketball",
        title: "A New Era for South African Basketball",
        description: "Discover the growth and potential of basketball in South Africa.",
        link: "sports.html"
    }
];

// Find the container in index.html
const storiesContainer = document.getElementById("dynamicStories");

// Generate the story cards
if (storiesContainer) {

    stories.forEach(function (story) {

        // Create a new article element
        const card = document.createElement("article");

        // Apply the card's CSS class
        card.classList.add("dynamic-story-card");

        // Insert the story information
        card.innerHTML = `
            <p class="story-category">${story.category}</p>

            <h3>${story.title}</h3>

            <p>${story.description}</p>

            <a href="${story.link}">Read More &rarr;</a>
        `;

        // Add the completed card to the page
        storiesContainer.appendChild(card);

    });

}

// Interactive Analysis Tabs
const analysisTabs = document.querySelectorAll(".analysis-tab");
const analysisCards = document.querySelectorAll(".analysis-card");

analysisTabs.forEach(function (tab) {
tab.addEventListener("click", function () {


    const selectedFilter = tab.dataset.filter;

    // Update the active tab
    analysisTabs.forEach(function (button) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-pressed", "true");

    // Show only articles matching the selected category
    analysisCards.forEach(function (card) {
        if (
            selectedFilter === "all" ||
            card.dataset.sport === selectedFilter
        ) {
            card.hidden = false;
        } else {
            card.hidden = true;
        }
    });

});

});

// Sports Page Search and Category Filter

const sportSearch = document.getElementById("sportSearch");
const sportFilter = document.getElementById("sportFilter");
const sportSections = document.querySelectorAll(".sport-section");
const searchMessage = document.getElementById("searchMessage");

// Function to search and filter sports
function filterSports() {

    const searchTerm = sportSearch.value.toLowerCase().trim();
    const selectedSport = sportFilter.value;

    let visibleSports = 0;

    sportSections.forEach(function (sport) {

        const sportName = sport.dataset.sport;

        const sportText = sport.textContent.toLowerCase();

        const matchesSearch = sportText.includes(searchTerm);

        const matchesCategory =
            selectedSport === "all" || sportName === selectedSport;

        if (matchesSearch && matchesCategory) {
            sport.hidden = false;
            visibleSports++;
        } else {
            sport.hidden = true;
        }

    });

    // Display a message based on the search results
    if (visibleSports === 0) {
        searchMessage.textContent = "No sports found. Try another search.";
    } else {
        searchMessage.textContent =
            visibleSports + " sport(s) found.";
    }

}

// Run the function when the user types or changes category
if (sportSearch && sportFilter) {

    sportSearch.addEventListener("input", filterSports);

    sportFilter.addEventListener("change", filterSports);

}