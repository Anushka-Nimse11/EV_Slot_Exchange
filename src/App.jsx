// import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ErrorBoundary } from "@/components/error-boundary";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Link, Router as WouterRouter, useLocation } from "wouter";
// import {
//   ArrowRight,
//   BatteryCharging,
//   CalendarDays,
//   CarFront,
//   Check,
//   ChevronLeft,
//   CircleHelp,
//   Clock3,
//   CreditCard,
//   Edit3,
//   Filter,
//   Heart,
//   Home,
//   MapPin,
//   Menu,
//   MessageCircle,
//   Plus,
//   PlugZap,
//   QrCode,
//   Search,
//   ShieldCheck,
//   SlidersHorizontal,
//   Sparkles,
//   Star,
//   Ticket,
//   UserRound,
//   UsersRound,
//   X,
//   Zap,
// } from "lucide-react";

// // LAYOUT
// import Logo from "./components/layout/Logo";
// import Avatar from "./components/layout/Avatar";
// import Title from "./components/layout/Title";
// import Toast from "./components/layout/Toast";
// import Shell from "./components/layout/Shell";
// import Button from "./components/layout/Button";

// // STATIONS
// import StationCard from "./components/stations/StationCard";
// import Stars from "./components/stations/Stars";
// import BookingPreview from "./components/bookings/BookingPreview";

// //Pages
// import HomePage from "./pages/HomePage";
// import StationsPage from "./pages/StationsPage";
// import StationDetail from "./pages/StationDetailPage";
// import BookPage from "./pages/BookPage";
// import ExchangePage from "./pages/ExchangePage";
// import BookingsPage from "./pages/BookingsPage";
// import ProfilePage from "./pages/ProfilePage";
// import Auth from "./pages/AuthPage";

// const money = (n) => `₹${n.toLocaleString("en-IN")}`;
// const stations = [
//   {
//     id: "nashik-courtyard",
//     name: "Courtyard by EV",
//     address: "College Road, Nashik",
//     distance: "1.4 km",
//     rating: 4.8,
//     reviewCount: 126,
//     pricePerKwh: 18,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "22 kW",
//         connector: "Type 2",
//         status: "Available",
//       },
//       { type: "DC Fast", speed: "120 kW", connector: "CCS2", status: "In use" },
//     ],
//     amenities: ["Café", "Wi-Fi", "Covered parking"],
//     image:
//       "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["09:00", "10:30", "12:00", "14:30", "17:00"],
//     reviews: [
//       {
//         author: "Rohan Mehta",
//         rating: 5,
//         comment:
//           "Easy to find, clean bay and the café makes waiting effortless.",
//         date: "2 days ago",
//       },
//       {
//         author: "Ananya Shah",
//         rating: 5,
//         comment: "Fast charging exactly as promised. Good lighting at night.",
//         date: "1 week ago",
//       },
//     ],
//   },
//   {
//     id: "pune-riverfront",
//     name: "Riverfront Charge Hub",
//     address: "Bund Garden Road, Pune",
//     distance: "3.8 km",
//     rating: 4.6,
//     reviewCount: 89,
//     pricePerKwh: 21,
//     openHours: "05:00 – 23:00",
//     chargers: [
//       {
//         type: "DC Ultra",
//         speed: "150 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "11 kW",
//         connector: "Type 2",
//         status: "Available",
//       },
//     ],
//     amenities: ["Restrooms", "Food court", "Security"],
//     image:
//       "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["08:30", "11:00", "13:30", "16:00", "19:30"],
//     reviews: [
//       {
//         author: "Dev Kulkarni",
//         rating: 5,
//         comment: "Best option on the east side. Super clear pricing.",
//         date: "4 days ago",
//       },
//       {
//         author: "Mihir Joshi",
//         rating: 4,
//         comment: "Busy after 6pm, but the booking system saves a lot of time.",
//         date: "2 weeks ago",
//       },
//     ],
//   },
//   {
//     id: "pune-kalyani",
//     name: "Kalyani Nagar Greenpoint",
//     address: "North Main Road, Pune",
//     distance: "5.2 km",
//     rating: 4.7,
//     reviewCount: 54,
//     pricePerKwh: 19,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "80 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "7 kW",
//         connector: "Type 2",
//         status: "In use",
//       },
//     ],
//     amenities: ["Lounge", "Café", "Pet friendly"],
//     image:
//       "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["09:30", "11:30", "15:00", "18:30"],
//     reviews: [
//       {
//         author: "Priya Nair",
//         rating: 5,
//         comment: "Quiet spot with a lovely lounge. Charged while I worked.",
//         date: "yesterday",
//       },
//     ],
//   },
//   {
//     id: "nashik-highway",
//     name: "Nashik Highway Stop",
//     address: "Mumbai–Agra Highway, Nashik",
//     distance: "8.7 km",
//     rating: 4.4,
//     reviewCount: 41,
//     pricePerKwh: 16,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//     ],
//     amenities: ["Restrooms", "Restaurant", "ATM"],
//     image:
//       "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["10:00", "12:30", "15:30", "20:00"],
//     reviews: [
//       {
//         author: "Sameer Patil",
//         rating: 4,
//         comment: "A dependable stop for a longer drive.",
//         date: "3 weeks ago",
//       },
//     ],
//   },
// ];
// const initialBookings = [
//   {
//     id: "ES-48291",
//     station: "Courtyard by EV",
//     stationId: "nashik-courtyard",
//     charger: "DC Fast · CCS2",
//     date: "Tue, 18 Jun",
//     time: "10:30 – 11:15",
//     cost: 420,
//     status: "upcoming",
//     vehicle: "Tata Nexon EV",
//     qrCode: "EV48291",
//   },
//   {
//     id: "ES-47802",
//     station: "Riverfront Charge Hub",
//     stationId: "pune-riverfront",
//     charger: "DC Ultra · CCS2",
//     date: "Sat, 01 Jun",
//     time: "16:00 – 16:45",
//     cost: 510,
//     status: "completed",
//     vehicle: "Tata Nexon EV",
//     qrCode: "EV47802",
//   },
// ];
// const initialExchange = [
//   {
//     id: "EX-18",
//     owner: "Aarav K.",
//     station: "Riverfront Charge Hub",
//     stationId: "pune-riverfront",
//     charger: "DC Ultra · CCS2",
//     date: "Today",
//     time: "18:30 – 19:15",
//     price: 390,
//     originalPrice: 470,
//     status: "listed",
//   },
//   {
//     id: "EX-21",
//     owner: "Meera S.",
//     station: "Courtyard by EV",
//     stationId: "nashik-courtyard",
//     charger: "DC Fast · CCS2",
//     date: "Tomorrow",
//     time: "09:00 – 09:45",
//     price: 320,
//     originalPrice: 380,
//     status: "listed",
//   },
//   {
//     id: "EX-24",
//     owner: "Kabir R.",
//     station: "Kalyani Nagar Greenpoint",
//     stationId: "pune-kalyani",
//     charger: "DC Fast · CCS2",
//     date: "Thu, 20 Jun",
//     time: "17:00 – 17:45",
//     price: 350,
//     originalPrice: 410,
//     status: "listed",
//   },
// ];

