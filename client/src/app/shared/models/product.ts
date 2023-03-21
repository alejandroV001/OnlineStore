import { PhotoPicture } from "./photoPicture";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    productType: string;
    productBrand: string;
    productSize: string;
    productFit: string;
    productColor: string;
    productGender: string;
    pictures: PhotoPicture[];
}
