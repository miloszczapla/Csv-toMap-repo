import React, { useEffect, useState } from 'react';

interface Props {
  avaibleCategories: string[];
  setIsOpen: any;
  id: number;
  setPickedCategory: any;
  setAvaibleCategories: any;
  setColOrder: any;
}

const CategoryDrawer = ({
  avaibleCategories,
  setIsOpen,
  id,
  setPickedCategory,
  setColOrder,
}: Props) => {
  const handleClick = (e: any) => {
    const pickedCategory = e.target.textContent;
    setPickedCategory(pickedCategory);
    setColOrder((oldOrder: string[]) => {
      oldOrder[id] = pickedCategory;
      return [...oldOrder];
    });
  };

  return (
    <div
      onClick={() => {
        setIsOpen(false);
      }}
      className='absolute left-0 right-0 top-full  text-contrastMain flex flex-col gap-1'
    >
      {avaibleCategories.map((category) => (
        <div
          onClick={handleClick}
          key={category + id}
          className='flex justify-center py-2 items-center bg-almostBlack bg-opacity-90 capitalize'
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryDrawer;
