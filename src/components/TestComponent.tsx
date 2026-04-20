export function TestComponent() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-4">Tailwind CSS Test</h1>
      <p className="text-purple-100 text-lg">If you see this styled properly, Tailwind is working!</p>
      <button className="mt-4 px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
        Test Button
      </button>
    </div>
  )
}