// function RouterView() {
//   const [location, navigate] = useLocation();
//   const [toastMessage, setToast] = useState("");
//   const [bookings, setBookings] = useState(initialBookings);
//   const [exchange, setExchange] = useState(initialExchange);
//   const toast = (x) => {
//     setToast(x);
//     window.setTimeout(() => setToast(""), 3200);
//   };
//   if (location === "/login" || location === "/register")
//     return <Auth mode={location === "/login" ? "login" : "register"} />;
//   let page;
//   if (location === "/")
//     page = <HomePage bookings={bookings} exchange={exchange} toast={toast} />;
//   else if (location === "/stations") page = <StationsPage toast={toast} />;
//   else if (location.startsWith("/stations/"))
//     page = (
//       <StationDetail
//         station={
//           stations.find((s) => s.id === location.split("/")[2]) || stations[0]
//         }
//         toast={toast}
//       />
//     );
//   else if (location.startsWith("/book"))
//     page = (
//       <BookPage add={(b) => setBookings([b, ...bookings])} toast={toast} />
//     );
//   else if (location === "/exchange")
//     page = (
//       <ExchangePage
//         exchange={exchange}
//         setExchange={setExchange}
//         toast={toast}
//       />
//     );
//   else if (location === "/bookings")
//     page = (
//       <BookingsPage
//         bookings={bookings}
//         setBookings={setBookings}
//         toast={toast}
//       />
//     );
//   else if (location === "/profile") page = <ProfilePage toast={toast} />;
//   else
//     page = (
//       <div className="py-20 text-center">
//         <h1 className="font-display text-3xl font-bold">Page not found</h1>
//         <Button className="mt-5" onClick={() => navigate("/")}>
//           Back home
//         </Button>
//       </div>
//     );
//   return (
//     <Shell>
//       {page}
//       <Toast message={toastMessage} onClose={() => setToast("")} />
//     </Shell>
//   );
// }
// const queryClient = new QueryClient();
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
//           <ErrorBoundary resetKey={location.pathname}>
//             <RouterView />
//           </ErrorBoundary>
//         </WouterRouter>
//         <Toaster />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }
// export default App;

// old file i make some changes
// import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ErrorBoundary } from "@/components/error-boundary";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Router as WouterRouter, useLocation } from "wouter";

// // Layout Components
// import Toast from "./components/layout/Toast";
// import Shell from "./components/layout/Shell";
// import Button from "./components/layout/Button";

// // Pages
// import HomePage from "./pages/HomePage";
// import StationsPage from "./pages/StationsPage";
// import StationDetail from "./pages/StationDetailPage";
// import BookPage from "./pages/BookPage";
// import ExchangePage from "./pages/ExchangePage";
// import BookingsPage from "./pages/BookingsPage";
// import ProfilePage from "./pages/ProfilePage";
// import Auth from "./pages/AuthPage";

