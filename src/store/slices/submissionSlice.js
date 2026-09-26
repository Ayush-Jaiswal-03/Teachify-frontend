import { createSlice } from '@reduxjs/toolkit';
import api from '@/api/axios';

const initialState = {
    submissionList: {},
    loading: false,
    error: null,
};

const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        setSubmissionList: (state, action) => {
            const { assignmentId, data } = action.payload;
            state.submissionList[assignmentId] = data;
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
    setSubmissionList,
    setLoading,
    setError,
    clearAllErrors
} = submissionSlice.actions;

export const fetchSubmissionList = (assignmentId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.get(`/api/submissions/${assignmentId}`);
        dispatch(setSubmissionList({ assignmentId, data: response.data }));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(clearAllErrors());
    }

};

export default submissionSlice.reducer;
