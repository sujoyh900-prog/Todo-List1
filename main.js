const input = document.querySelector("#taskInput");
const btn = document.querySelector("#addBtn");
const output = document.querySelector(".output");

const todo = [];

// Validate input
function check(val, arr, excludeIndex = -1) {
    if (!val.trim()) return false;

    // Prevent duplicates except for the same item being edited
    if (arr.some((item, i) => item.title === val && i !== excludeIndex)) {
        alert("Task already exists!");
        return false;
    }
    return true;
}

// Delete task
function delTask(index) {
    todo.splice(index, 1);
    display();
}

// Enable edit mode
function editTask(index) {
    const li = output.children[index];
    const item = todo[index];

    // Replace span with input
    li.innerHTML = `
        <input type="text" class="editInput" value="${item.title}">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
    `;

    const editInput = li.querySelector(".editInput");
    const saveBtn = li.querySelector(".saveBtn");
    const cancelBtn = li.querySelector(".cancelBtn");

    editInput.focus();

    // Save edited task
    saveBtn.addEventListener("click", () => {
        const newVal = editInput.value;

        if (check(newVal, todo, index)) {
            todo[index].title = newVal;
            display();
        }
    });

    // Cancel editing
    cancelBtn.addEventListener("click", () => {
        display();
    });
}

// Display tasks
function display() {
    output.innerHTML = "";

    todo.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.title}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="delTask(${index})">Delete</button>
        `;

        output.appendChild(li);
    });
}

// Add task
btn.addEventListener("click", () => {
    const val = input.value;

    if (check(val, todo)) {
        todo.push({ title: val });
        input.value = "";
        display();
    }
});

