import Papa from 'papaparse';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import handleErrors from '../helpclasses/handleErrors';
import { Errors } from '../helpclasses/types';

interface Props {
  setCsvData: any;
  setErrors: any;
}

const UploadBlock = ({ setErrors, setCsvData }: Props) => {
  const [Highlighted, setHighlighted] = useState(false);
  const csvAccepted =
    '.csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values';
  // accept: csvAccepted,

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setHighlighted(false);
    console.log('file', file);

    const errMessage = 'file schould contain no more than 20 rows';

    Papa.parse(file, {
      complete: function (results) {
        if (results.data.length > 20) {
          handleErrors(errMessage, setErrors);
        } else {
          handleErrors(errMessage, setErrors, true);
        }

        setCsvData(results.data);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: csvAccepted,
  });

  // const file = acceptedFiles[0];
  // console.log(file);

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
