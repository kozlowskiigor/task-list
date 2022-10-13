{
    const tasks = []

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const clearInput = () => {
        const formInput = document.querySelector(".js-newTask");
    
        formInput.value = "";
        formInput.focus();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            
                <li class="list__item">
                    <button class="list__button list__button--done js-toggleDone">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class="list__item--margined ${task.done ? "list__item--done" : ""}">
                        ${task.content}
                    </span>
                    <button class="list__button list__button--remove js-remove">
                    🗑
                    </button>
                </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        clearInput();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}