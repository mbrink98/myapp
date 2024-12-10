'use client';

import { useState } from "react";

const create = async() => { 
    await fetch('http://127.0.0.1:8090/api/collections/quotes/records',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({
            content,
            author,
            addedby,
        }),
    });

}
export default function CreateQuote(){
    const[author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const[addedby,setAddedby] = useState('');
        return(
        <form onSubmit={create}>
            <h3>Create a new Quote</h3>
            <input 
                type="text"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <textarea name="addauthor" id=""
            placeholder="content"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}>
            </textarea>
            <textarea name="addedby" id=""
            placeholder="content"
            value={addedby}
            onChange={(e) => setAddedby(e.target.value)}>
            </textarea>
            <button type ="submit">
             Add Quote
            </button>

        </form>

    );
}