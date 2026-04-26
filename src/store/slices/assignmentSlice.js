import { createSlice } from '@reduxjs/toolkit';
import { mockAssignments, mockSubmissions } from '../../utils/mockData';
import api from '@/api/axios';

// const initialState = {
//     assignments: [],
//     submissions: [],
//     loading: false,
//     error: null,
// };
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
            // state.submissions = action.payload;
            const { assignmentId, data } = action.payload;
            state.submissions[assignmentId] = data;
        },
        addAssignment: (state, action) => {
            const { classroomId, data } = action.payload;
            state.byClassroom[classroomId].push = data;
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

        dispatch(setAssignmentDetail({
            assignmentId, data: response.data
        }));
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(clearAllErrors());
    }
};

export const fetchClassroomSubmissions = (classroomId) => (dispatch) => {
    dispatch(setLoading(true));

    setTimeout(() => {
        const classroomSubmissions = mockSubmissions.filter(
            s => s.classroomId === classroomId
        );
        dispatch(setSubmissions(classroomSubmissions));
        dispatch(setLoading(false));
    }, 500);
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

export const submitAssignment = (submissionData) => (dispatch) => {
    dispatch(setLoading(true));

    setTimeout(() => {
        const newSubmission = {
            id: Date.now().toString(),
            ...submissionData,
            submittedAt: new Date().toISOString(),
            status: new Date(submissionData.dueDate) < new Date() ? 'late' : 'on-time',
        };
        mockSubmissions.push(newSubmission);
        dispatch(addSubmission(newSubmission));
        dispatch(setLoading(false));
    }, 500);
};

export default assignmentSlice.reducer;
