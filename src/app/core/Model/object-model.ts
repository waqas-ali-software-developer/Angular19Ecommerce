export class User{
    name!: string;
    password!: string;
    uploadPhoto!: string;
    role!:string;
    mobNumber!:string;
    address!: Address;
    gender!: string;
    language!:string;
    email!:string;
    dob!:string;
    agreetc!: boolean;
    age!:number;
    aboutYou!: string;
}

export class Address {
 id!: number;
 addLine1!: string;
 addLine2!: string;
 city!: string;
 state!: string;
 zipCode!: number;
}

export class Product 
{
    id!:number;
    name!:string;
    uploadPhoto!: string;
    productDesc!: string;
    mrp!: number;
    discoutPrice!:number;
    status!: boolean;
}

export class Order 
{
    id!:number;
    userId!: number;
    sellerId!: number;
    product!: Product;
    deliveryAddres!: Address;
    contactNum!: number;
    dateTime!: string;
}