// app/events/[slug]/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabaseClient } from '../lib/supabaseClient';

export async function generateStaticParams() {
  const { data } = await supabaseClient
    .from('billets')
    .select('slug')
    .order('created_at', { ascending: false });
  
  return {
    paths: data.map(event => ({
      params: { slug: event.slug }
    })),
    fallback: 'blocking'
  };
}

export default function EventPage({ initialData }) {
  const [event, setEvent] = useState(initialData);
  
  useEffect(() => {
    // Optional: fetch fresh data on client-side hydration
    async function refreshData() {
      const { data } = await supabaseClient
        .from('billets')
        .select('*')
        .eq('slug', window.location.pathname.split('/').pop())
        .single();
      
      setEvent(data);
    }
    
    refreshData();
  }, []);
  
  if (!event) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{event.name}</h1>
      {/* Add ticket details */}
    </div>
  );
}
