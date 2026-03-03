document.addEventListener("DOMContentLoaded", () => {
    const tickets = window.SupportData || [];
    const contentArea = document.getElementById("ticketContent");

    // Extract ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const ticketId = urlParams.get("id");

    // Navigation works via standard links

    const ticket = tickets.find(t => t.id === ticketId);

    if (!ticket) {
        renderNotFound();
        return;
    }

    renderTicket(ticket);

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function renderNotFound() {
        contentArea.innerHTML = `
            <div style="text-align: center; padding: 64px 20px;">
                <h2 style="color: var(--text-primary); margin-bottom: 8px;">Ticket not found</h2>
                <p style="color: var(--text-secondary); margin-bottom: 16px;">The ticket ID you requested does not exist or has been removed.</p>
                <button class="btn btn-primary" onclick="window.location.href='index.html'">Return to Dashboard</button>
            </div>
        `;
    }

    function renderTicket(t) {
        const statusClass = `badge-status-${t.status.replace(/ /g, '-')}`;
        const priorityClass = `badge-priority-${t.priority}`;

        let messagesHtml = t.messages.map(msg => {
            const isCustomer = msg.sender === "customer";
            const alignClass = isCustomer ? "customer" : "agent";
            const senderName = isCustomer ? t.customerName : t.assignedTo || "Agent";
            return `
                <div class="message ${alignClass}">
                    <div class="message-meta">${senderName} &bull; ${formatDate(msg.timestamp)}</div>
                    <div class="message-bubble">${msg.body}</div>
                </div>
            `;
        }).join("");

        contentArea.innerHTML = `
            <!-- Ticket Header -->
            <div class="ticket-header">
                <div class="ticket-header-left">
                    <h1 style="margin-bottom: 4px;">${t.subject}</h1>
                    <div class="ticket-meta-row">
                        <span class="text-secondary font-medium">${t.id}</span>
                        <span class="badge ${priorityClass}">${t.priority}</span>
                    </div>
                </div>
                <div>
                    <!-- Visual dropdown for status -->
                    <select class="search-input" style="width: 140px; padding: 6px 12px;">
                        <option ${t.status === 'New' ? 'selected' : ''}>New</option>
                        <option ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option ${t.status === 'Escalated' ? 'selected' : ''}>Escalated</option>
                        <option ${t.status === 'Closed' ? 'selected' : ''}>Closed</option>
                    </select>
                </div>
            </div>

            <!-- Ticket Layout -->
            <div class="ticket-layout">
                <!-- Left: Conversation (70%) -->
                <div class="ticket-main">
                    <div class="conversation">
                        <div class="messages-area">
                            ${messagesHtml}
                        </div>
                        
                        <!-- Reply Composer -->
                        <div class="composer">
                            <textarea placeholder="Type your reply to ${t.customerName}..."></textarea>
                            <div class="composer-actions">
                                <button class="btn btn-primary">Send Reply</button>
                                <button class="btn btn-secondary">Add Internal Note</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Info Panel (30%) -->
                <div class="ticket-sidebar">
                    <!-- Customer Details -->
                    <div class="info-card">
                        <div class="info-card-header">Customer Details</div>
                        <div class="info-list">
                            <div class="info-item">
                                <span class="info-label">Name</span>
                                <span class="info-value">${t.customerName}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Company</span>
                                <span class="info-value">${t.company}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Email</span>
                                <span class="info-value"><a href="mailto:${t.email}" style="color: var(--accent-color); text-decoration: none;">${t.email}</a></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Phone</span>
                                <span class="info-value">${t.phone}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Ticket Metadata -->
                    <div class="info-card">
                        <div class="info-card-header">Ticket Attributes</div>
                        <div class="info-list">
                            <div class="info-item">
                                <span class="info-label">Category</span>
                                <div style="margin-top: 4px;"><span class="chip">${t.category}</span></div>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Assigned To</span>
                                <span class="info-value">${t.assignedTo || "Unassigned"}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Created</span>
                                <span class="info-value">${formatDate(t.createdAt)}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">SLA Deadline</span>
                                <span class="info-value" style="color: var(--priority-high); font-weight: 600;">${formatDate(t.slaDeadline)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
