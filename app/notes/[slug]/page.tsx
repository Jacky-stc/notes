import { getPostMetaData } from "@/lib/post"
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/a11y-dark.css"


export default async function Notes({params}:{params: Promise<{slug:string}>}){
    const slug = (await (params)).slug
    console.log(decodeURIComponent(slug))
    const notes = getPostMetaData()
    console.log(notes)
    const note = notes.filter((note)=>note.slug === decodeURIComponent(slug))[0]
    return(
        <div className="flex-1 whitespace-break-spaces p-6">
            <section>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]} >{note.content}</ReactMarkdown>
            </section>
        </div>
    )
}