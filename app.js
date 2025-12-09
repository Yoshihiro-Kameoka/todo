// グローバル変数
let todos = [];
let currentFilter = 'all';

// DOM要素の取得
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');
const filterBtns = document.querySelectorAll('.filter-btn');

// 初期化
init();

function init() {
    loadTodos();
    renderTodos();
    updateStats();

    // イベントリスナーの設定
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentFilter = e.target.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderTodos();
        });
    });
}

// LocalStorageからTODOを読み込み
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// LocalStorageにTODOを保存
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// TODOを追加
function addTodo() {
    const text = todoInput.value.trim();

    if (text === '') {
        alert('TODOを入力してください');
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.unshift(todo);
    todoInput.value = '';

    saveTodos();
    renderTodos();
    updateStats();
}

// TODOを削除
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
    updateStats();
}

// TODOの完了状態を切り替え
function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
        updateStats();
    }
}

// TODOを表示
function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = getFilteredTodos();

    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<div class="empty-state">📭 TODOがありません</div>';
        return;
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${escapeHtml(todo.text)}</span>
            <button class="delete-btn">削除</button>
        `;

        // チェックボックスのイベント
        const checkbox = li.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        // 削除ボタンのイベント
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });
}

// フィルタリングされたTODOを取得
function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

// 統計情報を更新
function updateStats() {
    const activeTodos = todos.filter(todo => !todo.completed).length;
    todoCount.textContent = `${activeTodos} 件の未完了タスク`;
}

// HTML エスケープ（XSS対策）
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
