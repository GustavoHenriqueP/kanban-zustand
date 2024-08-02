import { useState } from 'react';
import { useStore } from '../store';
import './Column.css';
import Task from './Task';
import { shallow } from 'zustand/shallow';
import classNames from 'classnames';

const Column = ({ state }) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  // shallow verifica não se o array mudou (provavelmente com o Object.is, com reference)
  // mas sim se o seu conteúdo que foi alterado
  const tasks = useStore((store) => store.tasks.filter((task) => task.state === state), shallow);
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open && (
        <div className="modal">
          <form
            className="modalContent"
            onSubmit={(e) => {
              e.preventDefault();
              addTask(text, state);
              setText('');
              setOpen(false);
            }}
          >
            <input autoFocus type="text" onChange={(e) => setText(e.target.value)} value={text} />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Column;
