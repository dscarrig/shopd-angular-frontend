export class ShopdItem {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: number,
        public imageUrl: string,
        public category: string,
        public available : boolean,
        public quantity : number,
        public userId : string
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