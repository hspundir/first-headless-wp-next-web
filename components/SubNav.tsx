"use client";
import { useState, useEffect } from "react";

export interface NavSection{
    id: string;
    label: string;
}

interface SubNavProps{
    sections :  NavSection[];
}

export default function SubNav({ sections }: SubNavProps){
    const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
    const scrollToSection = (id: string) =>{
        setActiveId(id);
        const element= document.getElementById(id);
        if(element){
            element.scrollIntoView({behavior:"smooth"});
        }
    };
    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries)=>{
                entries.forEach((entry)=>{
                    // console.log(entry.target.id, entry.isIntersecting);
                    if(entry.isIntersecting){
                        setActiveId(entry.target.id);
                    }
                })
            },
           { rootMargin: "-20% 0px -60% 0px" }
        );

        sections.forEach((section)=>{
            const element = document.getElementById(section.id);
            if(element){
                observer.observe(element);
            }
        });

        return ()=>{
            observer.disconnect();
        };
    }, [sections]);

    return(
        <nav className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto">
                {sections.map((section)=>(
                    <button
                    key={section.id}
                    onClick={()=>scrollToSection(section.id)}
                    className={`py-3 text-sm font-medium transition-colors border-b-2 ${activeId === section.id ? "border-amber-600 text-amber-600": "border-transparent text-gray-500 hover:text-gray-900"}`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}
