import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProjects, createProject } from '../utils/ProjectsApi';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProjects();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createNewProjects = createAsyncThunk(
  'projects/createProjects',
  async ({ title, date_start, date_finish}, { rejectWithValue, dispatch }) => {
		debugger;
		const newProject = {
			title: title,
			date_start: date_start,
			date_finish: date_finish,
			is_active: true,
			id: 15
		}
		console.log(newProject);
    try {
debugger;
      const response = await createProject(newProject);
			const data = response.json();
			console.log(response);
			console.log('--------------------');
			console.log(data);
			dispatch(addProject(data));
			if (!response.ok) {
				throw new Error('Can\'t add project. Server error.');
		}

    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: null,
    error: null,
  },
  reducers: {
    addProject(state, action) {
      state.projects.push({
        // добавить поле создатателя-автора и поля исполнителей после их подключения в стору
        id: state.projects.length + 1,
        title: action.payload.title,
        date_finish: action.payload.date_finish,
        is_active: false, // не забыть сменить на true
        date_start: action.payload.date_start,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = 'resolved';
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
