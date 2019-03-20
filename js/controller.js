class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    view.on('add', this.addTodo.bind(this));
    view.on('remove', this.removeTodo.bind(this));
    view.on('toggle', this.toggleTodo.bind(this));
    view.on('edit', this.editTodo.bind(this));
  }

  addTodo(title) {
    const item = this.model.addItem({
      id: Date.now(),
      title,
      completed: false
    });

    this.view.addItem(item);
  }

  removeTodo(id) {
    this.model.removeItem(id);
    this.view.removeItem(id);
  }

  toggleTodo({ id, completed }) {
    const item = this.model.updateItem(id, { completed });
    this.view.toggleItem(item);
  }

  editTodo({ id, title }) {
    const item = this.model.updateItem(id, { title });

    this.view.editItem(item);
  }

}

export default Controller;