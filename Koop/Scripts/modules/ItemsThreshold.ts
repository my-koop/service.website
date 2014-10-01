
export class Head {
  constructor(public title: string, public key: string) { }
}

export class Item {
  public static get ITEMS_HEADER(): Head[] {
    return [
      new Head("Item Name", "name"),
      new Head("Item Code", "code"),
      new Head("Quantity", "quantity"),
    ];
  }
  public quantity: string;
  constructor(public name: string, public code: string, quantity: number, threshold: number) {
    this.quantity = quantity + "/" + threshold;
  }
}