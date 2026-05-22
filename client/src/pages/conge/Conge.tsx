import { useState } from "react";
import { employees } from "../../lib/employees";
import "./conge.css";
import pdfIcon from "../../assets/pdf.png";

export default function Conge() {
  const [employee, setEmployee] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!employee || !file) {
      alert("Veuillez sélectionner un salarié et un fichier");
      return;
    }
  };

  return (
    <div className="conge-page">
      <h1>Déposer une demande de congé</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="employee-select"
        >
          <option value="">Sélectionnez un employé</option>
          {employees.map((emp) => (
            <option key={emp} value={emp}>
              {emp}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {file && (
          <div className="file-preview">
            <img src={pdfIcon} alt="PDF" className="pdf-icon" />
            <span>
              Fichier sélectionné : <strong>{file.name}</strong>
            </span>
          </div>
        )}

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
