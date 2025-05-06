import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [evenements, setEvenements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvenements() {
      const { data, error } = await supabase
        .from('billets')
        .select('slug, evenement')

      if (error) {
        console.error('Erreur chargement événements:', error)
      } else {
        const uniques = Array.from(new Map(data.map(e => [e.slug, e])).values())
        setEvenements(uniques)
      }

      setLoading(false)
    }

    fetchEvenements()
  }, [])

  if (loading) return <p style={{ padding: '20px' }}>Chargement...</p>

  return (
    <div style={{ padding: '40px' }}>
      <h1>🎟️ Bienvenue sur Tixario</h1>
      <p>Sélectionnez un événement ci-dessous :</p>

      <ul style={{ marginTop: '30px' }}>
        {evenements.map((e) => (
          <li key={e.slug} style={{ marginBottom: '12px' }}>
            <Link href={`/${e.slug}`} legacyBehavior>
              <a style={{ fontSize: '18px', color: 'blue', textDecoration: 'underline' }}>
                {e.evenement}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
