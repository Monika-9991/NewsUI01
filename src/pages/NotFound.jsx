import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="text-4xl font-black text-blue-600 mb-2">404</h1>
      <p className="text-slate-400 text-xs mb-4">Page template not found.</p>
      <Link to="/" className="text-xs bg-blue-600 text-white px-4 py-2 rounded-xl font-bold uppercase">Home Feed</Link>
    </div>
  );
}