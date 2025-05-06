export default function Home() {
  console.log('test redeploy'); // ✅ à l'intérieur de la fonction

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">Hello depuis Tixario 🎟️</h1>
    </div>
  );
}
