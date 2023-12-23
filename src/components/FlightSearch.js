import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FlightSearch = () => {
  // State değişkenleri
  const [departureAirport, setDepartureAirport] = useState('');
  const [destinationAirport, setDestinationAirport] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [oneWay, setOneWay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [sortOption, setSortOption] = useState('departureTime');
  const [error, setError] = useState('');

  // Havaalanı listesi (simüle edilen veri)
  const airports = [
    { code: 'IST', city: 'İstanbul' },
    { code: 'ANK', city: 'Ankara' },
    { code: 'ADB', city: 'İzmir' },
    {code: 'AYT', city: 'Antalya' },
    {code:'EDO',city: 'Balıkesir'},
    {code: 'CKZ', city: 'Çanakkla'},
    {code: 'DNZ', city: 'Denizli' },
    {code: 'AOE', city:'Eskişehir' },
    {code: 'DLM', city:'Muğla' },
    {code: 'NAV', city:'Nevşehir' },
    {code: 'SZF', city:'Samsun' },
    {code: 'TZX', city:'Trabzon' },
    // Diğer havaalanları...
  ];

  // Mock uçuş verisi (simüle edilen veri)
  const mockFlights = [
    { id: 1, departureTime: '12:00', returnTime: '15:00', duration: '1 saat', price: 200, airline: 'THY', city: 'Istanbul' },
    { id: 2, departureTime: '14:30', returnTime: '17:30', duration: '2 saat', price: 250, airline: 'AnadoluJet', city: 'Ankara' },
    { id: 3, departureTime: '13:00', returnTime: '15:00', duration: '3 saat', price: 400, airline: 'Pegasus', city: 'Trabzon' },
    { id: 4, departureTime: '13:30', returnTime: '16:30', duration: '3 saat', price: 500, airline: 'THY', city: 'Nevşehir' },
    // Diğer uçuşlar...
  ];

  // Uçuş listesini güncelleme
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simüle edilen asenkron bir API çağrısı
        const response = await fetchFlightData();

        // Uçuşları güncelle
        setFlights(response);
      } catch (error) {
        setError('Uçuş bilgileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [departureAirport, destinationAirport, oneWay, sortOption]);

  // Simüle edilen asenkron API çağrısı
  const fetchFlightData = () => {
    return new Promise((resolve) => {
      // Simüle edilen API çağrısı, gerçek projede sunucudan alınan verileri içermelidir.
      setTimeout(() => {
        resolve(mockFlights);
      }, 2000);
    });
  };

  // Uçuşları sıralama
  const sortFlights = (flightsToSort) => {
    return flightsToSort.sort((a, b) => {
      switch (sortOption) {
        case 'departureTime':
          return a.departureTime.localeCompare(b.departureTime);
        case 'returnTime':
          return a.returnTime.localeCompare(b.returnTime);
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'price':
          return a.price - b.price;
        default:
          return 0;
      }
    });
  };

  // Arama işlemini başlat
  const handleSearch = () => {
    // Burada arama işlemleri yapılabilir
    console.log('Arama yapıldı:', {
      departureAirport,
      destinationAirport,
      departureDate,
      returnDate,
      oneWay,
      flights,
    });
  };

  return (
    <div>
      <h1>Flight Search</h1>
      <label>
        Kalkış Havalimanı:
        <input type="text" value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} />
      </label>
      <label>
        Varış Havalimanı:
        <input type="text" value={destinationAirport} onChange={(e) => setDestinationAirport(e.target.value)} />
      </label>
      <label>
        Kalkış Tarihi:
        <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} dateFormat="yyyy-MM-dd" />
      </label>
      <label>
        Dönüş Tarihi:
        <DatePicker
          selected={returnDate}
          onChange={(date) => setReturnDate(date)}
          dateFormat="yyyy-MM-dd"
          disabled={oneWay}
        />
      </label>
      <label>
        Tek Yönlü Uçuş:
        <input type="checkbox" checked={oneWay} onChange={() => setOneWay(!oneWay)} />
      </label>
      <label>
        Sıralama:
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="departureTime">Kalkış Saati</option>
          <option value="returnTime">Dönüş Saati</option>
          <option value="duration">Uçuş Süresi</option>
          <option value="price">Fiyat</option>
        </select>
      </label>
      <button onClick={handleSearch}>Ara</button>

      {/* Yükleniyor durumu */}
      {loading && <p>Yükleniyor...</p>}

      {/* Hata durumu */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Uçuş listesi */}
      {flights.length > 0 && (
        <div>
          <h2>Uçuş Listesi</h2>
          <ul>
            {sortFlights(flights).map((flight) => (
              <li key={flight.id}>
                Kalkış Saati: {flight.departureTime}, Dönüş Saati: {flight.returnTime}, Uçuş Süresi: {flight.duration}, Fiyat: {flight.price} TL
                <br />
                Havayolu: {flight.airline}, Şehir: {flight.city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
