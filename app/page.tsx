async function getQuoteOfTheDay(){    //er holt alle quotes vllt müsste man nur die eine holen, da die anzahl der quotes jedoch nicht einfach zu verfügung steht & die qutoe ids nicht sequential sidn bisher keine bessere lösung
  const res = await fetch(
      `http://127.0.0.1:8090/api/collections/quotes/records/`,
      {
          next:{revalidate: 10},
      }
  );
  const data = await res.json();
  const quotes = data.items; // Array of quotes
  const today = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Example: '20241209'
  let hash = 0;
  console.log("today.length = " + today.length)
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)); // 31 is a prime number to spread values
    console.log("hash: "+hash);
    console.log(today.charCodeAt(i));
  }
  const randomIndex = Math.abs(hash) % quotes.length;
  console.log("quotes.length = "+ quotes.length);
  console.log("randomindex: " + randomIndex);
  console.log(quotes[randomIndex]);
  console.log("today: "+today);
  console.log("hash: " +hash);
  return quotes[randomIndex];
}

export default async function Home() {
  const quote = await getQuoteOfTheDay();
  return (
    <div className="centered-container">
      <h1> Quote of the Day:</h1>
      <h2>&quot;{quote.content}&quot;</h2>
      <h3>-{quote.author}</h3>
      <p></p>
    </div>
  );
}