// // Sample charging stations
// const stations = [
//   {
//     id: "nashik-courtyard",
//     name: "Courtyard by EV",
//     address: "College Road, Nashik",
//     distance: "1.4 km",
//     rating: 4.8,
//     reviewCount: 126,
//     pricePerKwh: 18,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "22 kW",
//         connector: "Type 2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "120 kW",
//         connector: "CCS2",
//         status: "In use",
//       },
//     ],
//     amenities: ["Café", "Wi-Fi", "Covered parking"],
//     image:
//       "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["09:00", "10:30", "12:00", "14:30", "17:00"],
//     reviews: [
//       {
//         author: "Rohan Mehta",
//         rating: 5,
//         comment:
//           "Easy to find, clean bay and the café makes waiting effortless.",
//         date: "2 days ago",
//       },
//       {
//         author: "Ananya Shah",
//         rating: 5,
//         comment: "Fast charging exactly as promised. Good lighting at night.",
//         date: "1 week ago",
//       },
//     ],
//   },
//   {
//     id: "pune-riverfront",
//     name: "Riverfront Charge Hub",
//     address: "Bund Garden Road, Pune",
//     distance: "3.8 km",
//     rating: 4.6,
//     reviewCount: 89,
//     pricePerKwh: 21,
//     openHours: "05:00 – 23:00",
//     chargers: [
//       {
//         type: "DC Ultra",
//         speed: "150 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "11 kW",
//         connector: "Type 2",
//         status: "Available",
//       },
//     ],
//     amenities: ["Restrooms", "Food court", "Security"],
//     image:
//       "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["08:30", "11:00", "13:30", "16:00", "19:30"],
//     reviews: [
//       {
//         author: "Dev Kulkarni",
//         rating: 5,
//         comment: "Best option on the east side. Super clear pricing.",
//         date: "4 days ago",
//       },
//       {
//         author: "Mihir Joshi",
//         rating: 4,
//         comment: "Busy after 6pm, but the booking system saves a lot of time.",
//         date: "2 weeks ago",
//       },
//     ],
//   },
//   {
//     id: "pune-kalyani",
//     name: "Kalyani Nagar Greenpoint",
//     address: "North Main Road, Pune",
//     distance: "5.2 km",
//     rating: 4.7,
//     reviewCount: 54,
//     pricePerKwh: 19,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "80 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "7 kW",
//         connector: "Type 2",
//         status: "In use",
//       },
//     ],
//     amenities: ["Lounge", "Café", "Pet friendly"],
//     image:
//       "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["09:30", "11:30", "15:00", "18:30"],
//     reviews: [
//       {
//         author: "Priya Nair",
//         rating: 5,
//         comment: "Quiet spot with a lovely lounge. Charged while I worked.",
//         date: "yesterday",
//       },
//     ],
//   },
//   {
//     id: "nashik-highway",
//     name: "Nashik Highway Stop",
//     address: "Mumbai–Agra Highway, Nashik",
//     distance: "8.7 km",
//     rating: 4.4,
//     reviewCount: 41,
//     pricePerKwh: 16,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//     ],
//     amenities: ["Restrooms", "Restaurant", "ATM"],
//     image:
//       "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["10:00", "12:30", "15:30", "20:00"],
//     reviews: [
//       {
//         author: "Sameer Patil",
//         rating: 4,
//         comment: "A dependable stop for a longer drive.",
//         date: "3 weeks ago",
//       },
//     ],
//   },
// ];

// // Initial bookings
// const initialBookings = [
//   {
//     id: "ES-48291",
//     station: "Courtyard by EV",
//     stationId: "nashik-courtyard",
//     charger: "DC Fast · CCS2",
//     date: "Tue, 18 Jun",
//     time: "10:30 – 11:15",
//     cost: 420,
//     status: "upcoming",
//     vehicle: "Tata Nexon EV",
//     qrCode: "EV48291",
//   },
//   {
//     id: "ES-47802",
//     station: "Riverfront Charge Hub",
//     stationId: "pune-riverfront",
//     charger: "DC Ultra · CCS2",
//     date: "Sat, 01 Jun",
//     time: "16:00 – 16:45",
//     cost: 510,
//     status: "completed",
//     vehicle: "Tata Nexon EV",
//     qrCode: "EV47802",
//   },
// ];

// // Initial slot exchange listings
// const initialExchange = [
//   {
//     id: "EX-18",
//     owner: "Aarav K.",
//     station: "Riverfront Charge Hub",
//     stationId: "pune-riverfront",
//     charger: "DC Ultra · CCS2",
//     date: "Today",
//     time: "18:30 – 19:15",
//     price: 390,
//     originalPrice: 470,
//     status: "listed",
//   },
//   {
//     id: "EX-21",
//     owner: "Meera S.",
//     station: "Courtyard by EV",
//     stationId: "nashik-courtyard",
//     charger: "DC Fast · CCS2",
//     date: "Tomorrow",
//     time: "09:00 – 09:45",
//     price: 320,
//     originalPrice: 380,
//     status: "listed",
//   },
//   {
//     id: "EX-24",
//     owner: "Kabir R.",
//     station: "Kalyani Nagar Greenpoint",
//     stationId: "pune-kalyani",
//     charger: "DC Fast · CCS2",
//     date: "Thu, 20 Jun",
//     time: "17:00 – 17:45",
//     price: 350,
//     originalPrice: 410,
//     status: "listed",
//   },
// ];

// // Main route component
// function RouterView() {
//   const [location, navigate] = useLocation();

//   const [toastMessage, setToast] = useState("");
//   const [bookings, setBookings] = useState(initialBookings);
//   const [exchange, setExchange] = useState(initialExchange);

//   const toast = (message) => {
//     setToast(message);
//     window.setTimeout(() => setToast(""), 3200);
//   };

//   // Login and registration
//   if (location === "/login" || location === "/register") {
//     return <Auth mode={location === "/login" ? "login" : "register"} />;
//   }

//   let page;

//   // Home page
//   if (location === "/") {
//     page = (
//       <HomePage
//         stations={stations}
//         bookings={bookings}
//         exchange={exchange}
//         toast={toast}
//       />
//     );
//   }

