import React, { useEffect, useState } from 'react';

import './Details.css';
import { useParams } from 'react-router-dom';
import { useHabit } from '../../context/HabitContext';

const Details = () => {
  const { id } = useParams();
  const {
    allHabits,
    newHabit,
    setNewHabit,
    editHabitHandler,
    deleteHabitHandler,
  } = useHabit();

  const selectedHabit = allHabits?.find((habit) => habit.title === id);

  useEffect(() => {
    if (selectedHabit) setNewHabit({ ...selectedHabit });
  }, [selectedHabit]);

  const habitInputHandler = (event) => {
    const { name, value } = event.target;
    setNewHabit({ ...newHabit, [name]: value });
  };

  return (
    <>
      {selectedHabit ? (
        <div>
          <form className='habit-form' onSubmit={(e) => editHabitHandler(e)}>
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
                value={newHabit.frequency}
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
              <select
                name='goal'
                id='goal'
                value={newHabit.goal}
                onChange={habitInputHandler}
              >
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
                value={newHabit.timeOfDay}
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
              <button className='btn-primary' type='submit'>
                Save Changes
              </button>
              <button
                className='btn-danger'
                onClick={() => deleteHabitHandler(selectedHabit.id)}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h2>No habit</h2>
      )}
    </>
  );
};

export default Details;
