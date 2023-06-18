import React from 'react';

import './HabitTile.css';
import { useNavigate } from 'react-router-dom';

const HabitTile = ({ habit }) => {
  const navigate = useNavigate();
  return (
    <div className='tile-wrapper'>
      <article onClick={() => navigate(`/details/${habit.id}`)}>
        <h3>{habit.title}</h3>
        <p>
          {habit.goal} times {habit.frequency} in the {habit.timeOfDay}
        </p>
      </article>
    </div>
  );
};

export default HabitTile;
