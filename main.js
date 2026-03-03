document.addEventListener("DOMContentLoaded", () => {
    const tickets = window.SupportData || [];

    const savedTheme = localStorage.getItem('themeMode') || 'light';

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

    // Removed mock navigation alert since links are now real

    // Sidebar Toggle Logic
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", () => {
            document.documentElement.classList.toggle("sidebar-collapsed");
            localStorage.setItem("sidebarCollapsed", document.documentElement.classList.contains("sidebar-collapsed"));
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
                matchesQueue = t.status === "Escalated";
            }

            // Status match
            const matchesStatus = currentStatus === "All" || t.status === currentStatus;

            // Search match (subject text)
            const matchesSearch = t.subject.toLowerCase().includes(currentSearch);

            return matchesQueue && matchesStatus && matchesSearch;
        });
    }

    function updateMetrics() {
        let openCount = 0;
        let escalatedCount = 0;

        const queueTickets = tickets.filter(t => {
            if (currentQueue === "assigned") return t.assignedTo === "You";
            if (currentQueue === "escalations") return t.status === "Escalated";
            return true;
        });

        queueTickets.forEach(t => {
            if (t.status === "New" || t.status === "In Progress") {
                openCount++;
            }
            if (t.status === "Escalated") {
                escalatedCount++;
            }
        });

        const grid = document.querySelector(".metrics-grid");
        if (grid) {
            grid.innerHTML = `
                <div class="metric-card"><div class="metric-title">Open Tickets</div><div class="metric-value" id="metric-open">${openCount}</div></div>
                <div class="metric-card"><div class="metric-title">Escalated</div><div class="metric-value" id="metric-escalated" style="color: var(--status-escalated);">${escalatedCount}</div></div>
                <div class="metric-card"><div class="metric-title">Avg Response Time</div><div class="metric-value">1.4h</div></div>
                <div class="metric-card"><div class="metric-title">Customer Satisfaction</div><div class="metric-value">98%</div></div>
            `;
        }
    }

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function renderTable() {
        const filtered = getFilteredTickets();

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 48px;">
                        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; background: var(--bg-secondary); padding: 32px; border-radius: 8px; border: 1px solid var(--border-color);">
                            <h3 style="margin: 0; color: var(--text-primary);">No tickets found</h3>
                            <p style="margin: 0; color: var(--text-secondary);">Try adjusting your filters.</p>
                            <button class="btn btn-primary" id="clearFiltersBtn" style="margin-top: 8px;">Clear filters</button>
                        </div>
                    </td>
                </tr>
            `;
            setTimeout(() => {
                const clearBtn = document.getElementById("clearFiltersBtn");
                if (clearBtn) {
                    clearBtn.addEventListener("click", clearFilters);
                }
            }, 0);
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

    function clearFilters() {
        if (searchInput) {
            searchInput.value = "";
            currentSearch = "";
        }
        currentStatus = "All";
        if (filterBtns) {
            filterBtns.forEach(b => {
                b.classList.remove("active");
                if (b.dataset.status === "All") b.classList.add("active");
            });
        }

        // Reset queue to view default
        if (viewParam === "assigned") currentQueue = "assigned";
        else if (viewParam === "escalations") {
            currentQueue = "escalations";
            currentStatus = "Escalated";
            if (filterBtns) {
                filterBtns.forEach(b => {
                    b.classList.remove("active");
                    if (b.dataset.status === "Escalated") b.classList.add("active");
                });
            }
        } else {
            currentQueue = "all";
        }

        if (tbody) renderTable();
    }

    // --- Client-Side Routing for index.html views ---
    const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    if (isIndexPage) {
        const indexNavs = document.querySelectorAll('a.nav-item[href^="index.html"]');
        indexNavs.forEach(nav => {
            nav.addEventListener('click', (e) => {
                e.preventDefault();
                const targetHref = nav.getAttribute('href');
                window.history.pushState({}, '', targetHref);

                // Parse new view
                const newParams = new URLSearchParams(targetHref.split('?')[1] || "");
                const newView = newParams.get('view');

                // Update state
                if (newView === 'assigned') currentQueue = 'assigned';
                else if (newView === 'escalations') currentQueue = 'escalations';
                else currentQueue = 'all';

                // Update UI active navs
                document.querySelectorAll('.sidebar-nav .nav-item').forEach(n => n.classList.remove('active'));
                nav.classList.add('active');

                // Update title, status, filters
                updateViewState();
            });
        });

        window.addEventListener('popstate', () => {
            const newParams = new URLSearchParams(window.location.search);
            const newView = newParams.get('view');

            if (newView === 'assigned') currentQueue = 'assigned';
            else if (newView === 'escalations') currentQueue = 'escalations';
            else currentQueue = 'all';

            // update active nav visually
            document.querySelectorAll('.sidebar-nav .nav-item').forEach(n => n.classList.remove('active'));
            if (currentQueue === 'assigned') {
                const n = document.getElementById('nav-assigned');
                if (n) n.classList.add('active');
            } else if (currentQueue === 'escalations') {
                const n = document.querySelector('a.nav-item[href="index.html?view=escalations"]');
                if (n) n.classList.add('active');
            } else {
                const n = document.getElementById('nav-tickets');
                if (n) n.classList.add('active');
            }

            updateViewState();
        });

        function updateViewState() {
            const titleEle = document.getElementById("pageTitle");
            if (titleEle) {
                if (currentQueue === "assigned") titleEle.textContent = "Assigned to Me";
                else if (currentQueue === "escalations") titleEle.textContent = "Escalations";
                else titleEle.textContent = "Tickets";
            }

            if (currentQueue === "escalations") currentStatus = "Escalated";
            else currentStatus = "All"; // default for others

            if (filterBtns) {
                filterBtns.forEach(b => {
                    b.classList.remove("active");
                    if (b.dataset.status === currentStatus) b.classList.add("active");
                });
            }

            if (searchInput) {
                searchInput.value = "";
                currentSearch = "";
            }

            updateMetrics();
            if (tbody) renderTable();
        }
    }
});
