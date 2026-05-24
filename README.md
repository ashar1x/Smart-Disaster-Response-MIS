# Smart Disaster Response MIS

A full-stack Management Information System for coordinating disaster response operations. Built with React, Node.js, and SQL Server as a fourth semester Database course project. It handles emergency tracking, resource allocation, hospital management, team coordination, finance approvals, and a full audit log — all with role-based access control.

---

## What is this?

A web-based platform for managing disaster response operations across multiple roles. Different users see different things and can do different things depending on whether they are an admin, coordinator, or field operator. The database layer is the core of the project with a heavily normalized schema, triggers, views, stored procedures, indexes, and permission grants all written from scratch.

---

## Features

- Role-based access control with JWT authentication
- Emergency incident tracking and status management
- Resource allocation and availability tracking
- Hospital capacity and patient management
- Team assignment and coordination
- Finance requests and multi-level approval workflow
- Full audit log of all system actions
- Database views, triggers, indexes, and permission grants
- Performance testing and index optimization reports

---

## Tech Stack

**Frontend:** React, Tailwind CSS, Axios

**Backend:** Node.js, Express, JWT authentication, RBAC middleware

**Database:** Microsoft SQL Server with full DDL, DML, triggers, views, indexes, stored procedures, and role-based permissions

---

## How to Run

> Requires Node.js and Microsoft SQL Server.

**Database setup (run in order):**
```sql
-- Run these in SQL Server Management Studio
disaster_mis_ddl.sql         -- creates all tables
disaster_mis_dml.sql         -- seeds initial data
disaster_mis_views.sql       -- creates views
disaster_mis_triggers.sql    -- sets up triggers
disaster_mis_indexes.sql     -- adds indexes
disaster_mis_permissions.sql -- grants role permissions
register_test_users.sql      -- creates test user accounts
```

**Backend:**
```bash
cd backend
npm install
# create a .env file with your DB credentials (see below)
node src/server.js
```

**.env file format:**
```
DB_SERVER=your_server
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

**Frontend:**
```bash
cd frontend/disaster-frontend
npm install
npm start
```

Test credentials are in `TEST_CREDENTIALS.txt`.

---

## Project Structure

```
backend/
  src/
    config/db.js          # SQL Server connection
    middleware/
      auth.js             # JWT verification
      rbac.js             # role-based access control
    routes/
      auth.js             # login and register
      emergencies.js      # incident management
      resources.js        # resource allocation
      hospitals.js        # hospital data
      teams.js            # team management
      finance.js          # finance requests
      approvals.js        # approval workflow
      transactions.js     # transaction records
      audit.js            # audit log
    server.js             # Express app entry point
  package.json

database/
  disaster_mis_ddl.sql         # schema creation
  disaster_mis_dml.sql         # seed data
  disaster_mis_views.sql       # database views
  disaster_mis_triggers.sql    # triggers
  disaster_mis_indexes.sql     # indexes
  disaster_mis_permissions.sql # role permissions
  mis_reports.sql              # reporting queries
  performance_test.sql         # performance benchmarks
  index_performance_report.sql # index analysis

frontend/disaster-frontend/
  src/
    pages/                # Dashboard, Emergencies, Resources, etc.
    components/           # Navbar, ProtectedRoute
    context/              # AuthContext
    api/axios.js          # API client

docs/
  mis_queries.sql         # sample MIS queries
  performance_report.md   # index performance analysis
  rationale.md            # design decisions
```

---

## Notes

Fourth semester Database course project. The database design was the main focus: normalized schema, trigger-based audit logging, view-based reporting, index optimization with before/after performance comparisons, and stored permission grants per role. The backend is a thin API layer that connects the React frontend to the SQL Server database.

---

## License

Feel free to use or learn from this. Credit appreciated but not required.
