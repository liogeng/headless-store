export interface Address {
  name: string;
  province: {code: string; name: string};
  city: {code: string; name: string};
  county: {code: string; name: string};
  street: string;
  agency?: string;
  postcode: string;
  phone: string;
  description?: string;
}
