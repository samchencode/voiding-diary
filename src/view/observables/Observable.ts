type Subscriber = () => void;

class Observable {
  private subscribers: Subscriber[] = [];

  subscribe(s: Subscriber) {
    this.subscribers.push(s);
  }

  notifySubscribers() {
    this.subscribers.forEach((s) => s());
  }
}

export { Observable };
