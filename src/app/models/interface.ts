export interface Owner {
  id: string;
  aFirstName: string;
  aMiddleName: string;
  aLastName: string;
  aCars: Car[];
}

export interface Car {
  aCarNumber: string;
  aCarModel: string;
  aCarBrand: string;
  aCarYear: number;
}
