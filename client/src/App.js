// import logo from './logo.svg';
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorMain from "./components/Editor/EditorMain";
import Homepage from "./components/Homepage";
import SocketContext from "./context/SocketContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/editor/:roomID',
    element: <EditorMain />,
  }
])

function App() {
  return (
    <div className="App">
        <SocketContext>
          <RouterProvider router={router} />
        </SocketContext>
      </div>
    //   {/* <Homepage /> */}
    //   {/* <Outlet /> */}
    // </div>
  );
}

export default App;
