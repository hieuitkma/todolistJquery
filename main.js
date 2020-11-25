let userInput = $('input[type="text"]');
let btnAdd = $('#btnAdd');
let todosCompleteList;
let deleteTodoslist;
let editTodosList;

function getData() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todosCompleted = JSON.parse(localStorage.getItem('todosCompleted')) || [];
}

function setData() {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todosCompleted', JSON.stringify(todosCompleted));
}

/** check data and show or hide */
function showHideElement() {
    if (todos.length !== 0) {
        $('.todos--no-item').addClass('hide');
    } else {
        $('.todos--no-item').removeClass('hide');
    }

    if (todosCompleted.length !== 0) {
        $('.todosComplete--no-item').addClass('hide');
    } else {
        $('.todosComplete--no-item').removeClass('hide');
    }

    if (todos.length !== 0 || todosCompleted.length !== 0) {
        $('.form-delete').addClass('show');
    } else {
        $('.form-delete').removeClass('show');
    }
}

function render() {
    getData();
    setData();
    showHideElement();
    let htmlTodos = todos.map(element => {
        return `
                    <li class="todos__list--item">
                        <p class="todos__list--item__content">${element}</p>
                        <div class="todos__list--item__btn">
                            <button class="todos__list--item__btn--click todos__list--item__btn--delete">
                                <i class="fas fa-times"></i>
                            </button>
                            <button class="todos__list--item__btn--click todos__list--item__btn--done">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="todos__list--item__btn--click todos__list--item__btn--edit">
                                <i class="far fa-edit"></i>
                            </button>
                        </div>
                    </li>
                `
    }).join('')
    $('.todos__list').html(htmlTodos);

    let htmlTodosComplete = todosCompleted.map(element => {
        return `
                    <li class="todosComplete__list--item">
                        <p class="todosComplete__list--item__content">${element}</p>
                        <div class="todos__list--item__btn">
                            <button class="todos__list--item__btn--click todos__list--item__btn--delete">
                                <i class="fas fa-times"></i>
                            </button>
                            <button class="todos__list--item__btn--click todos__list--item__btn--edit">
                                <i class="far fa-edit"></i>
                            </button>
                        </div>
                    </li>
                `
    }).join('')
    $('.todosComplete__list').html(htmlTodosComplete);

    /** Update the number of buttons*/
    todosCompleteList = $('.todos__list--item__btn--done');
    deleteTodoslist = $('.todos__list--item__btn--delete');
    editTodosList = $('.todos__list--item__btn--edit');
    todosComplete();
    deleteTodo();
    editTodo();
    deleteAll();
}

render();

function addTodo() {
    btnAdd.click(function(e) {
        e.preventDefault();
        if (userInput.val() === '') {
            alert('Vui lòng nhập công việc !');
        } else {
            todos.push(userInput.val());
            setData();
            userInput.val('');
            render();
        }
    });
}

addTodo();

function todosComplete() {
    Array.from(todosCompleteList).forEach((element, index) => {
        $(element).click(function() {
            todosCompleted.push(todos[index]);
            todos.splice(index, 1);
            setData();
            render();
        })
    });
}

function deleteTodo() {
    Array.from(deleteTodoslist).forEach((element, index) => {
        $(element).click(function() {
            if (index < todos.length) {
                todos.splice(index, 1);
                setData();
            } else if (todos == 0 && todosCompleted !== 0) {
                todosCompleted.splice(index, 1);
                setData();
            } else {
                todosCompleted.splice(index - todos.length, 1);
                setData();
            }
            render();
        });
    });
}

function editTodo() {
    Array.from(editTodosList).forEach((element, index) => {
        $(element).click(function(e) {
            e.preventDefault();
            showEditBtn();
            if (index < todos.length) {
                userInput.val(todos[index]);
            } else {
                userInput.val(todosCompleted[index - todos.length]);
            }

            $('.btn--edit').click(function() {
                if (index < todos.length) {
                    todos.splice(index, 1, userInput.val());
                    setData();
                } else {
                    todosCompleted.splice(index - todos.length, 1, userInput.val());
                    setData();
                }
                render();
            })
        });
    });
}

/** show edit button and remove add button */
function showEditBtn() {
    $('.btn--add').remove();
    $('.btn--edit').show();
}

function deleteAll() {
    $('.form-delete').click(function() {
        todos = [];
        todosCompleted = []
        setData();
        location.reload('true');
    })
}