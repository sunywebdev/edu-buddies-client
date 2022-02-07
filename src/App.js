import "./App.css";
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      {/* <!-- content goes here --> */}
      <div className="py-32 text-center">
        <h2 className="font-light text-6xl text-sky-300">
          Don't worry it's just a demo, we will change everything.
        </h2>
        <br />
        <br />
        <br />
        <br />
        <h3 className="font-light text-4xl text-sky-300 uppercase">
          Development Branch
        </h3>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
