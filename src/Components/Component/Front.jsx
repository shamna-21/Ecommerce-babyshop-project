
import image2 from "../Images/Image2.png";

import { Link } from "react-router-dom";

function Front() {
  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-red-100 via-red-200 to-red-300 py-8 overflow-hidden"
      style={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-md p-4 flex flex-col items-center space-y-3 text-center">
        <h1 className="text-3xl font-extrabold text-white leading-tight">
          NEW ARRIVALS ONLY
        </h1>
        <h2 className="text-5xl font-bold text-white">New</h2>
        <h2 className="text-4xl font-bold text-white">Collections</h2>
        <h3 className="text-2xl font-medium text-white">For Everyone</h3>
        <Link to="/">
          <button className="mt-4 px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300">
            Latest Collections
          </button>
        </Link>
      </div>
     
    </div>
  );
}

export default Front;
