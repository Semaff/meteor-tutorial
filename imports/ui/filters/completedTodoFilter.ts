export const completedTodoFilter = () => ({
  isChecked: { $ne: true }
});