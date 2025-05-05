import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function EventPage() {
  const router = useRouter()
  const { event } = router.query
  const [billets, setBillets] = useState([])
  const [filtre, setFiltre] = useState('')

  useEffect(() => {
    if (!event) return

    async function fetchBillets() {
      const { data, error } = await supabase
        .from('billets')
        .select('*')
        .eq('slug', event)
        .eq('disponible', true)

      if (error) {
        console.error('Erreur de chargement des billets:', error)
      } else {
        setBillets(data)
      }
    }

    fetchBillets()
  }, [event])

  const billetsFiltres = filtre
    ? billets.filter((b) => b.categorie.toLowerCase().includes(filtre.toLowerCase()))
    : billets

  return (
    <div style={{ padding: '20px' }}>
      <h1>{event}</h1>
      <p>Choisissez vos billets pour cet événement.</p>

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
            <strong>{billet.categorie}</strong> — {billet.prix} € — {billet.quantite} places disponibles
          </li>
        ))}
      </ul>

      {billetsFiltres.length === 0 && (
        <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
          Aucun billet disponible pour cet événement.
        </p>
      )}
    </div>
  )
}

