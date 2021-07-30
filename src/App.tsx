import CsvTable from './components/CsvTable';
import GoogleMap from './components/GoogleMap';
import UploadBlock from './components/UploadBlock';

function App() {
  return (
    <div className='flex flex-col items-center '>
      <UploadBlock />
      <CsvTable />
      <GoogleMap />
    </div>
  );
}

export default App;
