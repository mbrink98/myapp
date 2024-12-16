'use client';

import { useState } from "react";

const create = async(content: string, author: string, addedby: string) => { 
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

// Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
         e.preventDefault(); // Prevent page reload
        await create(content, author, addedby); // Call the `create` function with the state values
     // Reset the form after submission (optional)
        setContent('');
        setAuthor('');
        setAddedby('');
};





        return(
        <form onSubmit={handleSubmit}>
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