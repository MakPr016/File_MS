import FolderImage from "../assets/folder.svg";
const LandingPage = () => (
  <div className="flex flex-col items-center text-center px-6 py-16 space-y-32 text-gray-800">

    <section className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="lg:w-1/2 space-y-6 text-left">
        <h1 className="text-5xl font-extrabold leading-tight">
          Welcome to <span className="text-blue-600">File MS</span>
        </h1>
        <p className="text-lg text-gray-600">
          Organize your files, folders, and more with powerful features designed for speed and simplicity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/signup"
            className="px-6 py-3 text-lg bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition duration-200"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="px-6 py-3 text-lg border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition duration-200"
          >
            Already have an account?
          </a>
        </div>
      </div>
      <div className="lg:w-1/2 w-[95%] h-[70vh] lg:h-96 mx-auto">
        <div className="w-full h-full max-sm:h-100 rounded-2xl shadow-inner flex items-center justify-center">
          <img src={FolderImage} alt="Folder" className="w-100 h-100 max-sm:h-50" />
        </div>
      </div>

    </section>

    <section className="w-full max-w-5xl">
      <h2 className="text-4xl font-bold mb-10">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          {
            title: "Sign Up",
            desc: "Create your free account to start managing files easily.",
          },
          {
            title: "Upload & Organize",
            desc: "Upload your files and let our smart system organize them for you.",
          },
          {
            title: "Access Anywhere",
            desc: "View and manage your files securely on any device.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-8 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="w-14 h-14 mb-4 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
              {`0${index + 1}`}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>

        ))}
      </div>
    </section>

    <section className="w-full max-w-5xl">
      <h2 className="text-4xl font-bold mb-10">Features</h2>
      <div className="grid md:grid-cols-3 gap-8 text-left">
        {[
          {
            title: "Smart Organization",
            desc: "Automatically sort, group, and tag files for better structure.",
          },
          {
            title: "Seamless Sharing",
            desc: "Share files instantly with customizable access and permissions.",
          },
          {
            title: "Powerful Search",
            desc: "Find exactly what you need in seconds with intelligent search tools.",
          },
        ].map((feature, index) => (
          <div key={index} className="p-6 text-center h-45 flex flex-col justify-center align-center bg-white rounded-2xl shadow hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default LandingPage;
