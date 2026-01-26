export const API_URL = 'http://localhost:8081';
export const SHOPD_JPA_API_URL = 'http://localhost:8081/api';

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