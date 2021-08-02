import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import handleErrors from '../helpclasses/handleErrors';

interface Props {
  setCsvData: any;
  setErrors: any;
  avaibleCategories: string[];
}

const UploadBlock = ({ setErrors, setCsvData, avaibleCategories }: Props) => {
  const [Highlighted, setHighlighted] = useState(false);
  //list of files thgat are acceptable
  const csvAccepted =
    '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values';

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setHighlighted(false);

    Papa.parse(file, {
      encoding: 'utf-8',
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;

        //file data validation
        const avaibleCategoriesLenght = avaibleCategories.length;
        let errMessage = `every row schould have  ${avaibleCategoriesLenght} columns maximum`;
        data.forEach((row: any) => {
          if (row.length > avaibleCategoriesLenght) {
            handleErrors(errMessage, setErrors);
          } else {
            handleErrors(errMessage, setErrors, true);
          }
        });

        errMessage = 'file schould contain no more than 20 rows';
        if (data.length > 20) {
          handleErrors(errMessage, setErrors);
        } else {
          handleErrors(errMessage, setErrors, true);
        }
        setCsvData(data);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: csvAccepted,
  });

  return (
    <div
      {...getRootProps()}
      onDragEnter={() => setHighlighted(true)}
      onDragLeave={() => setHighlighted(false)}
      className={`${
        Highlighted ? ' border-almostBlack bg-opacity-90' : ''
      } border-transparent border my-12 mx-4  px-8 py-4  text-3xl text-almostWhite bg-contrastMain rounded-full flex justify-center items-center max-w-4xl cursor-pointer hover:bg-opacity-90 relative`}
    >
      {Highlighted ? (
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-black opacity-20 rounded-full'>
          {' '}
        </div>
      ) : (
        ''
      )}
      Upload CSV file
      <input {...getInputProps()} />
    </div>
  );
};

export default UploadBlock;
