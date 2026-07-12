# TransitOps — Smart Transport Operations Platform

TransitOps is a modern, single-page enterprise web application designed to streamline fleet logistics, vehicle maintenance, driver compliance, fuel/expense tracking, and system audit logging. The platform showcases a complete client-side simulation of a robust **Role-Based Access Control (RBAC)** system.

## 🚀 Key Features

- **Granular RBAC System**: Preconfigured with 6 enterprise role profiles:
  - **Administrator**: Complete system settings, user control, and audit logs.
  - **Fleet Manager**: Fleet registry management and maintenance scheduler.
  - **Dispatcher**: Core dashboard and real-time trip operations.
  - **Driver**: Driver portal for trip details and maintenance/incident reports.
  - **Safety Officer**: Driver safety profiles, inspections, and compliance checks.
  - **Financial Analyst**: Fuel receipt logs, expense sheets, and financial analytics.
- **Enterprise Modules**:
  - **Dashboard**: Real-time KPIs, trip status feeds, and active vehicle counts.
  - **Fleet Registry**: Interactive database of vehicles with service statuses.
  - **Driver & Safety**: Driver profiles, license tracking, and safety scoring.
  - **Trip Dispatcher**: Interactive trip planner, route logs, and assignment controls.
  - **Maintenance Portal**: Vehicle checkups, engine alerts, and service logs.
  - **Fuel & Expense Tracker**: Interactive logs for diesel/fuel intake and custom invoices.
  - **Audit Logs**: Cryptographically formatted system events for full transparency.
- **Modern User Experience**: Sleek dark-mode interface with a rich design system, smooth animations, and a responsive mobile layout.

## 🛠️ Tech Stack

- **Frontend**: Semantic HTML5 & Vanilla CSS.
- **Logic**: Pure Client-Side JavaScript (`app.js`) handling UI transitions, simulated databases (in-memory state management), and live RBAC enforcement.
- **Fonts**: Outfit & Inter (via Google Fonts).

## 📁 File Structure

- [index.html](file:///d:/tans/index.html) — Core DOM structure and UI layout.
- [styles.css](file:///d:/tans/styles.css) — Custom modern stylesheets, themes, and layouts.
- [app.js](file:///d:/tans/app.js) — Client-side state management, seed data, and RBAC matrix.

## 🏁 Quick Start

Simply open `index.html` in any modern web browser to view and interact with the application.
You can use the **Demo Role Switcher** in the sidebar footer to quickly hot-swap between role permissions.