//   // Charging stations
//   else if (location === "/stations") {
//     page = <StationsPage stations={stations} toast={toast} />;
//   }

//   // Station details
//   else if (location.startsWith("/stations/")) {
//     const stationId = location.split("/")[2];

//     page = (
//       <StationDetail
//         station={stations.find((s) => s.id === stationId) || stations[0]}
//         toast={toast}
//       />
//     );
//   }

//   // Booking page
//   else if (location === "/book" || location.startsWith("/book/")) {
//     page = (
//       <BookPage
//         stations={stations}
//         add={(booking) =>
//           setBookings((previousBookings) => [booking, ...previousBookings])
//         }
//         toast={toast}
//       />
//     );
//   }

//   // Slot exchange
//   else if (location === "/exchange") {
//     page = (
//       <ExchangePage
//         exchange={exchange}
//         setExchange={setExchange}
//         bookings={bookings}
//         setBookings={setBookings}
//         toast={toast}
//       />
//     );
//   }

//   // Booking history
//   else if (location === "/bookings") {
//     page = (
//       <BookingsPage
//         bookings={bookings}
//         setBookings={setBookings}
//         toast={toast}
//       />
//     );
//   }

//   // User profile
//   else if (location === "/profile") {
//     page = <ProfilePage toast={toast} />;
//   }

//   // Unknown route
//   else {
//     page = (
//       <div className="py-20 text-center">
//         <h1 className="font-display text-3xl font-bold">Page not found</h1>

//         <Button className="mt-5" onClick={() => navigate("/")}>
//           Back home
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <Shell>
//       {page}
//       <Toast message={toastMessage} onClose={() => setToast("")} />
//     </Shell>
//   );
// }

// // React Query client
// const queryClient = new QueryClient();

// // Main application component
// function App() {
//   const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <WouterRouter base={basePath}>
//           <ErrorBoundary>
//             <RouterView />
//           </ErrorBoundary>
//         </WouterRouter>

//         <Toaster />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

// combine file of me and ritika

// import { useEffect, useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ErrorBoundary } from "@/components/error-boundary";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { Router as WouterRouter, useLocation } from "wouter";

// // Layout Components
// import Toast from "./components/layout/Toast";
// import Shell from "./components/layout/Shell";
// import Button from "./components/layout/Button";

// // Pages
// import HomePage from "./pages/HomePage";
// import StationsPage from "./pages/StationsPage";
// import StationDetail from "./pages/StationDetailPage";
// import BookPage from "./pages/BookPage";
// import ExchangePage from "./pages/ExchangePage";
// import BookingsPage from "./pages/BookingsPage";
// import ProfilePage from "./pages/ProfilePage";
// import Auth from "./pages/AuthPage";

// // Sample charging stations
// const stations = [
//   {
//     id: "nashik-courtyard",
//     name: "Courtyard by EV",
//     address: "College Road, Nashik",
//     distance: "1.4 km",
//     rating: 4.8,
//     reviewCount: 126,
//     pricePerKwh: 18,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "22 kW",
//         connector: "Type 2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "120 kW",
//         connector: "CCS2",
//         status: "In use",
//       },
//     ],
//     amenities: ["Café", "Wi-Fi", "Covered parking"],
//     image:
//       "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["09:00", "10:30", "12:00", "14:30", "17:00"],
//     reviews: [
//       {
//         author: "Rohan Mehta",
//         rating: 5,
//         comment:
//           "Easy to find, clean bay and the café makes waiting effortless.",
//         date: "2 days ago",
//       },
//       {
//         author: "Ananya Shah",
//         rating: 5,
//         comment: "Fast charging exactly as promised. Good lighting at night.",
//         date: "1 week ago",
//       },
//     ],
//   },
//   {
//     id: "pune-riverfront",
//     name: "Riverfront Charge Hub",
//     address: "Bund Garden Road, Pune",
//     distance: "3.8 km",
//     rating: 4.6,
//     reviewCount: 89,
//     pricePerKwh: 21,
//     openHours: "05:00 – 23:00",
//     chargers: [
//       {
//         type: "DC Ultra",
//         speed: "150 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "11 kW",
//         connector: "Type 2",
//         status: "Available",
//       },
//     ],
//     amenities: ["Restrooms", "Food court", "Security"],
//     image:
//       "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["08:30", "11:00", "13:30", "16:00", "19:30"],
//     reviews: [
//       {
//         author: "Dev Kulkarni",
//         rating: 5,
//         comment: "Best option on the east side. Super clear pricing.",
//         date: "4 days ago",
//       },
//       {
//         author: "Mihir Joshi",
//         rating: 4,
//         comment: "Busy after 6pm, but the booking system saves a lot of time.",
//         date: "2 weeks ago",
//       },
//     ],
//   },
//   {
//     id: "pune-kalyani",
//     name: "Kalyani Nagar Greenpoint",
//     address: "North Main Road, Pune",
//     distance: "5.2 km",
//     rating: 4.7,
//     reviewCount: 54,
//     pricePerKwh: 19,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "80 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "AC Standard",
//         speed: "7 kW",
//         connector: "Type 2",
//         status: "In use",
//       },
//     ],
//     amenities: ["Lounge", "Café", "Pet friendly"],
//     image:
//       "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["09:30", "11:30", "15:00", "18:30"],
//     reviews: [
//       {
//         author: "Priya Nair",
//         rating: 5,
//         comment: "Quiet spot with a lovely lounge. Charged while I worked.",
//         date: "yesterday",
//       },
//     ],
//   },
//   {
//     id: "nashik-highway",
//     name: "Nashik Highway Stop",
//     address: "Mumbai–Agra Highway, Nashik",
//     distance: "8.7 km",
//     rating: 4.4,
//     reviewCount: 41,
//     pricePerKwh: 16,
//     openHours: "Open 24 hours",
//     chargers: [
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//       {
//         type: "DC Fast",
//         speed: "60 kW",
//         connector: "CCS2",
//         status: "Available",
//       },
//     ],
//     amenities: ["Restrooms", "Restaurant", "ATM"],
//     image:
//       "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80",
//     availableSlots: ["10:00", "12:30", "15:30", "20:00"],
//     reviews: [
//       {
//         author: "Sameer Patil",
//         rating: 4,
//         comment: "A dependable stop for a longer drive.",
//         date: "3 weeks ago",
//       },
//     ],
//   },
// ];

