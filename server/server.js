import express from "express";
import fs from "fs";
import cors from "cors";
import multer from "multer";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({ origin: "https://verbose-space-lamp-745gx6w4p672xrrq-5173.app.github.dev" }));
app.use(express.json());
app.use("/images", express.static("images"));

// Konfigurasi upload gambar degan multer
const storage = multer.diskStorage({
    destination: `${__dirname}/images/`,
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});
const upload = multer({ storage });

// Fungsi membaca data.json
const getData = () => {
    if (!fs.existsSync(`${__dirname}/data.json`)) {
        fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify([])); // Create file if it doesn't exist
    }
    return JSON.parse(fs.readFileSync(`${__dirname}/data.json`));
};

// Fungsi menulis ke data.json
const saveData = (data) => {
    fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data, null, 2));
};

// Fungsi membaca resume.json
const getResume = () => {
    return JSON.parse(fs.readFileSync(`${__dirname}/resume.json`));
}

// **1. GET - ambil semua gambar**
app.get("/api/gallery", (req, res) => {
    const data = getData();
    res.json(data);
});

// **1.2 GET_RESUME - ambil resume**
app.get("/api/resume", (req, res) => {
    const resume = getResume();
    res.json(resume);
})

// **2. POST - Tambah gambar baru**
app.post("/api/gallery", upload.single("image"), (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: "Gambar wajib diunggah!" });

        const data = getData();
        const newImage = {
            id: Date.now(),
            title: req.body.title || "Untitled",
            description: req.body.description || "No description",
            imageUrl: `/images/${req.file.filename}`,
        };
        data.push(newImage);
        saveData(data);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// **3. PUT - Edit Deskripsi Gambar**
app.put("/api/gallery/:id", (req, res) => {
    const data = getData();
    const id = Number(req.params.id);
    const index = data.findIndex((img) => img.id === id);

    if (index === -1) return res.status(404).json({ msg: "Gambar tidak ditemukan" });

    data[index].title = req.body.title || data[index].title;
    data[index].description = req.body.description || data[index].description;

    saveData(data);
    res.json({ msg: "Gambar berhasil diperbarui", image: data[index] });
});

// **4. DELETE - Hapus Gambar**
app.delete("/api/gallery/:id", (req, res) => {
    let data = getData();
    const id = Number(req.params.id);
    const index = data.findIndex((img) => img.id === id);

    if (index === -1) return res.status(404).json({ msg: "Gambar tidak ditemukan" });

    // Hapus file gambar dari folder images
    const imagesPath = `.${data[index].imageUrl}`;
    if (fs.existsSync(imagesPath)) fs.unlinkSync(imagesPath);

    data.splice(index, 1);
    saveData(data);
    res.json({ msg: "Gambar berhasil dihapus" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));