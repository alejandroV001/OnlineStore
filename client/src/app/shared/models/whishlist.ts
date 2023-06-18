import { v4 as uuidv4 } from 'uuid';

export interface IWhishlistItem {
    id: number;
    name: string;
    price: number;
    discountedPrice: number;
    pictureUrl: string;
    brand: string;
    type: string;
}


export interface IWhishlist {
    id: string;
    items: IWhishlistItem[];
}

export class Whishlist implements IWhishlist {
    id = uuidv4();
    items: IWhishlistItem[] = [];
}
