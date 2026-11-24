"use client";
import { useSearchParams, useRouter } from "next/navigation";
interface StateOpions {
    slug: string;
    name: string;
}
interface FilterBarProps {
    states?: StateOpions[];
}
export default function FilterBar({ states = [] }: FilterBarProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentState = searchParams.get("state") || "all";
    const matchedState = states.find((st) => st.slug === currentState);
    const selectedStateLabel = currentState === "all" ? "All States" : matchedState?.name || currentState;

    const handleStateChange = (newState:string) => {
        const params = new URLSearchParams(searchParams.toString());
        if(newState === "all"){
            params.delete("state");
        }else{
            params.set("state", newState);
        }
        router.push(`?${params.toString()}`);
    }

    return (
        <div className = "p-4 border rounded-md flex items-center gap-3 ">
            <label htmlFor="state-label" className = "text-sm font-medium text-gray-700">State:</label>
            <select
                id="state-label"
                value={currentState}
                onChange={(e)=>handleStateChange(e.target.value)}
                className = "border rounded px-3 py-1.5 text-sm text-black"
            >
                <option value="all">All States</option>
                { states?.map((st) => (
                    <option key={st.slug} value={st.slug}>{st.name}</option>
                ))}
              
                
            </select>
            
            <p className = "text-sm text-gray-600">
                Selected State: <strong>{selectedStateLabel}</strong>
            </p>
        </div>
    )
}