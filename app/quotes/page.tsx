import Link from 'next/link';

interface QuoteType {
    
      id: string;
      content: string;
      author:string;
      created: string;
      authorpic:string;
      expand?: {
        authorpic?: PictureType;
  };
   
  }
interface PictureType {
  id: string;
  image: string;
  headshot: string;
  collectionId: string;
}

  interface QuoteProps {
    quote: QuoteType;
  }


async function getQuotes(){
    const res = await fetch(  "https://mbrink.uber.space/api/collections/quotes/records?expand=authorpic",
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
    const pic = quote.expand?.authorpic;
    const imageUrl = pic
    ? `https://mbrink.uber.space/api/files/pictures/${pic.id}/${pic.headshot}`
    : null;
    //console.log("asdasd");
    //console.log("Drini: ",quote );
    //console.log('Pic', pic);




    return(
        <Link href={`/quotes/${id}`}>
            <div className="quote-listitem">
                   
                <h5 className="quote-text">{content}</h5>
                <div className="author-row">
                 {imageUrl && (
          <img
           src={imageUrl}
               alt={`Portrait von ${author}`}
                className="author-pic"
            loading="lazy"
              />
              )}
         <h3>{author}</h3>
         </div>
        {/*}        <p>{created}</p> */}
            </div>
        </Link>




    )

}

