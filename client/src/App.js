// import logo from './logo.svg';
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import EditorMain from "./components/Editor/EditorMain";
import Homepage from "./components/Homepage";
import SocketContext from "./context/SocketContext";
import FileContextProvider from './context/FileContext';
import './assets/scss/common.scss'
import './assets/scss/customs.scss'
import SettingContextProvider from "./context/SettingContext";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
  },
  {
    path: '/editor/:roomID',
    element: <FileContextProvider><SettingContextProvider><EditorMain /></SettingContextProvider></FileContextProvider>,
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
