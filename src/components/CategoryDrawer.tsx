import React, { useEffect, useState } from 'react';

interface Props {
  categories: string[];
  setIsOpen: any;
  id: number;
  isOpen: boolean;
}

const CategoryDrawer = ({ categories, setIsOpen, id, isOpen }: Props) => {
  console.log('draver', categories);

  const handleClick = (e: any) => {
    // console.log('click', click);

    console.log(e.target.textContent);
  };

  return (
    <div
      onClick={() => {
        setIsOpen(false);
        console.log('czy zamkniete', isOpen);
      }}
      className='absolute left-0 right-0 top-full  text-contrastMain flex flex-col gap-1'
    >
      {categories.map((category) => (
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
