## SupportFlow

SupportFlow is a lightweight, enterprise-style **customer support ticket console** built with **vanilla HTML, CSS, and JavaScript**. It models how a mid-size B2B SaaS support team triages, assigns, escalates, and resolves customer issues through a clean **Ticket Queue (Dashboard)** and **Ticket Detail** workflow.

---

### Features

- **Ticket Queue Dashboard** with realistic SaaS support issues
- **Status lifecycle:** `New → In Progress → Escalated → Closed`
- **Ownership model:** tickets may start unassigned; once claimed they have **single-agent ownership**
- **Escalation meaning (modeled in UI):**
  - reassigned to **Engineering Queue**
  - **Priority becomes High**
  - **tighter SLA** indicator
- **Status filter buttons** (New / In Progress / Escalated / Closed)
- **Clickable ticket rows** → navigate to `ticket.html`
- **Collapsible sidebar** (hamburger on smaller screens)
- **Light/Dark mode** (Appearance)

---

### Sample Data

Designed around a fictional **mid-size B2B SaaS AI workflow automation platform**.

**Ticket categories/tags:**
- Billing
- Integration
- Bug
- Account Access

**Ticket count:**
- 20 tickets (tight + realistic demo)

---

### Pages

- `index.html` — entry point
- `dashboard.html` — ticket queue + filters
- `ticket.html` — ticket detail (conversation + metadata panel)
- `reports.html` — placeholder page (enterprise nav realism)
- `settings.html` — placeholder page (enterprise nav realism)

---

### Tech Stack

- HTML5
- CSS3 (Flexbox/Grid, responsive breakpoints)
- JavaScript (UI behavior + rendering from static data)

---

### Project Structure

```txt
SupportFlow/
├─ index.html
├─ dashboard.html
├─ ticket.html
├─ reports.html
├─ settings.html
├─ styles.css
├─ data.js
├─ main.js
├─ ticket.js
└─ /server/
   ├─ models/Ticket.js
   ├─ server.js
   └─ seed.js

---

### Backend Setup and Running Locally

To run the application with the new Node.js + Express backend and MongoDB database:

1. **Set your MongoDB URI**
   Create a `.env` file in the `/server` directory and export the connection string to your MongoDB Atlas cluster (or local instance).
   ```bash
   cd server
   echo "MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/supportflow?retryWrites=true&w=majority" > .env
   ```

2. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Seed Initial Data**
   The application requires initial data mapping the old `data.js` objects into MongoDB.
   ```bash
   npm run seed
   ```
   *(This script will connect to your database, wipe existing tickets, and populate it with 20 sample tickets.)*

4. **Run the Server**
   ```bash
   # Production
   npm start
   
   # Development (with nodemon)
   npm run dev
   ```
   Once the server is running, the Node.js application will serve the frontend static files. Open your browser and navigate to `http://localhost:3000/index.html`.
