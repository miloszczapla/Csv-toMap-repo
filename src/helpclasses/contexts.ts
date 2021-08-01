import React from 'react';

interface CategoryContextInterface {
  avaibleCategories: any;
  colOrder: any;
  setColOrder: any;
}

export const CategoryContext = React.createContext<CategoryContextInterface>({
  avaibleCategories: null,
  colOrder: null,
  setColOrder: null,
});
