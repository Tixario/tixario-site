import { supabase } from '../lib/supabaseClient'

export async function getStaticPaths() {
  const { data, error } = await supabase.from('billets').select('slug')

  const slugsUniques = [...new Set(data.map((b) => b.slug))]

  const paths = slugsUniques.map((slug) => ({
    params: { slug }
  }))

  return {
    paths,
    fallback: 'blocking', // ou 'blocking' si tu veux générer à la volée
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const { data, error } = await supabase
    .from('billets')
    .select('*')
    .eq('slug', slug)
    .eq('disponible', true)

  return {
    props: {
      billets: data,
      slug
    }
  }
}

export default function EventPage({ billets, slug }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{slug.replace(/-/g, ' ').toUpperCase()}</h1>
      <p>Choisissez vos billets pour cet événement.</p>

      <ul>
        {billets.length > 0 ? (
          billets.map((billet) => (
            <li key={billet.id_billet}>
              <strong>{billet.categorie}</strong> — {billet.prix} € — {billet.quantite} places disponibles
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
