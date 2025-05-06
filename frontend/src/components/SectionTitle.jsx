import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <div className='flex flex-col items-end w-fit text-3xl text-gray-700 font-semibold mb-8'>
      <h2>{title}</h2>
      <hr className='border-none h-[2px] w-[50%] bg-primary ms-auto' />
    </div>
  );
};

export default SectionTitle;
