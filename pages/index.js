import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export async function getStaticProps() {
  const { data, error } = await supabase.from('billets').select('slug, evenement')

  if (error) {
    console.error('Erreur de chargement des événements :', error)
    return { props: { evenements: [] } }
  }

  // Supprimer les doublons par slug
  const slugsUniques = Array.from(
    new Map(data.map((e) => [e.slug, e])).values()
  )

  return {
    props: {
      evenements: slugsUniques
    }
  }
}

export default function Home({ evenements }) {
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
