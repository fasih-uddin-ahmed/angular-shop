export class userModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    imgUrl: string;
    cart = {
        items: [],
        totalAmount: 0,
        totalQuantity: 0
    };
}