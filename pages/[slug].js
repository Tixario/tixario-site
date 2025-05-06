// pages/[slug].js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabaseClient } from '../lib/supabaseClient';

export default function EventPage() {
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEventData() {
      const slug = router.query.slug;
      
      if (!slug) return;
      
      setLoading(true);
      const { data } = await supabaseClient
        .from('billets')
        .select('*')
        .eq('slug', slug)
        .single();
        
      setEvent(data);
      setLoading(false);
    }

    fetchEventData();
  }, [router.query.slug]);

  if (!router.isReady || loading) return (
    <div className="container mx-auto py-8">
      <p>Chargement...</p>
    </div>
  );

  if (!event) return (
    <div className="container mx-auto py-8">
      <h1>Événement non trouvé</h1>
    </div>
  );

  return (
    <div className="container mx-auto py-8">
      <h1>{event.evenement}</h1>
      <p>Date: {new Date(event.date).toLocaleDateString('fr-FR')}</p>
      <p>Catégorie: {event.categorie}</p>
      <p>Prix: {event.prix} €</p>
      <p>Quantité disponible: {event.quantite}</p>
    </div>
  );
}
