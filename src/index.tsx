/* @refresh reload */
import { render } from "solid-js/web";
import { initializeApp } from "firebase/app";

import "./index.css";
import { App } from "./App";
import { getAuth } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error("Missing FIREBASE_API_KEY env var");
}
if (!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) {
  throw new Error("Missing FIREBASE_AUTH_DOMAIN env var");
}
if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) {
  throw new Error("Missing FIREBASE_PROJECT_ID env var");
}
if (!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) {
  throw new Error("Missing FIREBASE_STORAGE_BUCKET env var");
}
if (!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) {
  throw new Error("Missing FIREBASE_MESSAGING_SENDER_ID env var");
}
if (!import.meta.env.VITE_FIREBASE_APP_ID) {
  throw new Error("Missing FIREBASE_APP_ID env var");
}
if (!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID) {
  throw new Error("Missing FIREBASE_MEASUREMENT_ID env var");
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const queryClient = new QueryClient();

getAuth(firebaseApp);

const root = document.getElementById("root");

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <App />
      <div id="portal-host" />
      <SolidQueryDevtools />
    </QueryClientProvider>
  ),
  root!
);
