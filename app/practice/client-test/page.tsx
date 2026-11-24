/* import DomPlayground from "./DomPlayground";
import TypeTest from "./TypeTest";
import TypeGuardTest from "./TypeGuardTest"; */
// import SwipeLab from "./SwipeLab";
import PhotoCarousel from "./PhotoCarousel";

const dummyPhotos = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=600",
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600",
  "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600",
  "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600",
]
export default function ClientTestPage() {
  return (
    <main className="min-h-screen bg-slate-100 py-10">
     {/*  <DomPlayground />
      <br />
      <TypeTest />
      <br />
      <TypeGuardTest /> */}
      <PhotoCarousel photos={dummyPhotos} />

    </main>
  );
}