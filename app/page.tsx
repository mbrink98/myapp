async function getQuoteOfTheDay(){    //er holt alle quotes vllt müsste man nur die eine holen, da die anzahl der quotes jedoch nicht einfach zu verfügung steht & die qutoe ids nicht sequential sidn bisher keine bessere lösung
  const res = await fetch(                //er holt nur die erste page mit 30 seiten, random algo sollte beinhalten dass er random page nimmt oder die id auf pages mod 30 dann auf der richtigen page nimmt
      `http://mbrink.uber.space/api/collections/quotes/records?page=1&perPage=30&expand=authorpic`,
      {
          next:{revalidate: 10},
      }
  );


  const data = await res.json();
  console.log(data.items[0]);
  console.log(data.items[0].expand); // Sollte authorpic enthalten

  const quotes = data.items; // Array of quotes
  const today = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Example: '20241209'
  let hash = 0;
 // console.log("today.length = " + today.length)
  for (let i = 0; i < today.length; i++) {
    hash = (hash * 31 + today.charCodeAt(i)); // 31 is a prime number to spread values
    console.log("hash: "+hash);
    console.log(today.charCodeAt(i));
  }
  const randomIndex = Math.abs(hash) % quotes.length;
/* console.log("quotes.length = "+ quotes.length);
  console.log("randomindex: " + randomIndex);
  console.log(quotes[randomIndex]);
  console.log("today: "+today);
  console.log("hash: " +hash);  */
  return quotes[randomIndex];
}

export default async function Home() {
  const quote = await getQuoteOfTheDay();
  const pic = quote.expand?.authorpic;
  const imageUrl = pic
    ? `https://mbrink.uber.space/api/files/pictures/${pic.id}/${pic.headshot}`
    : null;
  return (
    <div className="page">
      <div className="centered-container">
        <h1 className="qotd"> Quote of the Day:</h1>
        <h2 className="quote">&quot;{quote.content}&quot;</h2>
        <div className="qotd-author-row">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={`Portrait von ${quote.author}`}
              className="author-pic"
              loading="lazy"
            />
          )}
          <h3 className="author-name">{quote.author}</h3>
      </div>
    </div>
    </div>
  );
}
