import { useState } from 'react';
import CategoryDrawer from './CategoryDrawer';

interface Props {
  id: number;
  isLast: boolean;
}

const CategoryHeader = ({ id, isLast }: Props) => {
  const defaultCategory = `Column ${id + 1}`;
  const [pickedCategory, setPickedCategory] = useState(defaultCategory);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`category-header ${
        isLast ? 'border-r-0' : 'border-r xs:border-r-2'
      }
      `}
    >
      {pickedCategory}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={`h-4 w-4 md:h-7 md:w-7 md:mx-2 margin-right-zero ${
          isOpen ? 'rotated' : ''
        } duration-100 transition`}
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M19 9l-7 7-7-7'
        />
      </svg>

      {isOpen && (
        <CategoryDrawer
          setPickedCategory={setPickedCategory}
          setIsOpen={setIsOpen}
          id={id}
        />
      )}
    </div>
  );
};

export default CategoryHeader;
