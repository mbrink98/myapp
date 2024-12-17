
interface ParamsType {
    params: {
      id: string;
    };
  }

async function getQuote(quoteId:string){
    const res = await fetch(
        `mbrink.uber.space/api/collections/quotes/records/${quoteId}`,
        {
            next:{revalidate: 10},
        }
    );
    const data = await res.json();
    return data;
}



export default async function QuotePage({params}: ParamsType){
    const quote = await getQuote(params.id);
    quote.created = quote.created.split(' ')[0];
    return (
        <div>
            <h1>quotes/{quote.id}</h1>
                <div>
                    <h5>{quote.content}</h5>
                    <h3>{quote.author}</h3>
                    <p>Quote added on: {quote.created}</p>
                </div>
        </div>





    );



}