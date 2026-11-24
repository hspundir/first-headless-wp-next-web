"use client";
import {useState} from "react";
//Ek strict Interface (naksha)
interface TempleCard{
    id:number;
    title:string;
    location:string;
    // Union type: status sirf in teenon me se ek hi ho sakta hai
    status:"verified" | "draft" | "review";
}
export default function TypeTest(){
    // 2 TypeScript state contract :Hum bol rahe hain ye ya toh TempleCard hoga ya null
    const [activeTemple, setActiveTemple] = useState<TempleCard | null>(null);
    const loadTemple = () =>{
    // Agar yahan 'status: "pending"' likhenge, toh TS turant error de dega!
        setActiveTemple({
            id:101,
           title: "Kashi Vishwanath",
            location: "Varanasi",
            status: "review",
        });
    };
    const clearTemple = () => {
    setActiveTemple(null);
  };
  return(
    <div className="p-6 max-w-md mx-auto bg-amber-800 rounded-xl shadow-md space-y-4">
      <h3 className="text-lg font-bold">TypeScript Interface & Union Lab</h3>

      <div className="flex gap-2">
        <button
          onClick={loadTemple}
          className="px-3 py-1.5 bg-emerald-600 text-white rounded font-medium text-sm"
        >
          Load Verified Temple
        </button>
        <button
          onClick={clearTemple}
          className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded font-medium text-sm"
        >
          Clear
        </button>
      </div>

      {/* 3. Conditional Rendering (Type Narrowing) */}
      {activeTemple ? (
        <div className="border border-slate-200 p-4 rounded-lg bg-amber-400 space-y-1 text-sm">
          <p><strong>Title:</strong> {activeTemple.title}</p>
          <p><strong>Location:</strong> {activeTemple.location}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 uppercase font-semibold">
              {activeTemple.status}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-400 italic">No temple loaded yet.</p>
      )}
    </div>
  )
}