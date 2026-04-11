export class ShopdItem {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public imageUrl: string,
    public category: string,
    public available: boolean,
    public quantity: number,
    public userId: string
  ) { }
}

export class AccountDetailItem {
  constructor(
    public id: string,
    public fullName: string,
    public street: string,
    public streetLine2: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public country: string,
    public user: string,
    public isDefault: boolean
  ) { }
}

export class OrderItem {
  constructor(
    public id: string,
    public name: string,
    public itemId: string,
    public price: number,
    public quantity: number,
    public status: string,
    public createdAt: string
  ) { }
}

export class Order {
  constructor(
    public orderId: string,
    public userId: string,
    public items: OrderItem[],
    public totalAmount: number,
    public status: string,
    public createdAt: string
  ) { }

}