import { useEffect, useState } from 'react';
import CsvTable from './components/CsvTable';
import ErrorMessage from './components/ErrorMessage';
import Nap from './components/Nap';
import UploadBlock from './components/UploadBlock';
import { CategoryContext } from './helpclasses/contexts';
import { Errors, IterableObject, SortedData } from './helpclasses/types';

function App() {
  const [errors, setErrors] = useState<Errors>({ messages: [] });
  const [csvData, setCsvData] = useState<[]>([]);
  const [colOrder, setColOrder] = useState<string[]>([]);
  const [isNapToRender, setIsNapToRender] = useState(false);
  const [sortedData, setSortedData] = useState<SortedData>({
    city: -1,
    state: -1,
    zip: -1,
    address: -1,
    category: -1,
  });
  const avaibleCategories = ['address', 'zip', 'city', 'state', 'category'];

  useEffect(() => {
    //@ts-ignore

    setSortedData(() => {
      const sorted: IterableObject = {};
      avaibleCategories.forEach((category) => {
        sorted[category] = colOrder.indexOf(category);
      });

      return sorted;
    });
  }, [colOrder]);

  useEffect(() => {
    let isSorted = false;
    //@ts-ignore

    Object.entries(sortedData).forEach((value) => {
      if (value[1] !== -1) {
        isSorted = true;
      } else isSorted = false;
    });

    if (isSorted && csvData.length > 0 && errors.messages.length === 0) {
      setIsNapToRender(true);
    } else {
      setIsNapToRender(false);
    }
  }, [colOrder, sortedData]);

  return (
    <div className='flex flex-col items-center  font-Roboto'>
      <UploadBlock setErrors={setErrors} setCsvData={setCsvData} />
      <CategoryContext.Provider
        value={{ avaibleCategories, colOrder, setColOrder }}
      >
        {csvData && <CsvTable setErrors={setErrors} csvData={csvData} />}

        {isNapToRender && <Nap sortedData={sortedData} csvData={csvData} />}
        {/* <Nap sortedData={sortedData} csvData={csvData} /> */}
      </CategoryContext.Provider>
      <ErrorMessage errors={errors} />
    </div>
  );
}

export default App;
