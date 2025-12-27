import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./App.css";
import { FaPencilAlt, FaRegTrashAlt   } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi2";


function App() {
  const API_URL = "http://localhost:3000/api/siswa"; 
  const [siswa, setSiswa] = useState([]);
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState({
    id: "", 
    kode_siswa: "",
    nama: "",
    alamat: "",
    tanggal_lahir: "",
    jurusan: "",
  });

  const resetForm = () => {
    setForm({
      id: "",
      kode_siswa: "",
      nama: "",
      alamat: "",
      tanggal_lahir: "",
      jurusan: "",
    });
    setMode("create");
  };

  const fetchSiswa = async () => {
    try {
      const res = await axios.get(API_URL);
      setSiswa(res.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await axios.post(API_URL, {
          nama: form.nama,
          alamat: form.alamat,
          tanggal_lahir: form.tanggal_lahir,
          jurusan: form.jurusan,
        });
        Swal.fire("Sukses", "Data berhasil ditambahkan", "success");
      } else {
        await axios.put(`${API_URL}/${form.id}`, {
          nama: form.nama,
          alamat: form.alamat,
          tanggal_lahir: form.tanggal_lahir,
          jurusan: form.jurusan,
        });
        Swal.fire("Sukses", "Data berhasil diupdate", "success");
      }

      resetForm();
      fetchSiswa();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  const handleEdit = (item) => {
    setForm({
      ...item,
      //format tanggal aar sesuai dengan html input(date)
      tanggal_lahir: item.tanggal_lahir ? item.tanggal_lahir.split("T")[0] : "",
    });
    setMode("edit");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Yakin dihapus?",
      text: "Data akan terhapus permanen",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      fetchSiswa();
    } catch (error) {
      Swal.fire("Error", "Gagal menghapus data", "error");
    }
  };

  return (
    <>
    <div className="container mt-3">
      <div className="row g-3">
        {/* KOLOM FORM */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              {mode === "create" ? "Tambah Siswa" : "Edit Siswa"}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {mode === "edit" && (
                  <div className="mb-3">
                    <label className="form-label">KODE SISWA</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.kode_siswa}
                      disabled
                    />
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">NAMA</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    required
                    placeholder="Masukan Nama anda !"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ALAMAT</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    required
                    placeholder="Masukan Alamat Anda !"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">TANGGAL LAHIR</label>
                  <input
                    type="date"
                    className="form-control"
                    name="tanggal_lahir"
                    value={form.tanggal_lahir}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">JURUSAN</label>
                  <select
                    className="form-select"
                    name="jurusan"
                    value={form.jurusan}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--- Pilih ---</option>
                    <option value="sejarah">Ilmu Sejarah</option>
                    <option value="sastra">Ilmu Sastra Bahasa</option>
                    <option value="ekonomi">Ilmu Ekonomi</option>
                  </select>
                </div>
                <div className="d-grid gap-2 d-md-block">
                  <button
                    type="submit"
                    className={`btn ${
                      mode === "create" ? "btn-primary" : "btn-success"
                    }`}
                  >
                    {mode === "create" ? "Simpan" : "Update"}

                  </button>
                  {mode === "edit" && (
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={resetForm}
                    >
                      Batal
                    </button>
                  )}
                  {mode === "create" && (
                    <div id="formhelp" className="form-text">
                      *Kode Siswa akan ter-generate otomatis. Silahkan lihat
                      di Tabel !
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* KOLOM TABEL */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                  <HiOutlineUserGroup/> Tabel Siswa
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>No</th>
                      <th>Kode</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Lahir</th>
                      <th>Jurusan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswa.length > 0 ? (
                      siswa.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.kode_siswa}</td>
                          <td className="text-uppercase">{item.nama}</td>
                          <td>{item.alamat}</td>
                          <td>
                            {new Date(item.tanggal_lahir).toLocaleDateString(
                              "id-ID"
                            )}
                          </td>
                          <td>{item.jurusan}</td>
                          <td className="text-nowrap">
                            <button
                              className="btn btn-success btn-sm me-1 text-white"
                              onClick={() => handleEdit(item)}
                            >
                              <FaPencilAlt/>
                            </button>
                            <button
                              className="btn btn-danger btn-sm me-1"
                              onClick={() => handleDelete(item.id)}
                            >
                              <FaRegTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">
                          Data kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
