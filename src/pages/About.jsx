function About() {
  return (
    <div>
      <h1 className="text-6xl mb-4">Duck Talk Movie Picker</h1>
      <p className="mb-4 text-2xl font-light">
        An app to pick random movie from a list of movies added by users in a
        discord server. Created by{" "}
        <strong>
          <a
            href="https://github.com/ItsTemz"
            className="font-semibold text-gray-700"
            target="_blank"
            rel="noreferrer"
          >
            Temwani Munthali
          </a>
        </strong>
        .
      </p>
    </div>
  );
}

export default About;
