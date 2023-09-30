import React, { useState } from 'react';
import './ModalForm.css';

function ModalForm() {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button>
      {isOpen && ( */}
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" >
              &times;
            </span>
            {/* Your form content goes here */}
            <form>
              <label>
                Name:
                <input type="text" />
              </label>
              {/* Add other form fields here */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default ModalForm;
