const pool = require("../config/db");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const query = "SELECT * FROM siswa ORDER BY id ";
      const [rows] = await pool.execute(query);
      return res.status(200).json(rows);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const query = "SELECT * FROM siswa WHERE id = ?";
      const [rows] = await pool.execute(query, [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "data tidak sitemukan" });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const { nama, alamat, tanggal_lahir, jurusan } = req.body;
      const [rows] = await conn.execute(
        "SELECT kode_siswa FROM siswa ORDER BY id DESC LIMIT 1 FOR UPDATE"
      );
      kodeBaru = "S-001";
      if (rows.length > 0) {
        const lastKode = rows[0].kode_siswa;
        const kode = parseInt(lastKode.substring(2, 10));
        const nextKode = kode + 1;
        kodeBaru = "S-" + String(nextKode).padStart(3, "0");
      }
      await conn.execute("CALL tambah_siswa(?,?,?,?,?)", [
        kodeBaru,
        nama,
        alamat,
        tanggal_lahir,
        jurusan,
      ]);
      await conn.commit();
      return res.status(201).json({
        message: "data berhasil ditambahkan",
        data: { kodeBaru, nama, alamat, tanggal_lahir, jurusan },
      });
    } catch (error) {
      await conn.rollback();
      next(error);
    } finally {
      conn.release();
    }
  },
  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nama, alamat, tanggal_lahir, jurusan } = req.body;
      const query =
        "UPDATE siswa SET nama= ?, alamat= ?, tanggal_lahir=?, jurusan=? WHERE id = ?";
      const [result] = await pool.execute(query, [
        nama,
        alamat,
        tanggal_lahir,
        jurusan,
        id,
      ]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan !" });
      }
      return res.status(200).json({
        message: "Data berhasil di-update ! ",
        data: { nama, alamat, tanggal_lahir, jurusan },
      });
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const query = "DELETE FROM siswa WHERE id = ?";
      const [result] = await pool.execute(query, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan !" });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
