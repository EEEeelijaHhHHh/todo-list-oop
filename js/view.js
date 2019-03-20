import { createElement } from './helpers.js';
import EventEmmiter from './EventEmitter.js';

class View extends EventEmmiter {
  constructor() {
    super();
    this.form = document.querySelector('.todo-form');
    this.input = this.form.querySelector('.todo-input');
    this.button = this.form.querySelector('.todo-button');

    this.listActive = document.querySelector('.todo-list-active');
    this.listCompleted = document.querySelector('.todo-list-completed');
    this.lists = document.querySelectorAll('.todo-list');

    this.form.addEventListener('submit', this.handleAdd.bind(this));
  }

  createItem(todo) {
    const removeIcon = createElement('span', {className: 'icon icon-bin'});
    const doneIcon = createElement('span', {className: 'icon icon-done'});
    const removeButton = createElement('button', {className: 'button button-remove'}, removeIcon);
    const toggleButton = createElement('button', {className: 'button button-toggle'}, doneIcon);
    const title = createElement('span', {className: 'todo-text'}, todo.title);
    const titleRename = createElement('input', {className: 'todo-text_rename', placeholder: `${todo.title}`, hidden: 'true'});
    const item = createElement('li', {className: 'todo-item', 'data-id': todo.id}, title, titleRename, removeButton, toggleButton);

    return this.addEventListeners(item);
  }

  addEventListeners(item) {
    const removeButton = item.querySelector('.button-remove');
    const toggleButton = item.querySelector('.button-toggle');
    const title = item.querySelector('.todo-text');

    removeButton.addEventListener('click', this.handleRemove.bind(this));
    toggleButton.addEventListener('click', this.handleToggle.bind(this));
    title.addEventListener('click', this.handleEdit.bind(this));

    return item;
  }

  handleAdd(event) {
    event.preventDefault();

    if (!this.input.value) return;
    const title = this.input.value;

    this.emit('add', title);
  }

  handleRemove({ target }) {
    const item = target.parentNode.parentNode;

    this.emit('remove', Number(item.getAttribute('data-id')));
  }

  handleToggle({ currentTarget }) {
    const item = currentTarget.parentNode;
    const list = item.parentNode;
    
    const completed = list.classList.contains('todo-list-active') ? false : true;
    const id = Number(item.getAttribute('data-id'));
    
    this.emit('toggle', { id, completed });
  }

  handleEdit({ target }) {
    console.log('edit');
  }

  addItem(todo) {
    const item = this.createItem(todo);

    this.input.value = '';
    this.listActive.insertBefore(item, this.listActive.childNodes[0]);
  }

  removeItem(id) {
    // Find the todo item in all lists
    this.lists.forEach(list => {
      const item = list.querySelector(`[data-id="${id}"]`);
      // Delete the item from list, which item exist
      if (item) {
        list.removeChild(item);
      }
    });
  }

  toggleItem(todo) {
    const item = document.querySelector(`[data-id="${todo.id}"`);
    const toggleButton = item.querySelector('.button-toggle');
    
    // Checks if item is completed or not => then changes list and button
    if (todo.completed) {
      toggleButton.classList.remove('button-toggle_completed');
      this.listActive.insertBefore(item, this.listActive.childNodes[0]);
    } else {
      toggleButton.classList.add('button-toggle_completed');
      this.listCompleted.insertBefore(item, this.listCompleted.childNodes[0]);
    }
  }

  editItem(todo) {
    console.log('fired');
  }

}

export default View;