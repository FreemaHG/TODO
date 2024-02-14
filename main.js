(function() {
    // Создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');  // Создаем DOM-элемент h2
        appTitle.innerHTML = title;  // Присваиваем содержимое переданное в функцию значение
        return appTitle;  // Возвращаем новый DOM-элемент с нужным содержимым
    }

    // Создаем и возвращаем форму для создания дела
    function createTodoItemForm() {
        // Создаем DOM-элементы
        let form = document.createElement('form');  // Создаем элемент формы
        let input = document.createElement('input');  // Создаем поле для ввода
        let buttonWrapper = document.createElement('div');  // Создаем обертку для правильного оформления bootstrap-кнопки
        let button = document.createElement('button');  // Создаем кнопку

        // Присваиваем стили и содержимое
        form.classList.add('input-group', 'mb-3');  // Добавляем bootstrap-стили (input-group - стилизация формы, mb-3 - отступ снизу)
        input.classList.add('form-control');  // Стилизуем поле ввода
        input.placeholder = 'Введите название нового дела';  // Устанави=ливаем подсказку для инпута
        buttonWrapper.classList.add('input-group-append');  // Отступ для обертки кнопки
        button.classList.add('btn', 'btn-primary');  // Задаем стили для кнопки
        button.textContent = 'Добавить дело';  // Текст внутри кнопки

        // Вкладываем DOM-элементы друг в друга
        buttonWrapper.append(button);  // Вкладываем кнопку в обертку
        form.append(input);  // Вкладываем поле ввода в форму
        form.append(buttonWrapper);  // Вкладываем в форму обутрку с кнопкой

        // Возвращаем все элементы, а не только форму, чтобы иметь ко всем доступ после
        return {
            form,
            input,
            button,
        };
    }

    // Создаем и возвращаем список элементов
    function createTodoList() {
        let list = document.createElement('ul');  // Создаем элемент ul
        list.classList.add('list-group');  // Присваиваем ему стиль
        return list;  // Возвращаем элемент
    }

    // Создаем и возвращем новый элемент (название дела указывает пользователь, передаем его в фукнкцию)
    function createTodoItem(name) {
        let item = document.createElement('li');  // Создаем элемент для последюущего вложения в список
        // Кнопки помещаем в элемент, который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');  // Кнопка для завершения дела
        let deleteButton = document.createElement('button');  // Кнопка для удаления дела

        // Стили для элемента списка и размещения кнопок справа при помощи flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
        // ВАЖНО: используем textContent, а не innerHTML, чтобы не выводить спец.символы, введенные с названием дела
        item.textContent = name;  // Задаем введенное пользователем название

        // Стили для кнопок завершения и удаления дел
        buttonGroup.classList.add('btn-group', 'btn-group-sm');  // Стили для группы кнопок
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';  // Задаем текст кнопки
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        // Вкладываем кнопки в отдельный элемент для объединения в один блок
        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        // Возвращаем элемент и кнопки для обеспечения доступа к ним, чтобы события корреткно отрабатывали
        return {
            item,
            doneButton,
            deleteButton,
        };
    }

    // Регистрируем обработчик событий при формировании DOM-дерева, выполнится функция, которая вызовет все описанные выше функции
    document.addEventListener('DOMContentLoaded', function() {
        let container = document.getElementById('todo-app');  // Получаем главный контейнер из DOM-дерева (созданный в HTML)

        // Вызываем ранее созданные функции, сохраняем объекты в переменные
        let todoAppTitle = createAppTitle('Список дел');
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        // Пристваиваем их результат главному контейнеру
        container.append(todoAppTitle);
        container.append(todoItemForm.form);  // Т.к. возвращаем объект, то через точку обращаемся конкретно к форме
        container.append(todoList);

        // Браузер создает событие submit на форме по нажатию Enter или по кнопке создания дела
        todoItemForm.form.addEventListener('submit', function(e) {
            // Предотвращаем стандартное действие браузера по перезагрузке страницы при отправке формы
            e.preventDefault();

            // Игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem = createTodoItem(todoItemForm.input.value);

            // Добавляем обработчики на кнопки
            // Для кнопки завершения дела
            todoItem.doneButton.addEventListener('click', function() {
                // Навешиваем стиль - делаем задачу зеленой или наоборот убираем зеленый цвет с задачи
                todoItem.item.classList.toggle('list-group-item-success');
            });
            // Для кнопки удаления дела
            todoItem.deleteButton.addEventListener('click', function() {
                // Спрашиваем подтверждение (функция confirm вернет True, если пользователь введет "Да" в диалоговом окне браузера)
                if (confirm('Вы уверены?')) {
                    // Удаляем дело из списка
                    todoItem.item.remove();
                }
            });

            // Создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            // Обнуляем значение в поле, чтобы не пришлось стирать внучную
            todoItemForm.input.value = '';

        });

    });

})();