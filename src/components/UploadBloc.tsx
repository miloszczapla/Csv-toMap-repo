import { useState } from 'react';
import { CSVReader } from 'react-papaparse';

const UploadBlock = () => {
  const [Highlighted, setHighlighted] = useState(false);

  const handleOnDrop = (data: any) => {
    setHighlighted(false);
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  return (
    <div
      onDragEnter={() => setHighlighted(true)}
      onDragExit={() => setHighlighted(false)}
      onDrop={() => setHighlighted(false)}
      className={`${
        Highlighted ? ' border-almostBlack bg-opacity-90' : ''
      } border-transparent border my-12 mx-4  px-8 py-4  text-3xl text-almostWhite bg-contrastMain rounded-full flex justify-center items-center max-w-4xl cursor-pointer hover:bg-opacity-90 relative`}
    >
      <CSVReader
        // ref={buttonRef}
        onFileLoad={handleOnDrop}
        onError={handleOnError}
        config={{}}
        style={{}}
        onRemoveFile={handleOnRemoveFile}
        noProgressBar
      >
        {({ file }: any) => (
          <>
            {Highlighted ? (
              <div className='absolute top-0 bottom-0 right-0 left-0 bg-black opacity-20 rounded-full'>
                {' '}
              </div>
            ) : (
              ''
            )}
            Upload CSV file
          </>
        )}
      </CSVReader>
    </div>
  );
};

export default UploadBlock;
