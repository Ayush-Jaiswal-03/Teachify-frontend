import { createSlice } from '@reduxjs/toolkit';
import api from '@/api/axios';

const initialState = {
    classrooms: [],
    selectedClassroom: null,
    members: {},
    loading: false,
    error: null,
};

const classroomSlice = createSlice({
    name: 'classroom',
    initialState,
    reducers: {
        setClassrooms: (state, action) => {
            state.classrooms = action.payload;
        },
        setSelectedClassroom: (state, action) => {
            state.selectedClassroom = action.payload;
        },
        setMembers: (state, action) => {
            const { classroomId, data } = action.payload;
            state.members[classroomId] = data;
        },
        addClassroom: (state, action) => {
            state.classrooms.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAllErrors: (state, action) => {
            state.error = null;
            state.loading = false;
        }
    },
});

export const {
    setClassrooms,
    setSelectedClassroom,
    addClassroom,
    setMembers,
    setLoading,
    setError,
    clearAllErrors
} = classroomSlice.actions;

export const fetchUserClassrooms = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get("/api/classrooms/get");

        dispatch(setClassrooms(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(clearAllErrors());
    }

};

export const createClassroom = (classroomData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.post("/api/classrooms/create", classroomData);
        dispatch(addClassroom(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(clearAllErrors());
    }
};

export const joinClassroomByCode = (joinCode) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get(`/api/classrooms/${joinCode}/join`);

        dispatch(addClassroom(response.data.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(clearAllErrors());
    }
}

export const fetchUsersForClassroom = (classroomId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get(`/api/classrooms/${classroomId}/users`);
        console.log("classroom members", response.data);
        dispatch(setMembers({ classroomId, data: response.data }));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(clearAllErrors());
    }

};

export default classroomSlice.reducer;
