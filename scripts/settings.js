// ------------------- THEME (Light / Dark) -------------------
const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// ------------------- RESET ALL DATA -------------------
document.getElementById("resetBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all expense data?")) {
        localStorage.clear();
        alert("All data cleared!");
        location.reload();
    }
});

// ------------------- CATEGORY MANAGEMENT -------------------
let defaultCategories = ["Food", "Travel", "Shopping", "Bills", "Others"];
let customCategories = JSON.parse(localStorage.getItem("categories")) || [];

const list = document.getElementById("categoryList");
const newCategoryInput = document.getElementById("newCategory");

// Render category list
function loadCategories() {
    list.innerHTML = "";

    let allCats = [...defaultCategories, ...customCategories];

    allCats.forEach(cat => {
        let li = document.createElement("li");
        li.textContent = cat;

        // Delete only for custom categories
        if (!defaultCategories.includes(cat)) {
            let btn = document.createElement("button");
            btn.textContent = "Delete";
            btn.classList.add("deleteCat");
            btn.onclick = () => deleteCategory(cat);
            li.appendChild(btn);
        }

        list.appendChild(li);
    });
}

loadCategories();

// Add category
document.getElementById("addCategory").addEventListener("click", () => {
    let newCat = newCategoryInput.value.trim();

    if (newCat === "") return alert("Category name cannot be empty");
    if (defaultCategories.includes(newCat) || customCategories.includes(newCat))
        return alert("Category already exists");

    customCategories.push(newCat);
    localStorage.setItem("categories", JSON.stringify(customCategories));

    newCategoryInput.value = "";
    loadCategories();
});

// Delete category
function deleteCategory(cat) {
    customCategories = customCategories.filter(c => c !== cat);
    localStorage.setItem("categories", JSON.stringify(customCategories));

    loadCategories();
}
