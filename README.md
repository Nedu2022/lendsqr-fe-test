
# 💼 Lendsqr Dashboard Clone

---

## 📌 What I Built

This is a responsive frontend clone of the **Lendsqr admin dashboard**, built with **React and TypeScript**. It includes:

- A login page with demo authentication
- A sidebar for navigation
- A dashboard overview
- A paginated users table
- A user details page with tabbed sections

The application consumes data from a **mock API**, and uses **localStorage** to simulate real data persistence.

---

## 🔐 Demo Login Credentials

Use the following credentials to log in to the dashboard:


Email:    [admin@demo.com](mailto:admin@demo.com)

Password: admin123

```

> _Note: This login is simulated on the frontend for demo purposes only._

---

## 🧰 Technologies Used and Why

| Technology     | Why It Was Used |
|----------------|------------------|
| **React**      | For building modular, reusable UI components and managing view state |
| **TypeScript** | For static type checking and improved development experience |
| **SCSS**       | For scoped, maintainable styling using variables and mixins |
| **Vite**       | For a fast development environment and lightning-fast builds |
| **MockAPI**    | Used to simulate real backend user data (500+ records) |
| **localStorage** | Used to persist selected user data without needing a full backend |

---

## 💡 Key Decisions That Shaped the Project

- **Component Structure**  
  Pages and layout components were separated for better organization and maintainability.

- **Data Persistence**  
  I used `localStorage` instead of IndexedDB, given the project’s lightweight data needs.

- **API Data Handling**  
  The mock API returned inconsistent structures (e.g., `profile.firstName`, `personal_info.full_name`, etc.), so I wrote transformation logic to normalize user data before rendering.

- **Pagination**  
  Implemented **client-side pagination** for the Users table for better control and simplicity.

- **Fonts & Design**  
  Custom fonts were integrated into the Login, Dashboard, and Users pages. Font support on the User Details page is pending.

---

## 🆚 Comparison to Original Lendsqr Dashboard

- **Design Fidelity**  
  The UI layout and structure follow the original Lendsqr dashboard closely, with some slight adjustments where asset or font details weren’t publicly available.

- **Functionality**  
  Core features like user display, filtering structure, and detail viewing are implemented. Some advanced functionality like real notifications, loans, or settings are simplified.

- **Responsiveness**  
  The app is mobile-responsive using SCSS and media queries, though a few components could be refined further for small screens.

---

## 📂 Project Paths

- ✅ **Live Demo:** [Your Vercel/Netlify Link Here]  
- ✅ **GitHub Repo:** [Your GitHub Repo Link Here]  
- ✅ **Loom Video Walkthrough:** [Your Loom Video Link Here]  
- 🔗 **Sample Google Doc Submission:**  
  https://docs.google.com/document/d/1xSAMPLELINK

---

## 🙋‍♂️ Author

**Chinedu Nwabuokei**  
[Portfolio](https://your-portfolio-link.com) • [GitHub](https://github.com/yourusername) • [LinkedIn](https://linkedin.com/in/yourusername)

---
```
