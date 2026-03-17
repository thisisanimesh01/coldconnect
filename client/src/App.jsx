import SendMail from "./pages/SendMail";
import History from "./pages/History";

export default function App() {
  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center p-6">

      <div className="bg-indigo-50 shadow-2xl rounded-2xl p-8 w-full max-w-2xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ColdConnect - Animesh Yadav ✉️
        </h1>

        <SendMail />

      </div>

    </div>
  );
}