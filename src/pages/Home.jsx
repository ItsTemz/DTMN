import MovieLibrary from "../components/MovieLibrary/MovieLibrary";

const styles = {
  justifyContent: "center",
  alignContent: "center",
  display: "flex",
};

function Home() {
  return (
    <div className="">
      <MovieLibrary />
    </div>
  );
}

export default Home;
