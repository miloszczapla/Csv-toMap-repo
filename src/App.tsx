import { useState } from 'react';
import CsvTable from './components/CsvTable';
import ErrorMessage from './components/ErrorMessage';
import Nap from './components/Nap';
import UploadBlock from './components/UploadBlock';
import { Errors, SortedData, SortedDataArray } from './helpclasses/types';

function App() {
  const [errors, setErrors] = useState<Errors | null>(null);
  const [csvData, setCsvData] = useState<[] | null>([]);
  const [sortedData, setSortedData] = useState<SortedData[] | null>(null);

  return (
    <div className='flex flex-col items-center '>
      <UploadBlock setErrors={setErrors} setCsvData={setCsvData} />
      {csvData && <CsvTable csvData={csvData} />}
      {sortedData && <Nap sortedData={sortedData} />}

      <ErrorMessage errors={errors} />
    </div>
  );
}

export default App;
