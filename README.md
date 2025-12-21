# 🩸 LifeBlood Donation Platform (Frontend)

A modern React-based web application for managing blood donation requests, donor registration, and funding support.  
This frontend is designed with a focus on **user experience, responsiveness, and real-time updates**.

---

## 🌐 Live URL
https://melodic-torrone-821cc7.netlify.app/

---

## ✨ Key Frontend Features
- 🔐 **Authentication & Role-Based Access**
  - Firebase authentication (email/password login & registration).
  - Role-based dashboards (Admin, Volunteer, Donor) with protected routes.
  - Redirects users back to the page they intended after login.

- 📝 **Donation Request Management**
  - Donors can create, edit, and delete blood donation requests.
  - Dynamic **district/upazila dropdowns** with real-time filtering.
  - Form validation with inline error messages and confirm password logic.

- 📊 **Dashboard Views**
  - Admins and volunteers can view all requests with status filters (pending, in-progress, done).
  - Donors see only their own requests.
  - Instant UI updates using React Query cache invalidation.

- 💳 **Funding Support**
  - Stripe payment integration with preset and custom donation amounts.
  - SweetAlert2 confirmation before redirecting to checkout.

- 🖼️ **Profile & Image Upload**
  - Donor profile photos uploaded via **imgbb API**.
  - Editable profile with name, phone, address, and blood type.

- ⚡ **Real-Time UI Feedback**
  - Loading spinners on buttons and global overlays during async actions.
  - SweetAlert2 modals for success, error, and confirmation messages.

- 🎨 **Modern UI/UX**
  - Fully responsive design with TailwindCSS and DaisyUI.
  - Consistent styling across forms, modals, and dashboards.
  - Password visibility toggle with eye icons for better usability.

---

## 📦 Frontend Packages Used

### Core
- **React** – Component-based UI library.
- **React Router DOM** – Routing, protected routes, and redirects.
- **React Hook Form** – Form handling, validation, and error messages.
- **React Query (TanStack Query)** – Data fetching, caching, and instant UI updates.
- **Axios** – HTTP client for API requests.

### UI & Styling
- **TailwindCSS** – Utility-first CSS framework for responsive design.
- **DaisyUI** – TailwindCSS component library for styled inputs, buttons, and modals.
- **React Icons** – Icon library (used for password toggle, edit/delete icons).

### Feedback & Alerts
- **SweetAlert2** – Beautiful modals for success, error, and confirmation alerts.
- **Loading Spinners (DaisyUI)** – Inline and global loading indicators.

### Authentication & APIs
- **Firebase Auth (via custom hooks)** – User authentication and profile updates.
- **imgbb API (via Axios)** – Image hosting for donor profile photos.

---

## 🚀 Frontend Highlights
- Clean and consistent **form validation** with inline error messages.
- **Password visibility toggle** for both login and registration forms.
- **Global loading overlay** plus button-level spinners for async actions.
- **Role-based dashboards** with strict UI logic (donors see only their own requests).
- **Stripe-powered funding page** with SweetAlert2 confirmation before payment.

---

💡 *This frontend delivers a professional, responsive, and user-friendly experience for donors, admins, and volunteers alike.*
