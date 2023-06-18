import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

import './CreateHabitModal.css';
import { useHabit } from '../../context/HabitContext';

const CreateHabitModal = ({ setDisplayModal }) => {
  const habit = useHabit();

  const { newHabit, setNewHabit, newHabitSubmitHandler, clearModal } = habit;

  const habitInputHandler = (event) => {
    const { name, value } = event.target;
    setNewHabit((prev) => ({ ...prev, [name]: value }));
  };

  const habitSubmitHandler = (event) => {
    event.preventDefault();
    newHabitSubmitHandler();
    event.target.reset();
    setDisplayModal(false);
  };

  const discardHandler = () => {
    setDisplayModal(false);
    clearModal();
  };

  return (
    <>
      <div className='modal-container'>
        <div className='centered'>
          <div className='modal'>
            <h6 className='modal-heading'>Create New Habit</h6>
            <h1 className='modal-heading'>
              {newHabit.title.length ? newHabit.title : 'New Habit'}
            </h1>
            <form className='habit-form' onSubmit={habitSubmitHandler}>
              <div className='input-container'>
                <label htmlFor='title'>Title:</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  required
                  value={newHabit.title}
                  onChange={habitInputHandler}
                />
              </div>

              <div className='input-container'>
                <label htmlFor='frequency'>Frequency:</label>
                <select
                  name='frequency'
                  id='frequency'
                  onChange={habitInputHandler}
                >
                  <option value='daily' defaultValue>
                    Daily
                  </option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>
              </div>

              <div className='input-container'>
                <label htmlFor='goal'>Goal:</label>
                <select name='goal' id='goal' onChange={habitInputHandler}>
                  <option value='1' defaultValue>
                    1
                  </option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>

              <div className='input-container'>
                <label htmlFor='timeOfDay'>Time Of Day:</label>
                <select
                  name='timeOfDay'
                  id='timeOfDay'
                  onChange={habitInputHandler}
                >
                  <option value='morning' defaultValue>
                    Morning
                  </option>
                  <option value='Noon'>Noon</option>
                  <option value='afternoon'>Afternoon</option>
                  <option value='evening'>Evening</option>
                  <option value='night'>Night</option>
                </select>
              </div>

              <div className='modal-buttons-container'>
                <button
                  className='btn-danger'
                  type='button'
                  onClick={discardHandler}
                >
                  Discard
                </button>
                <button className='btn-primary' type='submit'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateHabitModal;

/* <label htmlFor='startDate'>Start Date:</label>
          <input
            type='date'
            pattern='\d{4}-\d{2}-\d{2}'
            value={newHabit.startDate}
            min='2023-06-01'
            onChange={habitInputHandler}
          /> */

/* <DatePicker
            selected={newHabit.startDate}
            onChange={(date) =>
              setNewHabit((prev) => ({ ...prev, startDate: date }))
            }
          /> */
