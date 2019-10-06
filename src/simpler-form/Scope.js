export default class Scope {
  constructor(name, list) {
    this.name = name;
    this.value = list ? [] : {};
    this.errors = list ? [] : {};
  }

  registerChildScope(name, value = {}) {
    if (!this.value[name]) {
      this.value[name] = value;
      this.errors[name] = null;
    }
  }

  registerField(name, value) {
    this.value[name] = value;
  }
}
