export interface IAddress {
  id: string;
  zipCode: string;
  typeResidence: string;
  neighborhood: string;
  number: string;
  typePublicPlace: string;
  publicPlace: string;
  street: string;
  city: string;
  state: string;
  country: string;
  observation?: string;
  delivery: boolean;
  charge: boolean;
  identifier: string;
  identifierDelivery: string;
}
