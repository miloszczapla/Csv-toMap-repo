interface Props {
  csvData: any[] | null;
  id: number;
}

const ListOfElements = ({ csvData, id }: Props) => {
  return (
    <>
      {csvData?.map((row, index) => {
        if (index > 4) {
          return '';
        }
        return (
          <>
            <div className='flex justify-center items-center h-12 text-exs sm:text-sm md:text-lg md:h-20'>
              {row[id]}
            </div>
            <div className='w-10/12 h-px bg-almostWhite'></div>
          </>
        );
      })}
    </>
  );
};

export default ListOfElements;
