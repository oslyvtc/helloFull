import { TextField, MenuItem, Button } from '@mui/material';

import { useTaskFiltersStore, type StatusFilter } from '../store/taskFiltersStore';

function TaskToolbar() {
  const search = useTaskFiltersStore((state) => state.search);

  const setSearch = useTaskFiltersStore((state) => state.setSearch);
  const statusFilter = useTaskFiltersStore((state) => state.statusFilter);

  const setStatusFilter = useTaskFiltersStore((state) => state.setStatusFilter);
  const resetFilters =
  useTaskFiltersStore(
    (state) => state.resetFilters,
  );

  return (
    <>
      <TextField
        label="Search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <TextField
        select
        label="Status"
        value={statusFilter}
        onChange={(event) => {
          setStatusFilter(event.target.value as StatusFilter);
        }}
      >
        <MenuItem value="all">All</MenuItem>

        <MenuItem value="todo">Todo</MenuItem>

        <MenuItem value="in-progress">In progress</MenuItem>

        <MenuItem value="done">Done</MenuItem>
      </TextField>
      <Button onClick={resetFilters}>
  Reset filters
</Button>
    </>
  );
}

export default TaskToolbar;
