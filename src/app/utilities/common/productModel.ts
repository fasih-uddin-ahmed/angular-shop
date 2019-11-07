export class ProductModel {
    id: any;
    name: any;
    description: any;
    imgs: any;
    video: any;
    colour: any;
    rating: any;
    productType: any;
    price = {
        value: '',
        ISO: '',
        currency: '',
        message: ''
    };
    stock = {
        status: Boolean,
        message: ''
    };
}