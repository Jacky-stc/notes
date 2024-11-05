'use client'

import { PostInfo } from "@/lib/post"
import Link from "next/link"
import React, { useState } from "react"

const Sidebar = ({posts}:{posts:PostInfo[]}) => {
    const [toggleCategories, setToggleCategories] = useState<string[]>([])
    const categories = Array.from(new Set(posts.map((post)=>post.category)))
    const handleToggle = (category:string)=>{
        if(toggleCategories.includes(category)){
            setToggleCategories((prev)=>prev.filter((prevCat)=>prevCat !== category))
        }else{
            setToggleCategories((prev)=>[...prev, category])
        }
    }
  return (
    <div className='w-[280px] border-r border-neutral-600'>
      <nav className='px-2 py-1'>
        <ul>
            {categories.map((category)=>
                <React.Fragment key={category}>
                <li className='px-3 py-1 my-1 hover:bg-neutral-700 rounded cursor-pointer flex justify-between items-center' key={category} onClick={()=>{handleToggle(category)}}>
                    <p className="inline">{category}</p>
                    <svg width="20px" height="20px" viewBox="0 0 960 560" fill="#fff" className={`inline transition-transform duration-350 ease-in ${toggleCategories.includes(category)?" rotate-180":"rotate-0"}`}>
                    <g id="Rounded_Rectangle_33_copy_4_1_">
                        <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937   c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937   c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
                    </g>
                    </svg>
                </li>
                <ul className={`${toggleCategories.includes(category)?"max-h-40":"max-h-0"} overflow-hidden transition-max-height duration-300 ease-in`}>
                    {posts.filter((post)=>post.category === category).map((post)=>
                        <Link href={`/notes/${post.title}`} key={post.title}>
                            <li className="pl-7 py-1 my-1 hover:bg-neutral-700 rounded cursor-pointer">
                            {post.title}
                            </li>
                        </Link>
                    )}
                </ul>
                </React.Fragment>
            )}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
