import React, { useEffect, useState } from 'react';
import handleErrors from '../helpclasses/handleErrors';
import { Errors } from '../helpclasses/types';
import CategoryHeader from './CategoryHeader';

interface Props {
  csvData: [] | null;
  setErrors: any;
}

const CsvTable = ({ csvData, setErrors }: Props) => {
  const [avaibleCategories, setAvaibleCategories] = useState([
    'city',
    'state',
    'zip',
    'address',
    'category',
  ]);

  const [colOrder, setColOrder] = useState([]);

  useEffect(() => {
    const colSet = new Set();
    const withoutDuplicate = colOrder.map((category: string) => {
      if (category) {
        const duplicate = colSet.has(category);
        colSet.add(category);

        if (!duplicate) {
          return category;
        } else return 'duplicate';
      }
    });

    const errMessage = 'headers have duplicates';

    if (withoutDuplicate.includes('duplicate') && withoutDuplicate.length > 0) {
      handleErrors(errMessage, setErrors);
    } else {
      handleErrors(errMessage, setErrors, true);
    }

    // else {
    //   setErrors((oldErrors: Errors) => {
    //     if (!oldErrors.messages.includes(errMessage)) {
    //       oldErrors.messages.slice(oldErrors.messages.indexOf(errMessage), 1);
    //       return oldErrors;
    //     }
    //   });
    // }
  }, [colOrder]);

  return (
    <div className='flex gap-0 relative '>
      {avaibleCategories.map((category, id) => (
        <div
          className='flex flex-col xs:w-18    sm:w-28 md:w-36 lg:w-44 '
          key={id}
        >
          <CategoryHeader
            avaibleCategories={avaibleCategories}
            setColOrder={setColOrder}
            setAvaibleCategories={setAvaibleCategories}
            id={id}
            isLast={avaibleCategories.length === id + 1}
          />
          {/* <ListOfElements /> */}
        </div>
      ))}
      {csvData && csvData.length > 2 && <div className='Blured'></div>}
    </div>
  );
};

export default CsvTable;
