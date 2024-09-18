import { create } from 'zustand';

const useToDo = create((set) => ({
  unfulfilled: [],
  done: [],
  all: [],
  selectedTasks: [],

  addTask: (task) =>
    set((state) => ({
      unfulfilled: [...state.unfulfilled, task],
      all: [...state.all, task],
    })),

  markAsDone: (taskToMark) =>
    set((state) => {
      const updatedAll = state.all.map((t) => 
        t.title === taskToMark.title ? { ...t, status: 'done' } : t
      );
      return {
        done: updatedAll.filter((t) => t.status === 'done'),
        unfulfilled: updatedAll.filter((t) => t.status === 'unfulfilled'),
        all: updatedAll,
      };
    }),

  deleteTask: (taskToDelete) =>
    set((state) => ({
      all: state.all.filter((t) => t.title !== taskToDelete.title),
      unfulfilled: state.unfulfilled.filter((t) => t.title !== taskToDelete.title),
      done: state.done.filter((t) => t.title !== taskToDelete.title),
      selectedTasks: state.selectedTasks.filter((t) => t.title !== taskToDelete.title),
    })),

  deleteSelectedTasks: () =>
    set((state) => ({
      all: state.all.filter((t) => !state.selectedTasks.some((s) => s.title === t.title)),
      unfulfilled: state.unfulfilled.filter((t) => !state.selectedTasks.some((s) => s.title === t.title)),
      done: state.done.filter((t) => !state.selectedTasks.some((s) => s.title === t.title)),
      selectedTasks: [],
    })),

  toggleTaskSelection: (taskToToggle) =>
    set((state) => {
      const isSelected = state.selectedTasks.some((t) => t.title === taskToToggle.title);
      return {
        selectedTasks: isSelected
          ? state.selectedTasks.filter((t) => t.title !== taskToToggle.title)
          : [...state.selectedTasks, taskToToggle],
      };
    }),

  getTasks: (status) => {
    return (state) => {
      if (status === 'all') return state.all;
      if (status === 'unfulfilled') return state.unfulfilled;
      return state.done;
    };
  },
}));

export default useToDo;
