import React from 'react';
import CategoryHeader from './CategoryHeader';

interface Props {
  csvData: [] | null;
}

const CsvTable = ({ csvData }: Props) => {
  const colCategories = ['city', 'state', 'zip', 'address', 'category'];

  return (
    <div className='flex gap-0 relative'>
      {colCategories.map((category, id) => (
        <div className='flex flex-col' key={id}>
          <CategoryHeader
            avaibleCategories={colCategories}
            id={id}
            isLast={colCategories.length === id + 1}
          />
          {/* <ListOfElements /> */}
        </div>
      ))}
      {csvData && csvData.length > 2 && <div className='Blured'></div>}
    </div>
  );
};

export default CsvTable;
