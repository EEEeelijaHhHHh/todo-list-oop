class Model {
  constructor(items = []) {
    this.items = items;
  }

  addItem(item) {
    this.items.push(item);

    return item;
  }

  removeItem(id) {
    const index = this.items.findIndex(item => item.id === id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  updateItem(id, data) {
    const item = this.items.find(item => item.id === id);

    Object.keys(data).forEach(prop => item[prop] = data[prop]);

    return item;
  }
}

export default Model;