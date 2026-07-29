export interface Address {
   street: string;
   houseNumber: string;
   apartmentNumber?: string;
   postalCode: string;
   city: string;
   country: string;
}

export interface Customer {
   id: number;
   firstName: string;
   lastName: string;
   email: string;
   phone: string;
   address: Address;
   createdAt: string;
}
