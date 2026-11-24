"use client";
// Do alag-alag types: Ek simple string URL aur ek pura Object
type SimpleImage = string;
interface DetailedImage {
    id: number;
    url: string;
    caption: string;
}
// WordPress se dono me se kuch bhi aa sakta hai (Union)
type ApiImage = SimpleImage | DetailedImage;
export default function TypeGuardTest() {
    // Helper function: Type Guard ka use
    const renderImageInfo = (img: ApiImage) => {
        // 1. Type Guard: typeof check
        if (typeof img === "string") {
            // Yahan TypeScript ko pata chal gaya ki img sirf ek STRING hai
            return <p className="text-blue-600">Simple URL: {img.toUpperCase()}</p>;
        }
        // 2. Yahan TypeScript ko pata chal gaya ki img pakka DETAILED IMAGE object hai
        return (
            <div className="text-emerald-700">
                <p>Object ID: {img.id}</p>
                <p>URL: {img.url}</p>
                <p>Caption: {img.caption}</p>
            </div>
        );
    };
    const sample1: ApiImage = "https://example.com/temple.jpg";
    const sample2: ApiImage = {
        id: 108,
        url: "https://example.com/kashi.jpg",
        caption: "Ganga Ghat at Sunrise",
    };
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow space-y-4">
            <h3 className="font-bold text-lg">Type Guard Visual Test</h3>

            <div className="border p-3 rounded bg-slate-50">
                <span className="text-xs font-semibold text-slate-400">TEST 1 (String):</span>
                {renderImageInfo(sample1)}
            </div>

            <div className="border p-3 rounded bg-slate-50">
                <span className="text-xs font-semibold text-slate-400">TEST 2 (Object):</span>
                {renderImageInfo(sample2)}
            </div>
        </div>
    );

}