import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedClassroom } from "../../store/slices/classroomSlice";
import { BookOpen, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const ClassroomList = () => {
  const dispatch = useDispatch();
  const { classrooms } = useSelector((state) => state.classroom);
  const { user } = useSelector((state) => state.auth);

  const handleClassroomClick = (classroom) => {
    dispatch(setSelectedClassroom(classroom));
  };

  if (classrooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <BookOpen className="h-24 w-24 text-indigo-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Classrooms Yet
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Get started by creating your first classroom or joining an existing
          one using the + button above
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Classrooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.map((classroom) => {
          const isTeacher = classroom.role === "TEACHER";
          // const studentCount = classroom.students.length;

          return (
            <Card
              key={classroom.joinCode}
              className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-indigo-300 group"
              onClick={() => handleClassroomClick(classroom)}
            >
              <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-white font-bold text-xl truncate">
                    {classroom.name}
                  </h3>
                </div>
              </div>
              <CardContent className="p-5">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {classroom.description}
                </p>
                <div className="flex items-end justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Users className="h-4 w-4" />
                    <span>
                      {/* {studentCount}{" "}
                      {studentCount === 1 ? "student" : "students"} */}
                      {2} {"students"}
                    </span>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium">
                    {isTeacher ? (
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        Teacher
                      </span>
                    ) : (
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        Student
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Code:{" "}
                    <span className="font-mono font-semibold text-indigo-600">
                      {classroom.joinCode}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClassroomList;
