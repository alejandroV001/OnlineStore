import { PhotoPicture } from "./photoPicture";

export interface IProduct {
    id: number;
    description: string;
    price: number;
    priceDiscounted: number;
    quantity: number;
    pictureUrl: string;
    productName: string;
    productType: string;
    productBrand: string;
    productSize: string;
    productFit: string;
    productColor: string;
    productGender: string;
    productCollection: string;

    pictures: PhotoPicture[];
}
