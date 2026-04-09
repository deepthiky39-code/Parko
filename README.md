# 🅿️ Parko — Smart Parking Platform

A **production-grade mobile application** for smart parking, built with React Native & Expo. Parko enables users to find, book, and manage parking spots in real time, with a full admin dashboard for facility operators.

---

## ✨ Features

### 👤 Customer Flow
- **Landing & Auth** — Clean onboarding with Sign Up / Log In via Supabase Auth
- **Home (Map View)** — Browse nearby parking locations on an interactive map
- **Parking Details** — View pricing, availability, and facility info
- **Slot Selection** — Visual grid to choose your exact parking spot
- **Booking** — Select duration, enter vehicle number, review price breakdown
- **Payment** — Confirmation screen with receipt summary
- **QR Ticket** — Shareable digital parking pass with booking ID

### 🛡️ Admin Flow
- **Dashboard** — Real-time revenue, occupancy KPIs, and analytics charts
- **Activity Log** — Filterable transaction history with status badges
- **Facility Management** — Toggle parking lots, monitor infrastructure health
- **QR Scanner** — Validate customer passes at entry points

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo (SDK 54) |
| Navigation | React Navigation (Native Stack) |
| Backend | Supabase (Auth + Database) |
| Maps | react-native-maps |
| Charts | react-native-chart-kit |
| Icons | lucide-react-native |
| Gradients | expo-linear-gradient |
| Language | TypeScript |

---

## 🎨 Design System

- **Theme**: Electric Blue (`#00A8FF` → `#0072FF` gradient)
- **Typography**: Bold, modern hierarchy with clear information architecture
- **Components**: Reusable `Button`, `Card`, `Input`, `Badge`, `BottomSheet`
- **Animations**: Smooth screen transitions and interactive micro-feedback

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Expo Go app on your phone (or Android emulator)

### Installation

```bash
# Clone the repo
git clone https://github.com/deepthiky39-code/Parko.git
cd Parko

# Install dependencies
npm install

# Start the dev server
npm start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS).

---

## 🔑 Environment Setup

Create a `src/lib/supabase.ts` with your Supabase credentials:

```ts
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'your-supabase-url';
const SUPABASE_ANON_KEY = 'your-anon-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

---

## 📁 Project Structure

```
parko/
├── assets/              # Images & logo
├── src/
│   ├── components/      # Reusable UI components
│   ├── data/            # Dummy data for development
│   ├── lib/             # Supabase client
│   ├── navigation/      # App navigator & route types
│   ├── screens/         # All app screens
│   │   ├── auth/        # Login & Signup
│   │   └── ...
│   └── theme/           # Colors & typography tokens
├── App.tsx
└── package.json
```

---

## 📱 Screenshots

| Landing | Slot Selection | QR Ticket |
|---|---|---|
| Premium blue gradient landing | Visual grid seat picker | Shareable digital parking pass |

---

## 🗺️ Roadmap

- [ ] Real-time slot availability via Supabase Realtime
- [ ] Razorpay / Stripe payment integration
- [ ] Push notifications for booking reminders
- [ ] Multi-language support
- [ ] iOS & Android production builds

---

## 👩‍💻 Author

**Deepthy K** — [@deepthiky39-code](https://github.com/deepthiky39-code)

---

## 📄 License

MIT License — feel free to use and modify.
