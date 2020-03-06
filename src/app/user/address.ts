export interface Address {
  name: string;
  address: {
    province: { code: string; name: string };
    city: { code: string; name: string };
    county: { code: string; name: string };
    street: string;
    postcode: string;
  };
  agency?: string;
  phone: string;
  description?: string;
}
