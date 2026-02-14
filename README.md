# FE-Apps-TechTest: Admin Dashboard E-Commerce

Dashboard admin untuk sistem e-commerce data package dengan integrasi React, Vite.

## Waktu Pengerjaan

**Start:** Jumat, 13 Fabruari 2026 4:00 PM
**Finish:** Sabtu, 14 Februari 2026 9:32 AM

## Fitur Utama

- 📊 **Dashboard Statistik** - Menampilkan total pelanggan, transaksi, pendapatan, dan paket
- 📈 **Manajemen Pelanggan** - Lihat, tambah, ubah, dan hapus data pelanggan
- 💳 **Manajemen Transaksi** - Kelola transaksi pelanggan dengan informasi lengkap
- 📦 **Manajemen Paket** - Kelola paket yang ditawarkan
- 🔐 **Autentikasi** - Login dan manajemen user
- 🎨 **UI Modern** - Menggunakan Ant Design 6.x

## Teknologi

- **React** 19.2.0
- **Vite** 7.3.1
- **Ant Design** 6.3.0
- **Axios** 1.13.5
- **React Router** 7.13.0

## Setup & Installation

```bash
# Clone repository
git clone <repository-url>
cd FE-apps-techtest

# Install dependencies
npm install

# Start development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## Struktur Project

```
src/
├── components/        # Komponen reusable
├── pages/            # Halaman aplikasi (Dashboard, Login, Transactions, dll)
├── services/         # API service & business logic
├── context/          # React Context (Theme, Auth, dll)
├── assets/           # Static assets
├── route/            # Route
├── App.jsx           # Main app component
└── main.jsx          # Entry point

db.json              # Mock database (json-server)
```

## Menjalankan Project

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start json-server (optional)
npx json-server --watch db.json --port 3001
```

Aplikasi akan berjalan di `http://localhost:5173`

## Login Credentials

- **Email:** admin@mail.com
- **Password:** 123456

## Dokumentasi Project

![alt text](src\assets\Login.png)
![alt text](src\assets\dashboard.png)
![alt text](src\assets\customer.png)
![alt text](src\assets\transaksi.png)

## License

MIT

