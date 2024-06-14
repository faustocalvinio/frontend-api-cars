export interface CarData {
    _id: string;
    model: string;
    type: string;
    fuelType: string;
    price: number;
    isNew?: boolean;
    stock: number;
    image: string;
    sales: number;
    __v?: number;
 }