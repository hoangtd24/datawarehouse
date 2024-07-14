import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/UserContext";
import DefaultLayout from "./layouts/DefaultLayout";
import PrivateOutlet from "./routes/PrivateOutlet";
import Verify from "./routes/Verify";

const Home = lazy(() => import("./pages/Home/Home"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));

function App() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const element = useRoutes(
    isAuthenticated
      ? [
          {
            path: "",
            element: <PrivateOutlet />,
            children: [
              {
                path: "/profile",
                element: <Profile />,
              },
              {
                path: "/",
                element: (
                  <DefaultLayout>
                    <Home />
                  </DefaultLayout>
                ),
              },
            ],
          },
          {
            path: "",
            element: <Verify />,
            children: [
              {
                path: "/sign-in",
                element: <SignIn />,
              },
            ],
          },
        ]
      : [
          {
            path: "/",
            element: (
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            ),
          },
          {
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            path: "",
            element: <PrivateOutlet />,
            children: [
              {
                path: "/profile",
                element: <Profile />,
              },
            ],
          },
        ]
  );
  return element;
}

export default App;
