document.addEventListener("DOMContentLoaded", () => {
    const shoppingList = document.getElementById("shopping-list");
    const newItemInput = document.getElementById("new-item");
    const addButton = document.getElementById("add-button");
    const clearButton = document.getElementById("clear-button");
    const messageDiv = document.getElementById("message");

    const storedItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];

    storedItems.forEach(item => {
        const li = createListItem(item);
        shoppingList.appendChild(li);
    });

    addButton.addEventListener("click", addItem);
    clearButton.addEventListener("click", clearList);

    function createListItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
    }

    function addItem() {
        const newItem = newItemInput.value;
        if (newItem !== "") {
            if (storedItems.length < 10) {
                storedItems.push(newItem);
                localStorage.setItem("shoppingItems", JSON.stringify(storedItems));
                const li = createListItem(newItem);
                shoppingList.appendChild(li);
                newItemInput.value = "";
                messageDiv.textContent = "";
            } else {
                messageDiv.textContent = "רשימת הקניות מלאה, אי אפשר להוסיף עוד פריטים.";
            }
        }
    }

    function clearList() {
        while (shoppingList.firstChild) {
            shoppingList.removeChild(shoppingList.firstChild);
        }
        localStorage.removeItem("shoppingItems");
        storedItems.length = 0;
        messageDiv.textContent = "";
    }
});
