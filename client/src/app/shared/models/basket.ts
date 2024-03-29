import { v4 as uuidv4 } from 'uuid';
   
   export interface IBasketItem {
        id: number;
        name: string;
        price: number;
        discountedPrice: number;
        quantity: number;
        pictureUrl: string;
        brand: string;
        type: string;
        size: string;
        color: string;
    }

    export interface IBasket {
        id: string;
        items: IBasketItem[];
        clientSecret?: string;
        paymentIntentId?: string;
        deliveryMethodId?: number;
        shippingPrice?: number;
        discount?: number;
    }

export class Basket implements IBasket {
    id = uuidv4();
    items: IBasketItem[] = [];

}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
    discount: number;
}
