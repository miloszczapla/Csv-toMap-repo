import { useEffect, useContext } from 'react';
import { CategoryContext } from '../helpclasses/contexts';
import handleErrors from '../helpclasses/handleErrors';
import CategoryHeader from './CategoryHeader';
import ListOfElements from './ListOfElements';

interface Props {
  csvData: any[] | null;
  setErrors: any;
}

const CsvTable = ({ csvData, setErrors }: Props) => {
  const { avaibleCategories, colOrder, setColOrder } =
    useContext(CategoryContext);

  //making sure that every header is chose only once
  useEffect(() => {
    const colSet = new Set();
    const withoutDuplicate = colOrder.map((header: string) => {
      if (header) {
        const duplicate = colSet.has(header);
        colSet.add(header);

        if (!duplicate) {
          return header;
        } else return 'duplicate';
      }
    });

    const errMessage = 'headers have duplicates';

    if (withoutDuplicate.includes('duplicate') && withoutDuplicate.length > 0) {
      handleErrors(errMessage, setErrors);
    } else {
      handleErrors(errMessage, setErrors, true);
    }
  }, [colOrder]);

  return (
    <div className='flex gap-0 relative '>
      {avaibleCategories.map((_: any, id: number) => (
        <div
          className='flex flex-col xs:w-18  sm:w-28 md:w-36 lg:w-44 '
          key={id}
        >
          <CategoryHeader
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
