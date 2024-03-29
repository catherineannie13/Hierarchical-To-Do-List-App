import React, { useState } from 'react';
import { createList } from '../ApiClient';

const AddListForm = ({ onListCreated }) => {
  const [title, setTitle] = useState('');

  // When the form is submitted, create a new list
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // Create a new list using the provided title
      const response = await createList({ title });
      const newList = response.list;
      onListCreated(newList); // Pass the new list data to the parent component
      setTitle(''); // Clear the input field after creating the list

    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='addlist-form'>
      <input
        type="text"
        placeholder="Enter list title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className='createlist-button'>Create List</button>
    </form>
  );
};

export default AddListForm;