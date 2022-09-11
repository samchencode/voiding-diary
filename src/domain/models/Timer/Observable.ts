type Observer = () => void;

class Observable {
  observers: Observer[] = [];

  observe(o: Observer) {
    this.observers.push(o);
  }

  notifyObservers() {
    this.observers.forEach((o) => o());
  }
}

export { Observable };
export type { Observer };
