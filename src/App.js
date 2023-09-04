import './App.css';
import Banner from './components/Banner/Banner';
import Navbar from './components/Navbar/Nav';
import Row from './components/Row/Row';
import categories from './services/api';

function App() {
  return (
    <div className="App">

      <Navbar />
      
      <Banner />

      {categories.map((category, index) => {
        return <Row key={category.name} title={category.title} path={category.path} isLarge={category.isLarge}/>
      })}
    </div>
  );
}

export default App;
