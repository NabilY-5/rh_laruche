import { useState } from "react";
import "./conge.css";

export default function Conge() {
  const [file, setFile] = useState<File | null>(null);
  const [employee, setEmployee] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Choisis un fichier PDF");
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("employee", employee);

    const res = await fetch("http://localhost:3000/conges/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    console.log(data);

    alert("Fichier envoyé !");
  };

  return (
    <div className="conge-page">
      <h1>Uploader un congé</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de l'employé"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
