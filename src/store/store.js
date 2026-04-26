import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import classroomReducer from './slices/classroomSlice';
import assignmentReducer from './slices/assignmentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        classroom: classroomReducer,
        assignment: assignmentReducer,
    },
});