import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouteProps,
} from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import {
  CreateFlower,
  CreateProject,
  Dashboard,
  EditFlower,
  EditProject,
  EditProjectDetails,
  Flowers,
  Login,
  ProjectDetails,
  Projects,
  SignUp,
} from "./pages";
import { RootState } from "./redux";

type ProtectedRouteProps = {
  children: JSX.Element;
};

const P: React.FC<ProtectedRouteProps> = ({ children }) => {
  const loggedIn = useSelector((state: RootState) => !!state.app.token);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const App = () => (
  <AppContextProvider>
    <Router>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <P>
                <Dashboard />
              </P>
            }
          />
          <Route
            path="/projects"
            element={
              <P>
                <Projects />
              </P>
            }
          />
          <Route
            path="/projects/create"
            element={
              <P>
                <CreateProject />
              </P>
            }
          />
          <Route
            path="/projects/:id/details"
            element={
              <P>
                <ProjectDetails />
              </P>
            }
          />
          <Route
            path="/projects/:id/details/edit"
            element={
              <P>
                <EditProjectDetails />
              </P>
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <P>
                <EditProject />
              </P>
            }
          />
          <Route
            path="/flowers"
            element={
              <P>
                <Flowers />
              </P>
            }
          />
          <Route
            path="/flowers/create"
            element={
              <P>
                <CreateFlower />
              </P>
            }
          />
          <Route
            path="/flowers/:id/edit"
            element={
              <P>
                <EditFlower />
              </P>
            }
          />
          <Route path="/secret" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  </AppContextProvider>
);
