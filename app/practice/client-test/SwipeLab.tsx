"use client";
import {useRef, useState} from "react";
export default function SwipeLab(){
    // 1. Coordinates ko yaad rakhne k liye useRef (kyunki screen per re render nahi karni)
    const  touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    // 2 Sirf result dikhane ke liye useState
    const [gestureStatus, setGestureStatus] = useState<string>("Swipe inside the box");
    const [swipeCount, setSwipeCount] = useState({left:0, right:0});
    //ungli rakhi
    const handleTouchStart = (e:React.TouchEvent<HTMLDivElement>) =>{
        touchStartX.current= e.touches[0].clientX;
    };
    //ungli drag  ho rahi hai
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        touchEndX.current = e.touches[0].clientX;
    }
    //Ungli utha li (Faisla lene ka waqt)
    const handleTouchEnd = () =>{
        if(!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50; // Thresold (Kam se kam 50px drag hona chahiye)
        if (diff > minSwipeDistance){
            //Finger moved Left ->  Swipe Left -> Content moves Right
            setGestureStatus("Swiped LEFT (Next)");
            setSwipeCount((prev)=>({...prev, left:prev.left+1}));
        }else if(diff < minSwipeDistance){
            // Finger moved Right -> Swipe Right -> Content moves Left
            setGestureStatus("👈 Swiped RIGHT (Prev)");
            setSwipeCount((prev) => ({ ...prev, right: prev.right + 1 }));
        }else{
            setGestureStatus("Tap or small drag (Ignored)");
        }
        //reset coordinates 
        touchStartX.current = 0;
        touchEndX.current = 0;
    }
    return (
    <div className="p-6 max-w-md mx-auto space-y-4 font-sans select-none">
      <h2 className="text-xl font-bold">Touch Gesture Lab</h2>

      {/* Status Panel */}
      <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-sm space-y-1">
        <p>Last Action: <span className="text-white font-bold">{gestureStatus}</span></p>
        <p>Swiped Left: {swipeCount.left} times</p>
        <p>Swiped Right: {swipeCount.right} times</p>
      </div>

      {/* Swipe Surface Box */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="h-48 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
      >
        <p className="text-lg font-semibold">Touch & Swipe Here</p>
        <p className="text-xs opacity-80 mt-1">(Mobile view / inspect mode me drag karein)</p>
      </div>
    </div>
  );

}