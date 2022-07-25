import UserLoggedProvider from "./context/user";
import HandleLogin from "./components/User/HandleLogin";

const App = () => {
  return (
    <UserLoggedProvider>
      <div className='App'>
        <HandleLogin />
      </div>
    </UserLoggedProvider>
  )
}

export default App;
