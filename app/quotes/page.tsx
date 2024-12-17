import Link from 'next/link';

interface QuoteType {
    
      id: string;
      content: string;
      author:string;
      created: string;
   
  }
  interface QuoteProps {
    quote: QuoteType;
  }


async function getQuotes(){
    const res = await fetch('http://mbrink.uber.space/api/collections/quotes/records?page=1&perPage=30',
        {cache: 'no-store'}
    );

     const data = await res.json();
    return data?.items as QuoteType[];
}



export default async function QuotesPage(){
    const quotes = await getQuotes();
    return(
        <div>
            <h1>Quotes</h1>
            <div>
                {quotes?.map((quote) => (
                    <Quote key={quote.id} quote = {quote}/>
                ))}
            </div>
        </div>
    );
}    
// 
function Quote({quote}:QuoteProps){
    const{id,content,author} = quote || {};
    return(
        <Link href={`/quotes/${id}`}>
            <div>
                <h5>{content}</h5>
                <h3>{author}</h3>
        {/*}        <p>{created}</p> */}
            </div>
        </Link>




    )

}

