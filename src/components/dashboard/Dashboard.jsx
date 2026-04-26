import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserClassrooms,
  setSelectedClassroom,
} from "../../store/slices/classroomSlice";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ClassroomList from "./ClassroomList";
import ClassroomDetail from "./ClassroomDetail";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedClassroom } = useSelector((state) => state.classroom);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  // console.log("SELECTED CLASSROOM: ", selectedClassroom);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserClassrooms());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClassroomClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Navbar />

      <div className="flex">
        {/* Mobile menu button */}
        {!sidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-20 left-4 z-40 md:hidden bg-white shadow-lg rounded-lg"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onClassroomClick={handleClassroomClick}
        />

        {/* Main content */}
        <div
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-0" : "ml-0"}`}
        >
          <div className="p-4 md:p-6 lg:p-8">
            {selectedClassroom ? (
              <ClassroomDetail classroom={selectedClassroom} />
            ) : (
              <ClassroomList />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
