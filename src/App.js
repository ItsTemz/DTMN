import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./components/layout/Alert";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { AlertProvider } from "./context/alert/AlertContext";
import { MovieDBProvider } from "./context/moviedb/MovieDBContext";
import About from "./pages/About";
import Home from "./pages/Home";
import ManualAdd from "./pages/ManualAdd";
import Movie from "./pages/Movie";
import MovieLibraryPage from "./pages/MovieLibraryPage";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

function App() {
  return (
    <MovieDBProvider>
      <AlertProvider>
        <Router>
          <div className=" flex flex-col w-screen justify-between">
            <Navbar />
            <main className="container mx-auto px-3 pb-12 h-screen">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/movielibrary" element={<MovieLibraryPage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route path="/addEntry" element={<ManualAdd />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
        {/* <Footer /> */}
      </AlertProvider>
    </MovieDBProvider>
  );
}

export default App;
