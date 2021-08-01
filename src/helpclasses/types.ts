export interface Errors {
  messages: string[];
}

export interface SortedDataArray {
  data: SortedData[];
}

export interface SortedData {
  city: number;
  state: number;
  zip: number;
  address: number;
  category: number;
}

export interface IterableObject {
  [name: string]: any;
}
