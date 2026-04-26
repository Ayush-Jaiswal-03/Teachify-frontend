import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedClassroom } from "../../store/slices/classroomSlice";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { X, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Sidebar = ({ isOpen, onClose, onClassroomClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classrooms, selectedClassroom } = useSelector(
    (state) => state.classroom,
  );
  const { user } = useSelector((state) => state.auth);

  const handleClassroomClick = (classroom) => {
    dispatch(setSelectedClassroom(classroom));
    if (onClassroomClick) onClassroomClick();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleBackToHome = () => {
    dispatch(setSelectedClassroom(null));
    if (onClassroomClick) onClassroomClick();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Classrooms
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Classrooms List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {classrooms.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No classrooms yet</p>
                  <p className="text-xs mt-1">
                    Create or join a classroom to get started
                  </p>
                </div>
              ) : (
                classrooms.map((classroom) => (
                  <button
                    key={classroom.id}
                    onClick={() => handleClassroomClick(classroom)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedClassroom?.id === classroom.id
                        ? "bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300"
                        : "hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <div className="font-medium text-gray-900 truncate">
                      {classroom.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      {classroom.description}
                    </div>
                    <div className="text-xs text-indigo-600 mt-1 font-medium">
                      Code: {classroom.code}
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Back to Home Button */}
          {selectedClassroom && (
            <div className="p-4 border-t border-gray-200">
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="w-full"
              >
                Back to All Classrooms
              </Button>
            </div>
          )}

          <Separator />

          {/* User Profile */}
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 text-sm truncate">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </div>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Manage Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
