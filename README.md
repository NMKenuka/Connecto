# Connecto

Connecto is a simple, unified website designed to connect citizens to essential public services, all in one place. The application provides a centralized platform for both citizens and administrators to manage bookings, access services, and streamline communication with various public departments.

## Features

- **Unified Service Booking**: Citizens can browse available services, make appointments, and manage their bookings.
- **Admin Dashboard**: Public service departments can manage bookings, publish notices, and oversee service delivery through an intuitive dashboard.
- **User Authentication**: Separate registration and login for both citizens and department administrators.
- **Profile Management**: Users can update their personal information and view booking history.
- **Responsive Design**: Built with Material UI and TailwindCSS for a modern look and feel on all devices.

## Technologies Used

- **Frontend**: React (TypeScript)
- **UI Libraries**: Material UI, TailwindCSS
- **State Management**: React Context API
- **Routing**: React Router
- **Build Tool**: Vite
- **Styling**: TailwindCSS, PostCSS, custom Material UI theme

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NMKenuka/Connecto.git
   cd Connecto
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Project Structure

- `/src/components/` — React components for authentication, admin, and user dashboards
- `/src/context/` — Context providers for authentication and app state
- `/src/theme/` — Custom Material UI theme

### Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run lint` — Lint the codebase

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is currently unlicensed.
