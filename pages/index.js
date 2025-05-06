// app/index/page.js
'use client';

import { useState, useEffect } from 'react';
import { supabaseClient } from '../lib/supabaseClient';

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const { data } = await supabaseClient
        .from('billets')
        .select('*')
        .order('date', { ascending: false });
      
      setEvents(data);
      setLoading(false);
    }

    loadEvents();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map(event => (
        <div key={event.id}>
          <Link href={`/events/${event.slug}`}>
            <a>
              <Card>
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                  <CardContent>
                    {/* Add event details */}
                  </CardContent>
                </CardHeader>
              </Card>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
