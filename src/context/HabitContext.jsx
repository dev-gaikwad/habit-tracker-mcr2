import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HabitContext = createContext();

const newHabitInitialState = {
  title: '',
  frequency: 'daily',
  goal: '1',
  timeOfDay: 'morning',
  // startDate: new Date().toLocaleDateString('en-GB'),
  status: 'active',
};

export const HabitContextProvider = ({ children }) => {
  const [allHabits, setAllHabits] = useState(() => {
    return JSON.parse(sessionStorage.getItem('habits')) ?? [];
  });
  const [newHabit, setNewHabit] = useState(newHabitInitialState);

  const navigate = useNavigate();

  const editHabitHandler = (e) => {
    e.preventDefault();
    const habitArray = [...allHabits];
    const habitIndex = habitArray.findIndex(
      (habit) => habit.title === newHabit.title
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

  const deleteHabitHandler = (title) => {
    const habitArray = [...allHabits];
    const updatedArray = habitArray.filter((habit) => habit.title !== title);
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
