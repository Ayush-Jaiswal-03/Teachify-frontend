export const mockUsers = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
    },
];

export const mockClassrooms = [
    {
        id: '1',
        name: 'Mathematics 101',
        description: 'Introduction to Calculus and Linear Algebra',
        teacherId: '1',
        code: 'MATH01',
        students: ['2', '3'],
        createdAt: '2024-01-15T10:00:00Z',
    },
    {
        id: '2',
        name: 'Physics Advanced',
        description: 'Advanced concepts in Quantum Mechanics',
        teacherId: '2',
        code: 'PHYS02',
        students: ['1', '3'],
        createdAt: '2024-01-20T14:00:00Z',
    },
    {
        id: '3',
        name: 'Computer Science Basics',
        description: 'Introduction to Programming with Python',
        teacherId: '1',
        code: 'CS0001',
        students: ['2'],
        createdAt: '2024-02-01T09:00:00Z',
    },
];

export const mockAssignments = [
    {
        id: '1',
        classroomId: '1',
        title: 'Calculus Problem Set 1',
        instructions: 'Complete problems 1-10 from Chapter 3. Show all your work and explain each step clearly. Focus on understanding the fundamental theorem of calculus.',
        points: 100,
        dueDate: '2024-03-15T23:59:00Z',
        attachments: [
            {
                id: '1',
                name: 'problem_set_1.pdf',
                url: 'https://example.com/files/problem_set_1.pdf',
            },
        ],
        createdAt: '2024-03-01T10:00:00Z',
    },
    {
        id: '2',
        classroomId: '1',
        title: 'Linear Algebra Quiz',
        instructions: 'Solve the matrix operations and vector space problems provided in the attachment.',
        points: 50,
        dueDate: '2024-03-20T23:59:00Z',
        attachments: [],
        createdAt: '2024-03-05T11:00:00Z',
    },
    {
        id: '3',
        classroomId: '2',
        title: 'Quantum Mechanics Essay',
        instructions: 'Write a 1000-word essay explaining the double-slit experiment and its implications for quantum theory.',
        points: 150,
        dueDate: '2024-03-25T23:59:00Z',
        attachments: [
            {
                id: '2',
                name: 'essay_guidelines.pdf',
                url: 'https://example.com/files/essay_guidelines.pdf',
            },
            {
                id: '3',
                name: 'reference_material.pdf',
                url: 'https://example.com/files/reference_material.pdf',
            },
        ],
        createdAt: '2024-03-10T15:00:00Z',
    },
];

export const mockSubmissions = [
    {
        id: '1',
        assignmentId: '1',
        classroomId: '1',
        studentId: '2',
        studentName: 'Jane Smith',
        attachments: [
            {
                id: '4',
                name: 'my_solution.pdf',
                url: 'https://example.com/submissions/my_solution.pdf',
            },
        ],
        submittedAt: '2024-03-14T18:30:00Z',
        status: 'on-time',
    },
    {
        id: '2',
        assignmentId: '1',
        classroomId: '1',
        studentId: '3',
        studentName: 'Bob Johnson',
        attachments: [
            {
                id: '5',
                name: 'calculus_homework.pdf',
                url: 'https://example.com/submissions/calculus_homework.pdf',
            },
        ],
        submittedAt: '2024-03-16T10:00:00Z',
        status: 'late',
    },
];
