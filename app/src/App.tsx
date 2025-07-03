import { Link, Outlet } from "react-router";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <header className="bg-[#ff0032] text-white p-4 mb-4">
        <nav>
          <Link
            to="/"
            className="text-white hover:underline"
            aria-label="Go to home page"
          >
            <h1 className="text-2xl font-bold">Gousto</h1>
          </Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
