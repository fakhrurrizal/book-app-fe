import React from 'react';

const EntriesText = ({ currentPage, pageSize, totalEntries }) => {
  const startEntry = totalEntries ? (currentPage - 1) * pageSize + 1 : 0;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  return (
    <>
      {totalEntries ? (
        <p className="font-[.81rem] text-slate-700">
          Menampilkan {startEntry} sampai {endEntry} dari {totalEntries} data
        </p>
      ) : null}
    </>
  );
};

export default EntriesText;
