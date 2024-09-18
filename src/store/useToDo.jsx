import { create } from 'zustand';

const useToDo = create((set) => ({
  tasks: [],
  selectedTasks: [],

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, status: 'unfulfilled' }],
  })),

  markAsDone: (taskToMark) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.title === taskToMark.title ? { ...task, status: 'done' } : task
    ),
  })),

  deleteTask: (taskToDelete) => set((state) => ({
    tasks: state.tasks.filter((task) => task.title !== taskToDelete.title),
    selectedTasks: state.selectedTasks.filter((task) => task.title !== taskToDelete.title),
  })),

  deleteSelectedTasks: () => set((state) => ({
    tasks: state.tasks.filter((task) => !state.selectedTasks.some((t) => t.title === task.title)),
    selectedTasks: [],
  })),

  toggleTaskSelection: (taskToToggle) => set((state) => {
    const isSelected = state.selectedTasks.some((t) => t.title === taskToToggle.title);
    return {
      selectedTasks: isSelected
        ? state.selectedTasks.filter((t) => t.title !== taskToToggle.title)
        : [...state.selectedTasks, taskToToggle],
    };
  }),

  getTasks: (status) => (state) => status === 'all'
    ? state.tasks
    : state.tasks.filter((task) => task.status === status),
}));

export default useToDo;
