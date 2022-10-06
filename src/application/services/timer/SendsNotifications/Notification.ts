type SerializedNotification = {
  id: string;
  notifyAt: number;
};

class Notification {
  private id: string;

  private notifyAt: Date;

  constructor(id: string, notifyAt: Date) {
    this.id = id;
    this.notifyAt = notifyAt;
  }

  getId() {
    return this.id;
  }

  getNotifyAt() {
    return this.notifyAt;
  }

  serialize(): SerializedNotification {
    return { id: this.id, notifyAt: this.notifyAt.getTime() };
  }

  toJson() {
    return JSON.stringify(this.serialize());
  }
}

export { Notification };
export type { SerializedNotification };
