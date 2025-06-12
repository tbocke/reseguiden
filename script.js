document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");
    if (menuContainer) {
        fetch("menu.html")
            .then(response => response.text())
            .then(data => {
                menuContainer.innerHTML = data;
            })
            .catch(error => {
                console.error("Fel vid laddning av meny:", error);
            });
    }

    // Autocomplete + navigering
    const searchInput = document.getElementById("search-input");
    const suggestionsList = document.getElementById("suggestions");

    // Lista över sökord och motsvarande sidor
    const pages = {
        "sevärdheter": "sevardheter.html",
        "mat": "mat.html",
        "äta": "mat.html",
        "evenemang": "evenemang.html",
        "göra": "evenemang.html",
        "startsida": "index.html"
    };

    const keywords = Object.keys(pages);

    // Visa förslag
    searchInput.addEventListener("input", () => {
        const input = searchInput.value.toLowerCase().trim();
        suggestionsList.innerHTML = "";

        if (input.length === 0) return;

        const matches = keywords.filter(word => word.includes(input));
        matches.forEach(match => {
            const li = document.createElement("li");
            li.textContent = match;
            li.addEventListener("click", () => {
                searchInput.value = match;
                suggestionsList.innerHTML = "";
                window.location.href = pages[match];
            });
            suggestionsList.appendChild(li);
        });
    });

    // Navigera vid inlämning
    document.querySelector(".search-box").addEventListener("submit", function (e) {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        if (pages[query]) {
            window.location.href = pages[query];
        } else {
            alert("Sidan hittades inte. Försök med t.ex. 'sevärdheter', 'boende', 'mat' eller 'aktiviteter'.");
        }
        suggestionsList.innerHTML = "";
    });

    // Stäng förslag när man klickar utanför
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".search-box")) {
            suggestionsList.innerHTML = "";
        }
    });
});