// // Initial bookings
// const initialBookings = [
//   {
//     id: "ES-48291",
//     station: "Courtyard by EV",
//     stationId: "nashik-courtyard",
//     charger: "DC Fast · CCS2",
//     date: "Tue, 18 Jun",
//     time: "10:30 – 11:15",
//     cost: 420,
//     status: "upcoming",
//     vehicle: "Tata Nexon EV",
//     qrCode: "EV48291",
//   },
//   {
//     id: "ES-47802",
//     station: "Riverfront Charge Hub",
//     stationId: "pune-riverfront",
//     charger: "DC Ultra · CCS2",
//     date: "Sat, 01 Jun",
//     time: "16:00 – 16:45",
//     cost: 510,
//     status: "completed",
//     vehicle: "Tata Nexon EV",
//     qrCode: "EV47802",
//   },
// ];

// // Initial Slot Exchange listings
// const initialExchange = [
//   {
//     id: "EX-18",
//     owner: "Aarav K.",
//     station: "Riverfront Charge Hub",
//     stationId: "pune-riverfront",
//     charger: "DC Ultra · CCS2",
//     date: "Today",
//     time: "18:30 – 19:15",
//     price: 390,
//     originalPrice: 470,
//     status: "listed",
//   },
//   {
//     id: "EX-21",
//     owner: "Meera S.",
//     station: "Courtyard by EV",
//     stationId: "nashik-courtyard",
//     charger: "DC Fast · CCS2",
//     date: "Tomorrow",
//     time: "09:00 – 09:45",
//     price: 320,
//     originalPrice: 380,
//     status: "listed",
//   },
//   {
//     id: "EX-24",
//     owner: "Kabir R.",
//     station: "Kalyani Nagar Greenpoint",
//     stationId: "pune-kalyani",
//     charger: "DC Fast · CCS2",
//     date: "Thu, 20 Jun",
//     time: "17:00 – 17:45",
//     price: 350,
//     originalPrice: 410,
//     status: "listed",
//   },
// ];

// // Load saved data from localStorage
// function loadFromStorage(key, fallback) {
//   try {
//     if (typeof window === "undefined") {
//       return fallback;
//     }

//     const saved = window.localStorage.getItem(key);

//     if (saved === null) {
//       return fallback;
//     }

//     const parsed = JSON.parse(saved);

//     return Array.isArray(parsed) ? parsed : fallback;
//   } catch (error) {
//     console.error(`Could not load ${key}:`, error);
//     return fallback;
//   }
// }

// // Normalize booking properties
// function normalizeBooking(booking) {
//   return {
//     ...booking,
//     stationName: booking.stationName ?? booking.station,
//     estimatedCost: booking.estimatedCost ?? booking.cost ?? 0,
//   };
// }

// // Main route component
// function RouterView() {
//   const [location, navigate] = useLocation();
//   const [toastMessage, setToast] = useState("");

//   const [bookings, setBookings] = useState(() =>
//     loadFromStorage("ev-bookings", initialBookings).map(normalizeBooking),
//   );

//   const [exchange, setExchange] = useState(() =>
//     loadFromStorage("ev-exchange", initialExchange),
//   );

//   // Show notification
//   const toast = (message) => {
//     setToast(message);
//     window.setTimeout(() => setToast(""), 3200);
//   };

//   // Save bookings whenever they change
//   useEffect(() => {
//     try {
//       window.localStorage.setItem("ev-bookings", JSON.stringify(bookings));
//     } catch (error) {
//       console.error("Could not save bookings:", error);
//     }
//   }, [bookings]);

//   // Save exchange listings whenever they change
//   useEffect(() => {
//     try {
//       window.localStorage.setItem("ev-exchange", JSON.stringify(exchange));
//     } catch (error) {
//       console.error("Could not save exchange listings:", error);
//     }
//   }, [exchange]);

//   // Cancel a booking
//   const cancelBooking = (bookingId) => {
//     const booking = bookings.find((item) => item.id === bookingId);
//     const status = String(booking?.status ?? "").toLowerCase();

//     if (!booking || !["upcoming", "confirmed"].includes(status)) {
//       toast("This booking cannot be cancelled");
//       return;
//     }

//     setBookings((previous) =>
//       previous.map((item) =>
//         item.id === bookingId ? { ...item, status: "cancelled" } : item,
//       ),
//     );

//     toast("Booking cancelled");
//   };

