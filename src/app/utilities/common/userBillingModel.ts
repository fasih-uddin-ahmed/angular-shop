export class userBillingModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    country: string;
    state: string;
    zipCode: number;
    sameShippingAddress: true;
    saveInfo: false;
    payment: true;
    nameOnCard: string;
    creditCardNumber: number;
    expiration: string;
    cvv: string;
}