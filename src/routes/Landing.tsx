function Landing() {
  return (
    <div className="relative flex flex-col w-full h-full max-w-7xl">
      <div className="relative h-full hero bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Secure Enterprise File Sharing
            </h1>
            <p className="py-6">
              Easily share and collaborate on files with your team, no matter
              where you are.
            </p>
            <a href="/get-started" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
