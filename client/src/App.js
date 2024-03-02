// import logo from './logo.svg';
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorMain from "./components/Editor/EditorMain";
import Homepage from "./components/Homepage";
import SocketContext from "./context/SocketContext";
// import Login from "./components/Login";
// import SlideContextProvider from "./context/SlideContext";
// import TabContextProvider from "./context/TabContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/editor',
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
