import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ACDCPage() {
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
    <div style={{ padding: '20px' }}>
      <h1>AC/DC Paris - 9 Août 2025</h1>
      <p>Choisissez vos billets pour ce concert mythique.</p>

      <input
        type="text"
        placeholder="Filtrer par catégorie..."
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px' }}
      />

      <ul>
  {billetsFiltres.map((billet) => (
    <li key={billet.id_billet}>
      <strong>{billet.categorie}</strong> – {billet.prix} € – {billet.quantite} places disponibles
    </li>
  ))}
</ul>

