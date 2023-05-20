import "antd/dist/reset.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Posts } from "./pages/Posts";
import { Post } from "./pages/Post";

import { AdminLayout } from "./components/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
