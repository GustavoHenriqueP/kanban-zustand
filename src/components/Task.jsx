import { useStore } from '../store';
import classNames from 'classnames';
import './Task.css';
import { IconTrash } from '@tabler/icons-react';

const Task = ({ title }) => {
  const task = useStore((store) => store.tasks.find((task) => task.title === title));
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.title)}>
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div>
          <button
            style={{ all: 'unset', cursor: 'pointer' }}
            onClick={() => deleteTask(task.title)}
          >
            <IconTrash size={'1.25rem'} />
          </button>
        </div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  );
};

export default Task;
