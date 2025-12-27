# Backend 

## Fitur Backend

Backend ini tidak hanya menggunakan query database biasa, tetapi menggunakan beberapa fitur lanjutan guna menjamin keamanan dan integritas data.

* **Stored Procedure**: Digunakan untuk proses *Insert Data* (`CALL tambah_siswa`) agar lebih aman dan terstruktur.
* **Keamanan Data Sensitif**: Menggunakan *Dotenv* agar express dapat membaca .env yang mana tidak di publikasi ke publik yang menjamin keamanan data konfigurasi sistem.
* **Trigger Database**:
    * **Auto Generate Kode**: Kode siswa (S-XXX) dibuat otomatis oleh database, bukan input manual.
    * **Auto Uppercase**: Nama siswa otomatis dikonversi menjadi HURUF KAPITAL.
    * **Validasi Duplikat**: Mencegah input data ganda (Nama & Tanggal Lahir sama) langsung di level database.
* **Database Transaction**: Menerapkan `Begin Transaction`, `Commit`, dan `Rollback` untuk menjamin integritas data saat operasi Create.

## 🛠️ Teknologi yang Digunakan

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MySQL
* **Library**: `mysql2`, `cors`, `dotenv`

## ⚙️ Cara Instalasi & Menjalankan

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/ryglearn/crudSiswaBackend.git)
    cd backend-siswa
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Database (PENTING)**
    * Buat database baru di MySQL, bebas tapi pastikan sama dengan yang ada di .env.
    * Ubah .env example menjadi .env dan sesuaikan konfigurasinya..
    * Buat database dengan query yang tersedia di src/config/ quey.sql
4.  **Jalankan Server**
5.  install nodemon dev dependencies (kalau belum ada)
    ```bash
    npm install --save-dev nodemon
    ```
6.  jallankan server
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3000`.

## 🔌 API Endpoints

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/siswa` | Mengambil semua data siswa + info total |
| `POST` | `/api/siswa` | Menambah siswa baru (via Stored Procedure) |
| `PUT` | `/api/siswa/:id` | Mengupdate data siswa |
| `DELETE` | `/api/siswa/:id` | Menghapus data siswa |

---
**Dibuat oleh:** Raffi Yoga Subagyo
