
const searchInput = document.getElementById("toolSearch");
const filters = document.querySelectorAll(".tool-filter");
const cards = document.querySelectorAll(".tool-card");
const countLabel = document.getElementById("toolsCount");
const emptyState = document.getElementById("toolsEmpty");
const resetButton = document.getElementById("resetTools");

let selectedCategory = "all";

function updateTools() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
        const category = card.dataset.category;
        const searchableText =
            `${card.dataset.search} ${card.innerText}`.toLowerCase();

        const categoryMatches =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatches = searchableText.includes(query);
        const visible = categoryMatches && searchMatches;

        card.hidden = !visible;

        if (visible) visibleCount++;
    });

    countLabel.textContent =
        `${visibleCount} ${visibleCount === 1 ? "tool" : "tools"}`;

    emptyState.hidden = visibleCount !== 0;
}

filters.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        filters.forEach((filter) => {
            const active = filter === button;
            filter.classList.toggle("active", active);
            filter.setAttribute("aria-pressed", String(active));
        });

        updateTools();
    });

    button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
    );
});

searchInput.addEventListener("input", updateTools);

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    selectedCategory = "all";

    filters.forEach((filter) => {
        const active = filter.dataset.category === "all";
        filter.classList.toggle("active", active);
        filter.setAttribute("aria-pressed", String(active));
    });

    updateTools();
});

document.querySelectorAll(".coming-soon").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        link.textContent = "Coming soon!";
    });
});

updateTools();
