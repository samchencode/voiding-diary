type Subscriber = () => void;

class RecordsStaleObservable {
  subscribers: Subscriber[] = [];

  subscribe(s: Subscriber) {
    this.subscribers.push(s);
  }

  notifyAll() {
    this.subscribers.forEach((s) => s());
  }

  static singleton: RecordsStaleObservable;

  static getInstance() {
    if (!this.singleton) this.singleton = new RecordsStaleObservable();
    return this.singleton;
  }

  static notifyAll() {
    return this.getInstance().notifyAll();
  }

  static subscribe(s: Subscriber) {
    return this.getInstance().subscribe(s);
  }
}

export { RecordsStaleObservable };
