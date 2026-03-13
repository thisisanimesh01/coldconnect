import SendMail from "./pages/SendMail";
import History from "./pages/History";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ColdConnect ✉️
        </h1>

        <SendMail />

      </div>

    </div>
  );
}