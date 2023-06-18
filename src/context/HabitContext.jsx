import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export const HabitContext = createContext();

export const HabitContextProvider = ({ children }) => {
  const newHabitInitialState = {
    id: uuid(),
    title: '',
    frequency: 'daily',
    goal: '1',
    timeOfDay: 'morning',
    status: 'active',
  };

  const [allHabits, setAllHabits] = useState(() => {
    return JSON.parse(sessionStorage.getItem('habits')) ?? [];
  });
  const [newHabit, setNewHabit] = useState(newHabitInitialState);

  const navigate = useNavigate();

  const editHabitHandler = (e) => {
    e.preventDefault();
    const habitArray = [...allHabits];
    const habitIndex = habitArray.findIndex(
      (habit) => habit.id === newHabit.id
    );

    if (habitIndex !== -1) {
      habitArray[habitIndex] = { ...newHabit };
      setAllHabits(habitArray);
      setNewHabit(newHabitInitialState);
    }
    navigate('/');
  };

  const newHabitSubmitHandler = () => {
    setAllHabits((prev) => [...prev, newHabit]);
    setNewHabit(newHabitInitialState);
  };

  const deleteHabitHandler = (id) => {
    const habitArray = [...allHabits];
    const updatedArray = habitArray.filter((habit) => habit.id !== id);
    setAllHabits(updatedArray);
    navigate('/');
  };

  const clearModal = () => {
    setNewHabit(newHabitInitialState);
  };

  useEffect(() => {
    sessionStorage.setItem('habits', JSON.stringify(allHabits));
  }, [allHabits]);
  return (
    <HabitContext.Provider
      value={{
        allHabits,
        newHabit,
        setNewHabit,
        newHabitSubmitHandler,
        editHabitHandler,
        deleteHabitHandler,
        clearModal,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabit = () => {
  return useContext(HabitContext);
};
