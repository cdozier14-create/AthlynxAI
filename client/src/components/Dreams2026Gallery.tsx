export default function Dreams2026Gallery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
      <div className="text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Dreams Do Come True — 2026
        </h1>
        <p className="text-xl text-blue-200 mb-8">
          The ATHLYNX Vision Gallery — Where Champions Are Made
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {["Youth to Pro", "NIL Mastery", "Career Command", "Global Network", "10 Apps", "247 VIP Members"].map((item) => (
            <div key={item} className="bg-blue-900/40 border border-blue-700/50 rounded-xl p-6">
              <p className="text-white font-semibold text-lg">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
