import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    console.log("Login data:", email, password);

    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md bg-zinc-200 text-zinc-800 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center gap-5 mb-6">
          <div className="logo"></div>
          <h1 className="text-2xl font-bold">DWELLIFY</h1>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <div className="bg-red-500/20 text-red-400 p-2 text-sm rounded">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-zinc-300 border border-zinc-400 focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded bg-zinc-300 border border-zinc-400 focus:outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              className="absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer text-gray-400"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <button
            type="submit"
            className="bg-zinc-600 text-white hover:bg-zinc-700 p-3 rounded font-semibold transition select-none cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Not an admin?{" "}
          <Link
            to={"/"}
            className="text-black cursor-pointer hover:underline"
          >
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
