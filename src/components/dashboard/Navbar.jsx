import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createClassroom,
  joinClassroomByCode,
} from "../../store/slices/classroomSlice";
import { useSelector } from "react-redux";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [classroomData, setClassroomData] = useState({
    name: "",
    description: "",
  });
  const [classroomCode, setClassroomCode] = useState("");

  const handleCreateClassroom = () => {
    if (classroomData.name && classroomData.description) {
      dispatch(createClassroom(classroomData));
      setClassroomData({ name: "", description: "" });
      setCreateDialogOpen(false);
    }
  };

  const handleJoinClassroom = () => {
    if (classroomCode) {
      dispatch(joinClassroomByCode(classroomCode));
      setClassroomCode("");
      setJoinDialogOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Teachify
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full w-10 h-10 shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setCreateDialogOpen(true)}
                  className="cursor-pointer py-3"
                >
                  Create Classroom
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setJoinDialogOpen(true)}
                  className="cursor-pointer py-3"
                >
                  Join Classroom
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Create Classroom Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create Classroom
            </DialogTitle>
            <DialogDescription>
              Enter the details for your new classroom
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="className">Classroom Name</Label>
              <Input
                id="className"
                placeholder="e.g., Mathematics 101"
                value={classroomData.name}
                onChange={(e) =>
                  setClassroomData({ ...classroomData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="classDescription">Description</Label>
              <Textarea
                id="classDescription"
                placeholder="Brief description of the classroom"
                value={classroomData.description}
                onChange={(e) =>
                  setClassroomData({
                    ...classroomData,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <Button
              onClick={handleCreateClassroom}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Classroom Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Join Classroom
            </DialogTitle>
            <DialogDescription>
              Enter the classroom code provided by your teacher
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="classCode">Classroom Code</Label>
              <Input
                id="classCode"
                placeholder="Enter 8-character code"
                value={classroomCode}
                onChange={(e) => setClassroomCode(e.target.value)}
                maxLength={8}
              />
            </div>
            <Button
              onClick={handleJoinClassroom}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              Join
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
