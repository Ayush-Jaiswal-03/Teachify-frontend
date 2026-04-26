import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createAssignment,
  fetchAssignmentDetails,
} from "../../store/slices/assignmentSlice";
import { FileText, Plus, Calendar, Award } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import AssignmentDetail from "./AssignmentDetail";

const Classwork = ({ isTeacher }) => {
  const dispatch = useDispatch();
  const { selectedClassroom } = useSelector((state) => state.classroom);
  // const state = useSelector((state) => state);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const assignments = useSelector(
    (state) => state.assignment?.byClassroom[selectedClassroom?.id] || [],
  );
  const fetchedAssignment = useSelector(
    (state) => state.assignment?.details[selectedAssignment?.id] || null,
  );
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    instructions: "",
    points: "",
    dueDate: "",
  });
  const [attachments, setAttachments] = useState([]);
  // console.log("state", state);

  useEffect(() => {
    dispatch(fetchAssignmentDetails(selectedAssignment?.id));
  }, [selectedAssignment, dispatch]);

  const handleCreateAssignment = () => {
    const formData = new FormData();

    const newAssignment = {
      ...assignmentData,
      points: parseInt(assignmentData.points) || 0,
    };

    formData.append(
      "data",
      new Blob([JSON.stringify(newAssignment)], {
        type: "application/json",
      }),
    );

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    // if (assignmentData.title && assignmentData.instructions) {

    dispatch(createAssignment(formData, selectedClassroom.id));
    setAssignmentData({
      title: "",
      instructions: "",
      points: "",
      dueDate: "",
    });
    setAttachments([]);
    setCreateDialogOpen(false);
    // }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  if (fetchedAssignment) {
    return (
      <AssignmentDetail
        assignment={fetchedAssignment}
        isTeacher={isTeacher}
        onBack={() => setSelectedAssignment(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Classwork</h2>
        {isTeacher && (
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        )}
      </div>

      {assignments?.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No assignments yet</p>
          {isTeacher && (
            <p className="text-gray-500 text-sm mt-2">
              Create your first assignment to get started
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {assignments?.map((assignment) => (
            <Card
              key={assignment.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-indigo-300 border-2 border-transparent"
              onClick={() => setSelectedAssignment(assignment)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FileText className="h-5 w-5 text-indigo-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assignment.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 ml-12">
                      {assignment.instructions}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <div className="flex items-center space-x-1 text-indigo-600">
                      <Award className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {assignment.points} pts
                      </span>
                    </div>
                    {assignment.createdAt && (
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-xs">
                          {new Date(assignment.createdAt).toLocaleDateString(
                            "en-GB",
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Assignment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create Assignment
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the new assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Assignment title"
                value={assignmentData.title}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    title: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Provide detailed instructions for students"
                value={assignmentData.instructions}
                onChange={(e) =>
                  setAssignmentData({
                    ...assignmentData,
                    instructions: e.target.value,
                  })
                }
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="points">Points</Label>
                <Input
                  id="points"
                  type="number"
                  placeholder="100"
                  value={assignmentData.points}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      points: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={assignmentData.dueDate}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments</Label>
              <Input
                id="attachments"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              {attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {attachments.map((file) => (
                    <div key={file.id} className="text-sm text-gray-600">
                      📎 {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              onClick={handleCreateAssignment}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Create Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Classwork;
