import { Login } from "./login/Login";
import { Home } from "./home/Home";

import { useHelloWorld } from "./near/useHelloWorld";

import { User } from "./user/User";
import "./App.css";

function App() {
  const { isAuthenticated } = useHelloWorld();
  return (
    <div className="app">
      {isAuthenticated ? (
        <>
          <User />
          <Home />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
