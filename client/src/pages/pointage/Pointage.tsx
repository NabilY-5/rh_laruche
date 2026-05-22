import { useState } from "react";
import { employees } from "../../lib/employees";
import "./pointage.css";
import pdfIcon from "../../assets/pdf.png";

export default function Pointage() {
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
    <div className="pointage-page">
      <h1>Déposer une feuille de pointage</h1>

      <form onSubmit={handleSubmit}>
        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="employee-select"
        >
          <option value="">Sélectionnez un salarié</option>

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
