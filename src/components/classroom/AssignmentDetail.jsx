import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitAssignment } from "../../store/slices/assignmentSlice";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Award,
  Upload,
  Check,
  Clock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Navigate } from "react-router-dom";

const AssignmentDetail = ({ assignment, isTeacher, onBack }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { submissions } = useSelector((state) => state.assignment);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // const userSubmission = submissions.find(
  //   (sub) => sub.assignmentId === assignment.id && sub.studentId === user.id,
  // );
  console.log("assignment detail component", assignment);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleSubmit = () => {
    if (selectedFiles.length > 0) {
      const attachments = selectedFiles.map((file) => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      dispatch(
        submitAssignment({
          assignmentId: assignment.id,
          classroomId: assignment.classroomId,
          studentId: user.id,
          studentName: user.name,
          attachments: attachments,
          dueDate: assignment.dueDate,
        }),
      );
      setSelectedFiles([]);
    }
  };

  const openAttachment = (url) => {
    window.open(url, "_blank");
  };

  const isDueDatePassed = new Date(assignment.dueDate) < new Date();

  if (!assignment) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <Button variant="ghost" onClick={onBack} className="mb-4 -ml-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Classwork
      </Button>

      <Card className="border-2">
        <CardContent className="p-8">
          {/* Assignment Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <FileText className="h-6 w-6 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {assignment.title}
                </h1>
              </div>
            </div>
          </div>

          {/* Assignment Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-lg">
              <Award className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-900">
                {assignment.points} points
              </span>
            </div>
            {assignment.dueDate && (
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">
                  Due: {new Date(assignment.dueDate).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Instructions
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {assignment.instructions}
            </p>
          </div>

          {/* Assignment Attachments */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Attachments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {assignment.attachments.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => openAttachment(file.fileUrl)}
                    className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-left"
                  >
                    <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {file.fileName}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Student Submission Section */}
          {/* {!isTeacher && (
            <>
              <Separator className="my-6" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Work
                </h3>

                {userSubmission ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                          userSubmission.status === "on-time"
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {userSubmission.status === "on-time" ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                        <span className="font-medium">
                          Submitted{" "}
                          {userSubmission.status === "on-time"
                            ? "on time"
                            : "late"}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Submitted on:{" "}
                      {new Date(userSubmission.submittedAt).toLocaleString()}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Your Submission:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {userSubmission.attachments.map((file) => (
                          <button
                            key={file.id}
                            onClick={() => openAttachment(file.url)}
                            className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition-colors text-left"
                          >
                            <FileText className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {isDueDatePassed && (
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-sm">
                        The due date has passed. Your submission will be marked
                        as late.
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="submission">Upload your work</Label>
                      <Input
                        id="submission"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Selected files:
                        </p>
                        {selectedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600 flex items-center space-x-2"
                          >
                            <FileText className="h-4 w-4" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={handleSubmit}
                      disabled={selectedFiles.length === 0}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Assignment
                    </Button>
                  </div>
                )}
              </div>
            </>
          )} */}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentDetail;