//   // Release a booking to Slot Exchange
//   const releaseBooking = (bookingId, askingPrice) => {
//     const booking = bookings.find((item) => item.id === bookingId);
//     const status = String(booking?.status ?? "").toLowerCase();
//     const price = Number(askingPrice);

//     if (!booking || !["upcoming", "confirmed"].includes(status)) {
//       toast("This booking is not eligible for exchange");
//       return;
//     }

//     if (!Number.isFinite(price) || price <= 0) {
//       toast("Enter a valid exchange price");
//       return;
//     }

//     const listingId = `EX-${booking.id}`;

//     // Prevent duplicate listings
//     if (exchange.some((item) => item.id === listingId)) {
//       toast("This booking is already listed for exchange");
//       return;
//     }

//     const originalPrice = Number(booking.cost ?? booking.estimatedCost ?? 0);

//     const stationName =
//       booking.stationName ?? booking.station ?? "Charging station";

//     const listing = {
//       id: listingId,
//       bookingId: booking.id,
//       owner: "You",
//       station: stationName,
//       stationId: booking.stationId ?? "",
//       charger: booking.charger ?? "Charger not specified",
//       date: booking.date ?? "Date not specified",
//       time: booking.time ?? "Time not specified",
//       price,
//       originalPrice,
//       status: "listed",
//     };

//     // Mark the booking as released
//     setBookings((previous) =>
//       previous.map((item) =>
//         item.id === bookingId ? { ...item, status: "released" } : item,
//       ),
//     );

//     // Add the listing to the marketplace
//     setExchange((previous) => [listing, ...previous]);

//     toast("Booking released to Slot Exchange");
//   };

//   // Login and registration
//   if (location === "/login" || location === "/register") {
//     return <Auth mode={location === "/login" ? "login" : "register"} />;
//   }

//   let page;

//   // Home page
//   if (location === "/") {
//     page = (
//       <HomePage
//         stations={stations}
//         bookings={bookings}
//         exchange={exchange}
//         toast={toast}
//       />
//     );
//   }

//   // Charging stations
//   else if (location === "/stations") {
//     page = <StationsPage stations={stations} toast={toast} />;
//   }

//   // Station details
//   else if (location.startsWith("/stations/")) {
//     const stationId = location.split("/")[2];

//     page = (
//       <StationDetail
//         station={
//           stations.find((station) => station.id === stationId) || stations[0]
//         }
//         toast={toast}
//       />
//     );
//   }

//   // Booking page
//   else if (location === "/book" || location.startsWith("/book/")) {
//     page = (
//       <BookPage
//         stations={stations}
//         bookings={bookings}
//         add={(booking) => {
//           setBookings((previous) => [normalizeBooking(booking), ...previous]);

//           toast("Booking confirmed");
//         }}
//         toast={toast}
//       />
//     );
//   }

//   // Booking history
//   else if (location === "/bookings") {
//     page = (
//       <BookingsPage
//         bookings={bookings}
//         onCancel={cancelBooking}
//         onRelease={releaseBooking}
//         toast={toast}
//       />
//     );
//   }

//   // Slot Exchange marketplace
//   else if (location === "/exchange") {
//     page = (
//       <ExchangePage
//         exchange={exchange}
//         setExchange={setExchange}
//         bookings={bookings}
//         setBookings={setBookings}
//         toast={toast}
//       />
//     );
//   }

//   // User profile
//   else if (location === "/profile") {
//     page = <ProfilePage toast={toast} />;
//   }

//   // Unknown route
//   else {
//     page = (
//       <div className="py-20 text-center">
//         <h1 className="font-display text-3xl font-bold">Page not found</h1>

//         <Button className="mt-5" onClick={() => navigate("/")}>
//           Back home
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <Shell>
//       {page}
//       <Toast message={toastMessage} onClose={() => setToast("")} />
//     </Shell>
//   );
// }

// // React Query client
// const queryClient = new QueryClient();

// // Main application component
// function App() {
//   const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <WouterRouter base={basePath}>
//           <ErrorBoundary>
//             <RouterView />
//           </ErrorBoundary>
//         </WouterRouter>

//         <Toaster />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router as WouterRouter, useLocation } from "wouter";

// Layout Components
import Toast from "./components/layout/Toast";
import Shell from "./components/layout/Shell";
import Button from "./components/layout/Button";

// Pages
import HomePage from "./pages/HomePage";
import StationsPage from "./pages/StationsPage";
import StationDetail from "./pages/StationDetailPage";
import BookPage from "./pages/BookPage";
import ExchangePage from "./pages/ExchangePage";
import BookingsPage from "./pages/BookingsPage";
import ProfilePage from "./pages/ProfilePage";
import Auth from "./pages/AuthPage";

