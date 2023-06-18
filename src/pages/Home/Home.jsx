import { useState } from 'react';
import CreateHabitModal from '../../components/CreateHabitModal/CreateHabitModal';
import { useHabit } from '../../context/HabitContext';
import HabitTile from '../../components/HabitTile/HabitTile';
import './Home.css';

const Home = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const habit = useHabit();

  const { allHabits } = habit;
  return (
    <>
      <button className='btn-primary' onClick={() => setDisplayModal(true)}>
        Create New Habit
      </button>
      <div className='tiles-container'>
        {allHabits.length > 0 ? (
          allHabits.map((habit, index) => (
            <HabitTile key={index} habit={habit} />
          ))
        ) : (
          <h2>No habit yet, create a new one now</h2>
        )}
      </div>
      {displayModal && <CreateHabitModal setDisplayModal={setDisplayModal} />}
    </>
  );
};

export default Home;
