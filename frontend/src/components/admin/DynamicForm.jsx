import React, { useState, useEffect } from 'react';

const DynamicForm = ({ formData, onSubmit, readOnly = false, isEdit = false }) => {
  const [formState, setFormState] = useState(formData?.data || {});

  useEffect(() => {
    setFormState(formData?.data || {});
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!readOnly) {
      onSubmit(formState);
    }
  };

  return (
    <div className=" border-2 dark:border-gray-500 rounded mx-5">
      <h1 className="text-center text-gray-800 text-2xl font-semibold mt-3 dark:text-white">{formData?.title}</h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {Object.keys(formState).map((key) => ( key !== '_id'  && (
          // eslint-disable-next-line react/jsx-key
          <div key={key} className="flex flex-col">
            <label
              htmlFor={key}
              className="mb-2 capitalize text-gray-700 dark:text-gray-300"
            >
              {key}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formState[key]}
              onChange={handleChange}
              className="p-2 border text-black rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={readOnly}
            />
          </div>
        )
        ))}
        {!readOnly && (
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded dark:bg-blue-700"
            >
              {isEdit ? 'Update' : 'Submit'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default DynamicForm;