// Sample charging stations
const stations = [
  {
    id: "nashik-courtyard",
    name: "Courtyard by EV",
    address: "College Road, Nashik",
    distance: "1.4 km",
    rating: 4.8,
    reviewCount: 126,
    pricePerKwh: 18,
    openHours: "Open 24 hours",
    chargers: [
      {
        type: "DC Fast",
        speed: "60 kW",
        connector: "CCS2",
        status: "Available",
      },
      {
        type: "AC Standard",
        speed: "22 kW",
        connector: "Type 2",
        status: "Available",
      },
      {
        type: "DC Fast",
        speed: "120 kW",
        connector: "CCS2",
        status: "In use",
      },
    ],
    amenities: ["Café", "Wi-Fi", "Covered parking"],
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=80",
    availableSlots: ["09:00", "10:30", "12:00", "14:30", "17:00"],
    reviews: [
      {
        author: "Rohan Mehta",
        rating: 5,
        comment:
          "Easy to find, clean bay and the café makes waiting effortless.",
        date: "2 days ago",
      },
      {
        author: "Ananya Shah",
        rating: 5,
        comment: "Fast charging exactly as promised. Good lighting at night.",
        date: "1 week ago",
      },
    ],
  },
  {
    id: "pune-riverfront",
    name: "Riverfront Charge Hub",
    address: "Bund Garden Road, Pune",
    distance: "3.8 km",
    rating: 4.6,
    reviewCount: 89,
    pricePerKwh: 21,
    openHours: "05:00 – 23:00",
    chargers: [
      {
        type: "DC Ultra",
        speed: "150 kW",
        connector: "CCS2",
        status: "Available",
      },
      {
        type: "DC Fast",
        speed: "60 kW",
        connector: "CCS2",
        status: "Available",
      },
      {
        type: "AC Standard",
        speed: "11 kW",
        connector: "Type 2",
        status: "Available",
      },
    ],
    amenities: ["Restrooms", "Food court", "Security"],
    image:
      "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=1000&q=80",
    availableSlots: ["08:30", "11:00", "13:30", "16:00", "19:30"],
    reviews: [
      {
        author: "Dev Kulkarni",
        rating: 5,
        comment: "Best option on the east side. Super clear pricing.",
        date: "4 days ago",
      },
      {
        author: "Mihir Joshi",
        rating: 4,
        comment: "Busy after 6pm, but the booking system saves a lot of time.",
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: "pune-kalyani",
    name: "Kalyani Nagar Greenpoint",
    address: "North Main Road, Pune",
    distance: "5.2 km",
    rating: 4.7,
    reviewCount: 54,
    pricePerKwh: 19,
    openHours: "Open 24 hours",
    chargers: [
      {
        type: "DC Fast",
        speed: "80 kW",
        connector: "CCS2",
        status: "Available",
      },
      {
        type: "AC Standard",
        speed: "7 kW",
        connector: "Type 2",
        status: "In use",
      },
    ],
    amenities: ["Lounge", "Café", "Pet friendly"],
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=80",
    availableSlots: ["09:30", "11:30", "15:00", "18:30"],
    reviews: [
      {
        author: "Priya Nair",
        rating: 5,
        comment: "Quiet spot with a lovely lounge. Charged while I worked.",
        date: "yesterday",
      },
    ],
  },
  {
    id: "nashik-highway",
    name: "Nashik Highway Stop",
    address: "Mumbai–Agra Highway, Nashik",
    distance: "8.7 km",
    rating: 4.4,
    reviewCount: 41,
    pricePerKwh: 16,
    openHours: "Open 24 hours",
    chargers: [
      {
        type: "DC Fast",
        speed: "60 kW",
        connector: "CCS2",
        status: "Available",
      },
      {
        type: "DC Fast",
        speed: "60 kW",
        connector: "CCS2",
        status: "Available",
      },
    ],
    amenities: ["Restrooms", "Restaurant", "ATM"],
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80",
    availableSlots: ["10:00", "12:30", "15:30", "20:00"],
    reviews: [
      {
        author: "Sameer Patil",
        rating: 4,
        comment: "A dependable stop for a longer drive.",
        date: "3 weeks ago",
      },
    ],
  },
];

// Initial bookings
const initialBookings = [
  {
    id: "ES-48291",
    station: "Courtyard by EV",
    stationId: "nashik-courtyard",
    charger: "DC Fast · CCS2",
    date: "Tue, 18 Jun",
    time: "10:30 – 11:15",
    cost: 420,
    status: "upcoming",
    vehicle: "Tata Nexon EV",
    qrCode: "EV48291",
  },
  {
    id: "ES-47802",
    station: "Riverfront Charge Hub",
    stationId: "pune-riverfront",
    charger: "DC Ultra · CCS2",
    date: "Sat, 01 Jun",
    time: "16:00 – 16:45",
    cost: 510,
    status: "completed",
    vehicle: "Tata Nexon EV",
    qrCode: "EV47802",
  },
];

// Initial Slot Exchange listings
const initialExchange = [
  {
    id: "EX-18",
    owner: "Aarav K.",
    station: "Riverfront Charge Hub",
    stationId: "pune-riverfront",
    charger: "DC Ultra · CCS2",
    date: "Today",
    time: "18:30 – 19:15",
    price: 390,
    originalPrice: 470,
    status: "listed",
  },
  {
    id: "EX-21",
    owner: "Meera S.",
    station: "Courtyard by EV",
    stationId: "nashik-courtyard",
    charger: "DC Fast · CCS2",
    date: "Tomorrow",
    time: "09:00 – 09:45",
    price: 320,
    originalPrice: 380,
    status: "listed",
  },
  {
    id: "EX-24",
    owner: "Kabir R.",
    station: "Kalyani Nagar Greenpoint",
    stationId: "pune-kalyani",
    charger: "DC Fast · CCS2",
    date: "Thu, 20 Jun",
    time: "17:00 – 17:45",
    price: 350,
    originalPrice: 410,
    status: "listed",
  },
];

// Load saved data from localStorage
function loadFromStorage(key, fallback) {
  try {
    if (typeof window === "undefined") {
      return fallback;
    }

    const saved = window.localStorage.getItem(key);

    if (saved === null) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Could not load ${key}:`, error);
    return fallback;
  }
}

// Normalize booking properties
function normalizeBooking(booking) {
  return {
    ...booking,
    stationName: booking.stationName ?? booking.station,
    estimatedCost: booking.estimatedCost ?? booking.cost ?? 0,
  };
}

// Main route component
function RouterView() {
  const [location, navigate] = useLocation();
  const [toastMessage, setToast] = useState("");

  const [bookings, setBookings] = useState(() =>
    loadFromStorage("ev-bookings", initialBookings).map(normalizeBooking),
  );

  const [exchange, setExchange] = useState(() =>
    loadFromStorage("ev-exchange", initialExchange),
  );

  // Show notification
  const toast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  // Save bookings whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem("ev-bookings", JSON.stringify(bookings));
    } catch (error) {
      console.error("Could not save bookings:", error);
    }
  }, [bookings]);

  // Save exchange listings whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem("ev-exchange", JSON.stringify(exchange));
    } catch (error) {
      console.error("Could not save exchange listings:", error);
    }
  }, [exchange]);

  // Cancel a booking
  const cancelBooking = (bookingId) => {
    const booking = bookings.find((item) => item.id === bookingId);
    const status = String(booking?.status ?? "").toLowerCase();

    if (!booking || !["upcoming", "confirmed"].includes(status)) {
      toast("This booking cannot be cancelled");
      return;
    }

    setBookings((previous) =>
      previous.map((item) =>
        item.id === bookingId ? { ...item, status: "cancelled" } : item,
      ),
    );

    toast("Booking cancelled");
  };

  // Release a booking to Slot Exchange
  const releaseBooking = (bookingId, askingPrice) => {
    const booking = bookings.find((item) => item.id === bookingId);
    const status = String(booking?.status ?? "").toLowerCase();
    const price = Number(askingPrice);

    if (!booking || !["upcoming", "confirmed"].includes(status)) {
      toast("This booking is not eligible for exchange");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      toast("Enter a valid exchange price");
      return;
    }

    const listingId = `EX-${booking.id}`;

    // Prevent duplicate listings
    if (exchange.some((item) => item.id === listingId)) {
      toast("This booking is already listed for exchange");
      return;
    }

    const originalPrice = Number(booking.cost ?? booking.estimatedCost ?? 0);

    const stationName =
      booking.stationName ?? booking.station ?? "Charging station";

    const listing = {
      id: listingId,
      bookingId: booking.id,
      owner: "You",
      station: stationName,
      stationId: booking.stationId ?? "",
      charger: booking.charger ?? "Charger not specified",
      date: booking.date ?? "Date not specified",
      time: booking.time ?? "Time not specified",
      price,
      originalPrice,
      status: "listed",
    };

    // Mark the booking as released
    setBookings((previous) =>
      previous.map((item) =>
        item.id === bookingId ? { ...item, status: "released" } : item,
      ),
    );

    // Add the listing to the marketplace
    setExchange((previous) => [listing, ...previous]);

    toast("Booking released to Slot Exchange");
  };

  // Login and registration
  if (location === "/login" || location === "/register") {
    return <Auth mode={location === "/login" ? "login" : "register"} />;
  }

  let page;

  // Home page
  if (location === "/") {
    page = (
      <HomePage
        stations={stations}
        bookings={bookings}
        exchange={exchange}
        toast={toast}
      />
    );
  }

  // Charging stations
  else if (location === "/stations") {
    page = <StationsPage stations={stations} toast={toast} />;
  }

  // Station details
  else if (location.startsWith("/stations/")) {
    const stationId = location.split("/")[2];

    page = (
      <StationDetail
        station={
          stations.find((station) => station.id === stationId) || stations[0]
        }
        toast={toast}
      />
    );
  }

  // Booking page
  else if (location === "/book" || location.startsWith("/book/")) {
    page = (
      <BookPage
        stations={stations}
        bookings={bookings}
        add={(booking) => {
          setBookings((previous) => [normalizeBooking(booking), ...previous]);
          toast("Booking confirmed");
        }}
        toast={toast}
      />
    );
  }

  // Booking history
  else if (location === "/bookings") {
    page = (
      <BookingsPage
        bookings={bookings}
        onCancel={cancelBooking}
        onRelease={releaseBooking}
        toast={toast}
      />
    );
  }

  // Slot Exchange marketplace
  else if (location === "/exchange") {
    page = (
      <ExchangePage
        exchange={exchange}
        setExchange={setExchange}
        bookings={bookings}
        setBookings={setBookings}
        toast={toast}
      />
    );
  }

  // User profile
  else if (location === "/profile") {
    page = <ProfilePage toast={toast} />;
  }

  // Unknown route
  else {
    page = (
      <div className="py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Page not found</h1>

        <Button className="mt-5" onClick={() => navigate("/")}>
          Back home
        </Button>
      </div>
    );
  }

  return (
    <Shell exchange={exchange}>
      {page}
      <Toast message={toastMessage} onClose={() => setToast("")} />
    </Shell>
  );
}

// React Query client
const queryClient = new QueryClient();

// Main application component
function App() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={basePath}>
          <ErrorBoundary>
            <RouterView />
          </ErrorBoundary>
        </WouterRouter>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
