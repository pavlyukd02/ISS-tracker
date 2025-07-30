# ISS Tracker

A real-time International Space Station (ISS) tracking application that displays the current location of the ISS on a map and shows the current crew members on board.

## Features

- Real-time tracking of the ISS position
- Current crew members display
- Auto-updates every 5 seconds
- Responsive design
- Clean, modern UI

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Google Maps API key

### Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd iss-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your Google Maps API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- Next.js (React Framework)
- TypeScript
- Tailwind CSS
- Google Maps JavaScript API
- OpenNotify API (for ISS data)

## API Reference

- [OpenNotify API](http://open-notify.org/Open-Notify-API/)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

## License

This project is open source and available under the [MIT License](LICENSE).
# ISS-tracker
