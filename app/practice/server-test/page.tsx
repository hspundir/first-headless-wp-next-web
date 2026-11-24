import { Counter } from "./Counter";

export default async function ServerTestPage() {
  console.log("🔥 [SERVER LOG]: Yeh sirf VS Code terminal mein dikhega!");

  // Server par banaya gaya static / mock data (No hydration mismatch)
  const serverMessage = "Hello from Server Component! Main server par render hua hoon.";

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ color: "#2563eb", marginBottom: "8px" }}>1. Server Component Test</h1>
      
      <p style={{ color: "#374151", marginBottom: "16px" }}>
        {serverMessage}
      </p>

      <div style={{ padding: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", borderRadius: "6px", fontSize: "14px" }}>
        Yeh HTML seedha server par bana hai. Iska koi extra JS bundle browser ko nahi bheja gaya.
      </div>

      {/* Client Component */}
      <Counter />
    </div>
  );
}