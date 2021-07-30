export interface Errors {
  message: string;
}

export interface SortedDataArray {
  data: SortedData[];
}

export interface SortedData {
  city: string;
  state: string;
  zip: string;
  address: string;
  category: string;
}
