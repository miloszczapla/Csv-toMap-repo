import { useEffect, useMemo, useState } from 'react';
import CsvTable from './components/CsvTable';
import ErrorMessage from './components/ErrorMessage';
import Nap from './components/Nap';
import UploadBlock from './components/UploadBlock';
import { CategoryContext } from './helpclasses/contexts';
import { Errors, IterableObject, SortedData } from './helpclasses/types';
import handleErrors from './helpclasses/handleErrors';

function App() {
  const [errors, setErrors] = useState<Errors>({ messages: [] });
  const [csvData, setCsvData] = useState<any[]>([]);
  const [colOrder, setColOrder] = useState<string[]>([]);
  const [isNapToRender, setIsNapToRender] = useState(false);
  const [sortedData, setSortedData] = useState<SortedData>({
    city: -1,
    state: -1,
    zip: -1,
    address: -1,
    category: -1,
  });
  const avaibleCategories = useMemo(
    () => ['address', 'zip', 'city', 'state', 'category'],
    []
  );

  useEffect(() => {
    //file data validation
    csvData.forEach((row) => {
      const avaibleCategoriesLenght = avaibleCategories.length;
      const errMessage = `every row schould have  ${avaibleCategoriesLenght} columns maximum`;
      if (row.length > avaibleCategoriesLenght) {
        handleErrors(errMessage, setErrors);
      } else {
        handleErrors(errMessage, setErrors, true);
      }
    });
    const errMessage = 'file schould contain no more than 20 rows';

    if (csvData.length > 20) {
      handleErrors(errMessage, setErrors);
    } else {
      handleErrors(errMessage, setErrors, true);
    }
  }, [csvData]);

  useEffect(() => {
    //@ts-ignore
    setSortedData(() => {
      const sorted: IterableObject = {};
      avaibleCategories.forEach((category) => {
        sorted[category] = colOrder.indexOf(category);
      });

      return sorted;
    });
  }, [colOrder, avaibleCategories]);

  useEffect(() => {
    let isSorted = true;

    //checking if therer is any unchosen field
    Object.entries(sortedData).forEach((value) => {
      if (value[1] === -1) {
        isSorted = false;
      }
    });

    //render Nap when requirements are fulfilled
    if (isSorted && csvData.length > 0 && errors.messages.length === 0) {
      setIsNapToRender(true);
    } else {
      setIsNapToRender(false);
    }
  }, [colOrder, sortedData, errors]);

  return (
    <div className='flex flex-col items-center  font-Roboto'>
      <UploadBlock setErrors={setErrors} setCsvData={setCsvData} />
      <CategoryContext.Provider
        value={{ avaibleCategories, colOrder, setColOrder }}
      >
        {csvData && <CsvTable setErrors={setErrors} csvData={csvData} />}

        {isNapToRender && <Nap sortedData={sortedData} csvData={csvData} />}
      </CategoryContext.Provider>
      <ErrorMessage errors={errors} />
    </div>
  );
}

export default App;
