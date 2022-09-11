type Observer<Params> = (p: Params) => void;

class Observable<Params> {
  observers: Observer<Params>[] = [];

  observe(o: Observer<Params>) {
    this.observers.push(o);
  }

  notifyObservers(p: Params) {
    this.observers.forEach((o) => o(p));
  }
}

export { Observable };
export type { Observer };
