import { useContext } from 'react';
import { CategoryContext } from '../helpclasses/contexts';

interface Props {
  setIsOpen: any;
  id: number;
  setPickedCategory: any;
}

const CategoryDrawer = ({ setIsOpen, id, setPickedCategory }: Props) => {
  const { avaibleCategories, setColOrder } = useContext(CategoryContext);
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
      {avaibleCategories.map((category: string) => (
        <div
          onClick={handleClick}
          key={category + id}
          className='flex justify-center py-2 items-center bg-almostBlack bg-opacity-60 rounded-sm capitalize'
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryDrawer;
