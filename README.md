# Lead Management System - CivilGuruji

A modern, full-stack lead management application built with React, TypeScript, Node.js, and MongoDB.

## Features

- **Lead Management**: Add, view, and manage leads with comprehensive details
- **Advanced Filtering**: Filter leads by status, search terms with AND/OR conditions
- **Sortable Table**: Click column headers to sort leads by any field
- **Status Tracking**: Four status levels - New, Follow-Up, Qualified, Converted
- **Responsive Design**: Modern UI with Tailwind CSS and responsive layout
- **Collapsible Sidebar**: Clean navigation with expandable/collapsible sidebar
- **Real-time Search**: Instant search across names, emails, and phone numbers

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Hook Form** with Yup validation
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **RESTful API** design

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rajdesai17/leads-manage-civilguruji.git
cd leads-manage-civilguruji
```

2. Install dependencies for both frontend and backend:
```bash
npm install
cd server && npm install && cd ..
```

3. Set up environment variables:
Create a `.env` file in the `server` directory:
```env
MONGODB_URI=mongodb://localhost:27017/leads_db
PORT=5001
```

4. Start the development servers:
```bash
npm run dev
```

This will start:
- Frontend (Vite): http://localhost:5173
- Backend (Express): http://localhost:5001

### Available Scripts

- `npm run dev` - Start both frontend and backend concurrently
- `npm run frontend` - Start only the frontend development server
- `npm run backend` - Start only the backend server
- `npm run build` - Build the frontend for production

## API Endpoints

- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create a new lead
- `PUT /api/leads/:id` - Update a lead
- `DELETE /api/leads/:id` - Delete a lead

## Project Structure

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
