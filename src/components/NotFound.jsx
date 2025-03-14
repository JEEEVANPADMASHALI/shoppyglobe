import { useRouteError } from "react-router-dom";

function NotFound() {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full text-center">
        <div className="text-6xl font-extrabold text-red-500 mb-4">Oops!</div>
        <div className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </div>
        <div className="text-lg text-gray-600 mb-6">
          The page you are looking for does not exist.
        </div>
        <div className="text-xl font-bold text-red-600 mb-2">
          {err.status} {err.statusText}
        </div>
        <div className="text-gray-500 mb-4">{err.data}</div>
        <div className="mt-4">
            <a href="/" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300">
                Go Home
            </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;