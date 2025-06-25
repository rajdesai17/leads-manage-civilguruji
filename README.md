# 🧪 Lead Management Task - Full Stack Solution

This is my solution to the Lead Management Module task, implementing both **frontend** and **backend** functionality.

## 🎯 Task Overview

Build a Lead Capture Form + Lead List with focus on:
- UI/UX and form validation (frontend)
- API integration and component structure
- Database modeling, routes, and controllers (backend)

## ✅ What I Built

**Full Stack Solution** featuring:
- **Lead Capture Form** with validation
- **Lead List** with sorting, filtering, and search
- **Professional UI** matching provided design reference
- **REST API** with MongoDB integration
- **Expandable rows** with additional lead details

## 🛠 Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, React Hook Form, Yup validation  
**Backend:** Node.js, Express.js, MongoDB, Mongoose

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/rajdesai17/leads-manage-civilguruji.git
cd leads-manage-civilguruji
npm install
cd server && npm install && cd ..

# Setup MongoDB connection in server/.env
MONGODB_URI=mongodb://localhost:27017/leads_db
PORT=5001

# Run both frontend and backend
npm run dev
```

**Access:** Frontend at `http://localhost:5173` | Backend at `http://localhost:5001`

## 📋 Features Implemented

- ✅ Lead capture form with comprehensive validation
- ✅ Lead list with sorting by all columns
- ✅ Advanced filtering (status, search with AND/OR logic)
- ✅ Responsive design matching UI reference
- ✅ Collapsible sidebar navigation
- ✅ Expandable row details
- ✅ Professional status badges and typography
- ✅ REST API with full CRUD operations
- ✅ MongoDB data persistence

## 📁 Project Structure

```
lead-task-fullstack-enhanced/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   └── api.ts             # API configuration
├── server/                # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # Express routes
│   └── index.js           # Server entry point
├── public/                # Static assets
└── package.json           # Frontend dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

Raj Desai - [GitHub](https://github.com/rajdesai17)

Project Link: [https://github.com/rajdesai17/leads-manage-civilguruji](https://github.com/rajdesai17/leads-manage-civilguruji)
