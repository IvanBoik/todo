import './App.css';
import TodayTasksPage from "./pages/today_tasks/TodayTasksPage";
import {Route, Routes} from "react-router-dom";
import {CreateAndUpdateContext} from "./context";
import {useState} from "react";
import AuthPage from "./pages/auth_page/AuthPage";
import Profile from "./pages/profile/Profile";
import LogsPage from "./pages/logs_page/LogsPage";
import AllTasks from "./pages/all_tasks/AllTasks";

function App() {
    const [isTaskUpdatingCtx, setIsTaskUpdatingCtx] = useState(false);
    const [isTaskCreatingCtx, setIsTaskCreatingCtx] = useState(false);
    const [updatingTaskIDCtx, setUpdatingTaskIDCtx] = useState(0);
  return (
      <CreateAndUpdateContext.Provider value={{
          isTaskUpdatingCtx,
          setIsTaskUpdatingCtx,
          isTaskCreatingCtx,
          setIsTaskCreatingCtx,
          updatingTaskIDCtx,
          setUpdatingTaskIDCtx
      }}>
          <div className="App">
              <Routes>
                  <Route path="/" element={<AuthPage/>}/>
                  <Route path="/all" element={<AllTasks/>}/>
                  <Route path="/today" element={<TodayTasksPage/>}/>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/logs" element={<LogsPage/>}/>
              </Routes>
          </div>
      </CreateAndUpdateContext.Provider>
  );
}

export default App;
