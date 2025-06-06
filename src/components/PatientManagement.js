import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Sayfa yönlendirme için
import { FaArrowLeft } from "react-icons/fa"; // Geri dön ikonu
import { PatientList } from "./PatientList";
import axios from "axios";

const FLASK_API = process.env.REACT_APP_FLASK_API_URL;
const BACKEND_API = process.env.REACT_APP_BACKEND_API_URL;

export function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // Kullanıcıyı yönlendirmek için

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${BACKEND_API}/api/Patient`);
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      alert("Hastalar yüklenirken bir hata oluştu.");
    }
  };

  const handleEdit = async (id, updatedData) => {
    if (!id) {
      alert("Hasta ID'si eksik.");
      return;
    }

    try {
      await axios.put(`${BACKEND_API}/api/Patient/${id}`, updatedData);
      alert("Hasta başarıyla güncellendi.");
      fetchPatients(); // Listeyi yenile
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Hasta güncellenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_API}/api/Patient/${id}`);
      alert("Hasta başarıyla silindi.");
      setPatients((prev) => prev.filter((patient) => patient.PatientID !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Hasta silinirken bir hata oluştu.");
    }
  };

  return (
    <div className="container mx-auto p-6">

      <PatientList patients={patients} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
