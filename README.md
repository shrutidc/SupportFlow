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
└─ ticket.js
