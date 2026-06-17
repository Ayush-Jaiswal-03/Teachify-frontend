import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchClassroomAssignments,
  fetchClassroomSubmissions,
} from "../../store/slices/assignmentSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Classwork from "../classroom/Classwork";
import Submissions from "../classroom/Submissions";
import People from "../classroom/People";

const ClassroomDetail = ({ classroom }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("classwork");

  const isTeacher = classroom.role === "TEACHER";

  // console.log("CLASSROOM DETAIL RENDER");

  useEffect(() => {
    dispatch(fetchClassroomAssignments(classroom.id));
    // if (isTeacher) {
    //  dispatch(fetchClassroomSubmissions(selectedClassroom.id));
    //   }
  }, [classroom, dispatch]);

  // useEffect(() => {
  //   console.log("MOUNTED");
  //   return () => {
  //     console.log("UNMOUNTED");
  //   };
  // }, []);

  if (!classroom) return null;

  return (
    <div>
      {/* Classroom Header */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 rounded-2xl p-8 mb-6 shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-2">{classroom.name}</h1>
        <p className="text-indigo-100 text-lg">{classroom.description}</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white/10 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white text-sm font-medium">
              Code:{" "}
              <span className="font-mono font-bold">{classroom.joinCode}</span>
            </span>
          </div>
          <div className="bg-white/10 bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white text-sm font-medium">
              {isTeacher ? "Teaching" : "Enrolled"}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList
          className="grid w-full max-w-md"
          style={{ gridTemplateColumns: isTeacher ? "1fr 1fr 1fr" : "1fr 1fr" }}
        >
          <TabsTrigger value="classwork">Classwork</TabsTrigger>
          {isTeacher && (
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          )}
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>

        <TabsContent value="classwork" className="mt-6">
          <Classwork isTeacher={isTeacher} />
        </TabsContent>
        {/* 
        {isTeacher && (
          <TabsContent value="submissions" className="mt-6">
            <Submissions />
          </TabsContent>
        )} */}

        <TabsContent value="people" className="mt-6">
          <People />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassroomDetail;
