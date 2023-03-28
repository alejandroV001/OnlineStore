import { PhotoPicture } from "./photoPicture";

export interface IProduct {
    id: number;
    description: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    productName: string;
    productType: string;
    productBrand: string;
    productSize: string;
    productFit: string;
    productColor: string;
    productGender: string;
    pictures: PhotoPicture[];
}
