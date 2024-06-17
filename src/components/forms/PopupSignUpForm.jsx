import React from 'react';
import { IoClose } from 'react-icons/io5';
import MainLogin from '../MainLogin';

const PopupSignUpForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 p-5">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="flex flex-col items-center gap-5 bg-white p-6 rounded-lg shadow-lg z-30 w-[100%] md:w-[60%] lg:w-[45%] xl:w-[30%]">
        <div className="w-[100%]">
          <button
            className="text-2xl text-gray-500 float-right"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <h2 className="text-xl font-semibold">Create an account or sign in</h2>
        <MainLogin />
      </div>
    </div>
  );
};

export default PopupSignUpForm;
