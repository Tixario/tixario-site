import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ACDCPage() {
  console.log("🎯 Composant ACDCPage rendu");
console.log("🔐 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("🔐 Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log("📡 Supabase client:", supabase)

  const [billets, setBillets] = useState([])
  const [filtre, setFiltre] = useState('')

  useEffect(() => {
    async function fetchBillets() {
      let { data, error } = await supabase
        .from('billets')
        .select('*')
        .eq('evenement', 'AC DC PARIS')
        .eq('disponible', true)

      if (error) {
        console.error('Erreur de chargement des billets:', error)
      } else {
        console.log('DATA FROM SUPABASE:', data)
setBillets(data)
      }
    }

    fetchBillets()
  }, [])

  const billetsFiltres = filtre
    ? billets.filter((b) => b.categorie.includes(filtre))
    : billets

 return (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-red-500 text-white p-4 mb-6">Test visuel</div>
    <h1 className="text-3xl font-bold mb-2">AC/DC Paris – 9 Août 2025</h1>
    <p className="mb-6 text-gray-700">Choisissez vos billets pour ce concert mythique.</p>

    <input
      type="text"
      placeholder="Filtrer par catégorie..."
      value={filtre}
      onChange={(e) => setFiltre(e.target.value)}
      className="mb-6 p-2 w-full border rounded"
    />

    {billetsFiltres.length === 0 ? (
      <p className="text-gray-500 italic">Aucun billet disponible.</p>
    ) : (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {billetsFiltres.map((billet) => (
          <div key={billet.id_billet} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-1">{billet.categorie}</h2>
            <p className="mb-2 text-gray-600">
              {billet.prix} € — {billet.quantite} billet{billet.quantite > 1 ? 's' : ''} dispo
            </p>

            <div className="flex items-center gap-2">
              <select className="border px-2 py-1 rounded">
                {Array.from({ length: billet.quantite }, (_, i) => i + 1).map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                Acheter
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)
