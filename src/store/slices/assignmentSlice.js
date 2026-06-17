import { createSlice } from '@reduxjs/toolkit';
import { mockAssignments, mockSubmissions } from '../../utils/mockData';
import api from '@/api/axios';

const initialState = {
    byClassroom: {},
    details: {},
    submissions: {},
    loading: false,
    error: null,
};


const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            // state.assignments = action.payload;
            const { classroomId, data } = action.payload;
            state.byClassroom[classroomId] = data;
        },
        setAssignmentDetail: (state, action) => {
            const { assignmentId, data } = action.payload;
            state.details[assignmentId] = data;
        },
        setSubmissions: (state, action) => {
            const { assignmentId, data } = action.payload;
            if (!state.submissions[assignmentId]) {
                state.submissions[assignmentId] = data;
            }
        },
        addAssignment: (state, action) => {
            const { classroomId, data } = action.payload;
            if (!state.byClassroom[classroomId]) {
                state.byClassroom[classroomId] = [];
            }
            state.byClassroom[classroomId].push(data);
        },
        addSubmission: (state, action) => {
            state.submissions.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearAllErrors: (state, action) => {
            state.error = false;
            state.loading = false;
        }
    },
});

export const {
    setAssignments,
    setAssignmentDetail,
    setSubmissions,
    addAssignment,
    addSubmission,
    setLoading,
    setError,
    clearAllErrors
} = assignmentSlice.actions;

export const fetchClassroomAssignments = (classroomId) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await api.get(`/api/classrooms/${classroomId}/assignments`);
        dispatch(setAssignments({ classroomId, data: response.data }));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(clearAllErrors());
    }
};

export const fetchAssignmentDetails = (assignmentId) => async (dispatch) => {

    if (!assignmentId) return;

    dispatch(setLoading(true));

    try {
        const response = await api.get(`/api/assignments/${assignmentId}`);
        // console.log("fetch assignment details slice", response);

        dispatch(setAssignmentDetail({
            assignmentId, data: response.data
        }));

        dispatch(setSubmissions({ assignmentId, data: response.data.userSubmission }));
        dispatch(setLoading(false));
    } catch (err) {
        // console.log(err);
        dispatch(clearAllErrors());
    }
};

export const createAssignment = (assignmentData, classroomId) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await api.post(`/api/assignments/create/${classroomId}`, assignmentData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        dispatch(addAssignment({ classroomId, data: response.data }));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(clearAllErrors());
    }
};

export const fetchClassroomSubmissions = (classroomId) => (dispatch) => {
    dispatch(setLoading(true));

};

export const submitAssignment = (assignmentId, submissionData) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
        const response = await api.post(`/api/submissions/${assignmentId}`, submissionData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(setSubmissions({ assignmentId, data: response.data.data }));

        dispatch(setLoading(false));
    } catch (err) {
        dispatch(clearAllErrors());
    }

};

export default assignmentSlice.reducer;
