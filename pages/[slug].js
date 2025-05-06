import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function EventPage() {
  const router = useRouter()
  const { slug } = router.query
  const [billets, setBillets] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtre, setFiltre] = useState('')

  useEffect(() => {
    if (!slug) return

    async function fetchBillets() {
      const { data, error } = await supabase
        .from('billets')
        .select('*')
        .eq('slug', slug)
        .eq('disponible', true)

      if (error) {
        console.error('Erreur chargement billets:', error)
      } else {
        setBillets(data)
      }
      setLoading(false)
    }

    fetchBillets()
  }, [slug])

  const billetsFiltres = filtre
    ? billets.filter((b) => b.categorie.toLowerCase().includes(filtre.toLowerCase()))
    : billets

  if (loading) return <div style={{ padding: '20px' }}>Chargement...</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>{slug.replace(/-/g, ' ').toUpperCase()}</h1>
      <p>Choisissez vos billets pour cet événement :</p>

      <input
        type="text"
        placeholder="Filtrer par catégorie..."
        value={filtre}
        onChange={(e) => setFiltre(e.target.value)}
        style={{ marginBottom: '20px', padding: '8px' }}
      />

      <ul>
        {billetsFiltres.length > 0 ? (
          billetsFiltres.map((billet) => (
            <li key={billet.id_billet}>
              <strong>{billet.categorie}</strong> — {billet.prix} € — {billet.quantite} places dispo
            </li>
          ))
        ) : (
          <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
            Aucun billet disponible pour cet événement.
          </p>
        )}
      </ul>
    </div>
  )
}
