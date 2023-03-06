import { Route, Routes } from 'react-router-dom';
import './App.css';
import Missions from './component/Missions';
import MyProfile from './component/MyProfile';
import Header from './component/Header';
import NotFound from './component/NotFound';
import Rockets from './component/Rockets';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<MyProfile />}
        />
        <Route
          path="/missions"
          element={<Missions />}
        />
        <Route
          path="/rockets"
          element={<Rockets />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
