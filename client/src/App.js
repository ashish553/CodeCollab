// import logo from './logo.svg';
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import SocketContext from "./context/SocketContext";
import FileContextProvider from './context/FileContext';
import './assets/scss/common.scss'
import './assets/scss/customs.scss'
import SettingContextProvider from "./context/SettingContext";
import Homepage from "./pages/Homepage";
import EditorMain from "./pages/EditorMain";

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
          {/* <FileContextProvider> */}
            <RouterProvider router={router} />
          {/* </FileContextProvider> */}
        </SocketContext>
      </div>
    //   {/* <Homepage /> */}
    //   {/* <Outlet /> */}
    // </div>
  );
}

export default App;
