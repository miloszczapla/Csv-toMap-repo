import { useEffect, useState } from 'react';
import handleErrors from '../helpclasses/handleErrors';
import CategoryHeader from './CategoryHeader';
import ListOfElements from './ListOfElements';

interface Props {
  csvData: [] | null;
  setErrors: any;
}

const CsvTable = ({ csvData, setErrors }: Props) => {
  console.log(csvData);

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
      // if (!colOrder.includes(undefined)) {
      //   setSortedData();
      // }
    }
  }, [colOrder]);

  return (
    <div className='flex gap-0 relative '>
      {avaibleCategories.map((category, id) => (
        <div
          className='flex flex-col xs:w-18  sm:w-28 md:w-36 lg:w-44 '
          key={id}
        >
          <CategoryHeader
            avaibleCategories={avaibleCategories}
            setColOrder={setColOrder}
            setAvaibleCategories={setAvaibleCategories}
            id={id}
            isLast={avaibleCategories.length === id + 1}
          />
          <ListOfElements csvData={csvData} id={id} />
        </div>
      ))}
      {csvData && csvData.length > 2 && <div className='Blured'></div>}
    </div>
  );
};

export default CsvTable;
