# VacationGo

VacationGo adalah aplikasi web interaktif untuk menampilkan daftar destinasi wisata dengan fitur login dan dashboard.

**Frontend:**
- React.js
- Tailwind CSS / CSS Module
- React Router

**Backend:**
- Node.js
- Express.js
- MySQL / PostgreSQL

**Lainnya:**
- Axios (HTTP client)
- JWT (Authentication)
- Vite (Frontend bundler)

Untuk menjalankan project, clone repository terlebih dahulu:

```bash
git clone https://github.com/username/nama-project.git
cd nama-project

Jalankan backend:
Copy code
cd backend
npm install
npm run dev

Backend default berjalan di http://localhost:5000. Buat file .env di folder backend:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=nama_database
JWT_SECRET=your_secret_key
PORT=5000

Setelah itu jalankan frontend:
Copy code
cd frontend
npm install
npm run dev

Frontend default berjalan di http://localhost:5173.

Struktur project backend:
backend/
├─ config/        # Konfigurasi database dan environment
├─ utils/         # Helper functions
├─ routes/        # Endpoint API
├─ controllers/   # Logika bisnis per route
├─ services/      # Service layer
├─ middleware/    # Middleware (auth, error handling)
├─ app.js         # Setup Express app
└─ server.js      # Entry point server

Struktur project frontend:
frontend/
├─ src/
│  ├─ components/ # UI Components
│  ├─ pages/      # Halaman seperti Login, Dashboard, Home
│  ├─ context/    # Context API untuk state global
│  └─ App.jsx     # Root component
└─ package.json