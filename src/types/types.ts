export interface FormEntry {
  name: string;
  age: number | null;
  email: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
  picture: string;
  country: string;
}

export interface FormState {
  entries: FormEntry[];
  lastAdded: FormEntry | null;
}

export interface CountriesState {
  allCountries: string[];
}

export interface IFormInput {
  name: string;
  age: number;
  email: string;
  passwords: {
    password: string;
    confirmPassword: string;
  };
  gender: string;
  termsAccepted: boolean;
  picture: FileList;
  country: string;
}
