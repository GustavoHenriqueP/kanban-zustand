import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, state) => set((store) => ({ tasks: [...store.tasks, { title, state }] })),
  deleteTask: (title) =>
    set(
      (store) => ({ tasks: store.tasks.filter((task) => task.title !== title) }),
      false,
      'addTask'
    ),
  setDraggedTask: (title) => set({ draggedTask: title }),
  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) => (task.title === title ? { title, state } : task)),
    })),
});

//* Um exemplo de custom middleware
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(log(persist(devtools(store), { name: 'store' })));
