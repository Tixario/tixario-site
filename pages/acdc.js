import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Remplace ces deux valeurs par les tiennes si besoin
const supabase = createClient(
  'https://efkwqqtxlvnsgtdaobsl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVma3dxcXR4bHZuc2d0ZGFvYnNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzODQxNjEsImV4cCI6MjA2MTk2MDE2MX0.x_0fbJC9-hJkkgkmchyHWVWEDdmsj3R6Fqp-4TUQ3uo'
);

export default function AcdcEventPage() {
  const [tickets, setTickets] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchTickets() {
      const { data, error } = await supabase
        .from('billets')
        .select('*')
        .eq('evenement', 'AC DC PARIS')
        .eq('date', '2025-08-09')
        .eq('disponible', true);
      if (!error) setTickets(data);
    }
    fetchTickets();
  }, []);

  const filteredTickets = filter
    ? tickets.filter((t) => t.categorie.toLowerCase().includes(filter.toLowerCase()))
    : tickets;

  const handleQuantityChange = (id, value) => {
    setQuantity((prev) => ({ ...prev, [id]: parseInt(value) }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">AC/DC Paris - 9 Août 2025</h1>
      <p className="mb-6">Choisissez vos billets pour ce concert mythique.</p>

      <input
        type="text"
        placeholder="Filtrer par catégorie..."
        className="border px-3 py-2 rounded mb-6 w-full"
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id_billet} className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <p className="font-semibold">{ticket.categorie}</p>
              <p>{ticket.prix} € — {ticket.quantite} billets dispo</p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <select
                className="border px-2 py-1 rounded mr-3"
                onChange={(e) => handleQuantityChange(ticket.id_billet, e.target.value)}
              >
                <option value="">Quantité</option>
                {Array.from({ length: ticket.quantite }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Acheter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
