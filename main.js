document.addEventListener("DOMContentLoaded", () => {
    const tickets = window.SupportData || [];

    // Apply saved theme immediately
    const savedTheme = localStorage.getItem('themeMode') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Apply saved sidebar state
    const savedSidebar = localStorage.getItem('sidebarCollapsed');
    if (savedSidebar === 'true') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.add('collapsed');
    }

    // DOM Elements
    const tbody = document.getElementById("ticketTableBody");
    const searchInput = document.getElementById("searchInput");
    const filterBtns = document.querySelectorAll(".filter-btn");

    const metricOpen = document.getElementById("metric-open");
    const metricEscalated = document.getElementById("metric-escalated");

    // State
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get("view");

    let currentSearch = "";
    let currentStatus = "All"; // "All", "New", "In Progress", "Escalated", "Closed"
    let currentQueue = "all"; // "all", "assigned", "escalations"

    if (viewParam === "assigned") currentQueue = "assigned";
    if (viewParam === "escalations") currentQueue = "escalations";

    // Set page title and active states based on view
    const titleEle = document.getElementById("pageTitle");
    if (titleEle) {
        if (currentQueue === "assigned") titleEle.textContent = "Assigned to Me";
        if (currentQueue === "escalations") titleEle.textContent = "Escalations";
    }

    // Handle initial Status default for Escalations view
    if (currentQueue === "escalations") {
        currentStatus = "Escalated";
        // Visually update the filter button
        document.querySelectorAll(".filter-btn").forEach(b => {
            b.classList.remove("active");
            if (b.dataset.status === "Escalated") b.classList.add("active");
        });
    }

    // Handle mock navigation for sidebar (for things not implemented)
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(nav => {
        nav.addEventListener("click", (e) => {
            if (nav.getAttribute("href") === "#") {
                e.preventDefault();
                navItems.forEach(n => n.classList.remove("active"));
                nav.classList.add("active");
                alert("Prototype: " + nav.innerText.trim() + " view is not implemented in this demo.");
            }
        });
    });

    // Sidebar Toggle Logic
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                sidebar.classList.toggle("collapsed");
                localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
            }
        });
    }

    // Settings Theme Toggle Logic
    const themeRadios = document.querySelectorAll('input[name="themeMode"]');
    if (themeRadios.length > 0) {
        // Init styling
        themeRadios.forEach(radio => {
            if (radio.id === `theme-${savedTheme}`) radio.checked = true;
            radio.addEventListener("change", (e) => {
                const val = e.target.id.replace('theme-', '');
                if (val === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('themeMode', 'dark');
                } else {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('themeMode', 'light');
                }
            });
        });
    }

    // Initial render
    updateMetrics();
    if (tbody) renderTable();

    // Setup input listeners
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearch = e.target.value.toLowerCase();
            if (tbody) renderTable();
        });
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Update active styling
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                // Update state and re-render
                currentStatus = btn.dataset.status;
                if (tbody) renderTable();
            });
        });
    }

    function getFilteredTickets() {
        return tickets.filter(t => {
            // Queue match (from URL parameter)
            let matchesQueue = true;
            if (currentQueue === "assigned") {
                matchesQueue = t.assignedTo === "You";
            } else if (currentQueue === "escalations") {
                matchesQueue = t.status === "Escalated" || t.priority === "High";
            }

            // Status match
            const matchesStatus = currentStatus === "All" || t.status === currentStatus;

            // Search match (subject text)
            const matchesSearch = t.subject.toLowerCase().includes(currentSearch);

            return matchesQueue && matchesStatus && matchesSearch;
        });
    }

    function updateMetrics() {
        if (currentQueue === "assigned") {
            // "in the assigned to me section let the blocks give a description of the tickects taht are assigned to me. like the number os tickects assignmed to me, the status and p[riority."
            let myOpenCount = 0;
            let myHighPriority = 0;
            let myEscalated = 0;
            let myClosed = 0;

            const myTickets = tickets.filter(t => t.assignedTo === "You");

            myTickets.forEach(t => {
                if (t.status === "New" || t.status === "In Progress") myOpenCount++;
                if (t.priority === "High") myHighPriority++;
                if (t.status === "Escalated") myEscalated++;
                if (t.status === "Closed") myClosed++;
            });

            const grid = document.querySelector(".metrics-grid");
            if (grid) {
                grid.innerHTML = `
                    <div class="metric-card"><div class="metric-title">My Tickets (Open)</div><div class="metric-value">${myOpenCount}</div></div>
                    <div class="metric-card"><div class="metric-title">High Priority</div><div class="metric-value" style="color: var(--priority-high);">${myHighPriority}</div></div>
                    <div class="metric-card"><div class="metric-title">Escalated</div><div class="metric-value" style="color: var(--status-escalated);">${myEscalated}</div></div>
                    <div class="metric-card"><div class="metric-title">Closed</div><div class="metric-value text-secondary">${myClosed}</div></div>
                `;
            }
        } else {
            // Standard Dashboard Metrics
            let openCount = 0;
            let escalatedCount = 0;

            tickets.forEach(t => {
                if (t.status === "New" || t.status === "In Progress") {
                    openCount++;
                }
                if (t.status === "Escalated") {
                    escalatedCount++;
                }
            });

            if (metricOpen) metricOpen.textContent = openCount;
            if (metricEscalated) metricEscalated.textContent = escalatedCount;
        }
    }

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function renderTable() {
        const filtered = getFilteredTickets();

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 32px;">No tickets found matching your criteria.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(t => {
            const statusClass = `badge-status-${t.status.replace(/ /g, '-')}`;
            const priorityClass = `badge-priority-${t.priority}`;

            // Style closed tickets as muted row entirely? The prompt says "visually styled as muted" for Closed state.
            const rowStyle = t.status === "Closed" ? 'style="opacity: 0.6;"' : '';

            return `
                <tr onclick="window.location.href='ticket.html?id=${t.id}'" ${rowStyle}>
                    <td class="font-medium">${t.id}</td>
                    <td>
                        <div class="font-medium">${t.customerName}</div>
                        <div class="text-sm text-secondary">${t.company}</div>
                    </td>
                    <td>${t.subject}</td>
                    <td><div class="text-sm">${t.assignedTo || "Unassigned"}</div></td>
                    <td><span class="badge ${priorityClass}">${t.priority}</span></td>
                    <td><span class="badge ${statusClass}">${t.status}</span></td>
                    <td style="text-align: right" class="text-secondary">${formatDate(t.lastUpdated)}</td>
                </tr>
            `;
        }).join("");
    }
});
