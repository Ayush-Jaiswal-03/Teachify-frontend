import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mockUsers } from "../../utils/mockData";
import { Users, User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { fetchUsersForClassroom } from "./../../store/slices/classroomSlice";

const People = () => {
  const dispatch = useDispatch();
  const { selectedClassroom } = useSelector((state) => state.classroom);
  const members = useSelector(
    (state) => state.classroom.members[selectedClassroom?.id] || [],
  );

  console.log("members", members);
  if (!selectedClassroom) return null;

  useEffect(() => {
    dispatch(fetchUsersForClassroom(selectedClassroom?.id));
  }, [selectedClassroom?.id, dispatch]);

  const teacher = members?.find((user) => user.role === "TEACHER");

  const students = members?.filter((user) => user.role === "STUDENT");
  console.log("students", students);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">People</h2>

      {/* Teacher Section */}
      <Card className="mb-6 border-2">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Teacher</h3>
          </div>
          <Separator className="mb-4" />
          {teacher && (
            <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg">
                  {teacher.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">
                  {teacher.username}
                </p>
                <p className="text-sm text-gray-600">{teacher.email}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Students Section */}
      <Card className="border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Students</h3>
            </div>
            <span className="text-sm text-gray-600">
              {students?.length}{" "}
              {students?.length === 1 ? "student" : "students"}
            </span>
          </div>
          <Separator className="mb-4" />
          {students?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No students enrolled yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {students?.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      {student.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {student.username}
                    </p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default People;
