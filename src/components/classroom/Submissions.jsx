import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FileText, Users, Check, X } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { mockUsers } from "../../utils/mockData";

const Submissions = () => {
  const { assignments, submissions } = useSelector((state) => state.assignment);
  const { selectedClassroom } = useSelector((state) => state.classroom);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getSubmissionsForAssignment = (assignmentId) => {
    return submissions.filter((sub) => sub.assignmentId === assignmentId);
  };

  const getStudentInfo = (studentId) => {
    return mockUsers.find((user) => user.id === studentId);
  };

  const openAttachment = (url) => {
    window.open(url, "_blank");
  };

  if (selectedAssignment) {
    const assignmentSubmissions = getSubmissionsForAssignment(
      selectedAssignment.id,
    );
    const allStudents = selectedClassroom.students;
    const submittedStudentIds = assignmentSubmissions.map(
      (sub) => sub.studentId,
    );
    const notSubmittedStudents = allStudents.filter(
      (studentId) => !submittedStudentIds.includes(studentId),
    );

    return (
      <div>
        <button
          onClick={() => setSelectedAssignment(null)}
          className="mb-4 text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-2"
        >
          <span>← Back to all assignments</span>
        </button>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedAssignment.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  {assignmentSubmissions.length} / {allStudents.length}{" "}
                  submitted
                </span>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Submitted Students */}
            {assignmentSubmissions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Submitted ({assignmentSubmissions.length})</span>
                </h3>
                <div className="space-y-3">
                  {assignmentSubmissions.map((submission) => {
                    const student = getStudentInfo(submission.studentId);
                    return (
                      <div
                        key={submission.id}
                        className="p-4 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {student?.name || submission.studentName}
                            </p>
                            <p className="text-sm text-gray-600">
                              Submitted:{" "}
                              {new Date(
                                submission.submittedAt,
                              ).toLocaleString()}
                            </p>
                            <span
                              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                                submission.status === "on-time"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {submission.status === "on-time"
                                ? "On Time"
                                : "Late"}
                            </span>
                          </div>
                        </div>
                        {submission.attachments &&
                          submission.attachments.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Attachments:
                              </p>
                              <div className="space-y-2">
                                {submission.attachments.map((file) => (
                                  <button
                                    key={file.id}
                                    onClick={() => openAttachment(file.url)}
                                    className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700"
                                  >
                                    <FileText className="h-4 w-4" />
                                    <span>{file.name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Not Submitted Students */}
            {notSubmittedStudents.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <X className="h-5 w-5 text-orange-600" />
                  <span>Not Submitted ({notSubmittedStudents.length})</span>
                </h3>
                <div className="space-y-2">
                  {notSubmittedStudents.map((studentId) => {
                    const student = getStudentInfo(studentId);
                    return (
                      <div
                        key={studentId}
                        className="p-4 bg-orange-50 border border-orange-200 rounded-lg"
                      >
                        <p className="font-medium text-gray-900">
                          {student?.name || "Unknown Student"}
                        </p>
                        <p className="text-sm text-gray-600">
                          No submission yet
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Assignment Submissions
      </h2>

      {assignments.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No assignments created yet</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => {
            const assignmentSubmissions = getSubmissionsForAssignment(
              assignment.id,
            );
            const totalStudents = selectedClassroom.students.length;

            return (
              <Card
                key={assignment.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-indigo-300 border-2 border-transparent"
                onClick={() => setSelectedAssignment(assignment)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {assignment.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>
                            {assignmentSubmissions.length} / {totalStudents}{" "}
                            submitted
                          </span>
                        </div>
                        <div className="text-gray-500">
                          {totalStudents > 0
                            ? Math.round(
                                (assignmentSubmissions.length / totalStudents) *
                                  100,
                              )
                            : 0}
                          % completion
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">
                          {assignmentSubmissions.length}
                        </div>
                        <div className="text-xs text-gray-500">submissions</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Submissions;
