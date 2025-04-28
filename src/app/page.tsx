'use client'
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [userData, setUserData] = useState<{ nombrecompleto: string; numerodeboleto: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: username,
          contrasena: password,
        }),
      });
  
      console.log("Response status:", response.status); // Debugging
      const data = await response.json();
      console.log("Response data:", data); // Debugging
  
      if (response.ok) {
        setWelcomeMessage(`Bienvenido, ${data.nombrecompleto}, disfruta tu experiencia en GreenPark.`);
        setUserData({ nombrecompleto: data.nombrecompleto, numerodeboleto: data.numerodeboleto });
        setError("");
      } else {
        setError("Los datos son incorrectos. Por favor, inténtalo de nuevo.");
        setWelcomeMessage("");
        setUserData(null);
      }
    } catch (err) {
      console.error("Error:", err); // Debugging
      setError("Ocurrió un error al conectar con el servidor. Por favor, inténtalo más tarde.");
      setWelcomeMessage("");
      setUserData(null);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}>
        {welcomeMessage ? (
          <div>
            <h1>{welcomeMessage}</h1>
            <p><strong>Nombre Completo:</strong> {userData?.nombrecompleto}</p>
            <p><strong>Número de Boleto:</strong> {userData?.numerodeboleto}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>Usuario:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Ingresar
            </button>
            {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}