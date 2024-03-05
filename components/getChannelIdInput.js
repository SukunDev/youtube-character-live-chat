"use client";

import React from "react";
import { PiSpinnerGapBold } from "react-icons/pi";
import useChanneInput from "@/hooks/useChanneInput";
import { IoIosClose } from "react-icons/io";

export default function GetChannelIdInput() {
  const {
    handleSubmit,
    handleInput,
    handleCloseError,
    formData,
    isLoading,
    errorForm,
  } = useChanneInput();

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col items-center gap-2 sm:flex-row"
    >
      {errorForm.length > 0 ? (
        <div className="absolute w-full bottom-28 sm:bottom-14">
          <div className="absolute left-6 -bottom-3 w-0 h-0 border-l-[9px] border-l-transparent border-t-[14px] border-yellow-400 border-r-[9px] border-r-transparent"></div>
          <button
            onClick={handleCloseError}
            className="absolute right-1.5 top-1"
          >
            <IoIosClose className="text-2xl transition duration-300 hover:text-gray-300 active:text-white" />
          </button>
          <div className="px-4 py-2 bg-yellow-400 rounded-lg">
            {errorForm.map((item, idx) => (
              <p key={idx}>{item.message}</p>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <input
        onChange={handleInput}
        value={formData.url}
        type="text"
        className={`w-full px-4 py-2 text-black bg-white rounded-md`}
        placeholder="Paste Username Here"
        name="url"
        disabled={isLoading}
        required
      />
      <button
        className="flex items-center justify-center w-full gap-1 py-2 text-white transition duration-300 bg-indigo-500 rounded-md px-14 sm:w-fit hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <PiSpinnerGapBold className="text-2xl animate-spin" />
            Loading
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
