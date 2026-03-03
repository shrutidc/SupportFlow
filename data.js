const SupportData = [
  {
    id: "SF-1001",
    customerName: "Alice Walker",
    company: "Acme Corp",
    email: "alice@acmecorp.com",
    phone: "+1-555-0101",
    subject: "Cannot access billing portal",
    category: "Account Access",
    priority: "High",
    status: "New",
    assignedTo: null,
    createdAt: "2026-02-18T09:00:00Z",
    lastUpdated: "2026-02-18T09:00:00Z",
    slaDeadline: "2026-02-21T09:00:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "I am trying to download my latest invoice but the portal keeps redirecting me to the login page. This is urgent.", timestamp: "2026-02-18T09:00:00Z" }
    ]
  },
  {
    id: "SF-1002",
    customerName: "Bob Smith",
    company: "TechFlow",
    email: "bsmith@techflow.io",
    phone: "+1-555-0102",
    subject: "API returning 500 errors",
    category: "Integration",
    priority: "High",
    status: "Escalated",
    assignedTo: "Engineering Queue",
    createdAt: "2026-02-19T10:15:00Z",
    lastUpdated: "2026-02-19T14:30:00Z",
    slaDeadline: "2026-02-20T10:15:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "Our automated workflow stopped working this morning. The API endpoints are returning 500 Internal Server Error.", timestamp: "2026-02-19T10:15:00Z" },
      { sender: "agent", body: "Hi Bob, I'm sorry to hear that. I'm taking a look now.", timestamp: "2026-02-19T10:30:00Z" },
      { sender: "agent", body: "I've reproduced the issue and escalated this to our engineering team for immediate review.", timestamp: "2026-02-19T14:30:00Z" }
    ]
  },
  {
    id: "SF-1003",
    customerName: "Charlie Davis",
    company: "DataSync",
    email: "charlie@datasync.co",
    phone: "+1-555-0103",
    subject: "Question about premium tier pricing",
    category: "Billing",
    priority: "Low",
    status: "In Progress",
    assignedTo: "You",
    createdAt: "2026-02-19T11:00:00Z",
    lastUpdated: "2026-02-19T13:45:00Z",
    slaDeadline: "2026-02-22T11:00:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "Hi, I'm considering upgrading to the premium tier and wanted to know if there's an annual discount.", timestamp: "2026-02-19T11:00:00Z" },
      { sender: "agent", body: "Hello Charlie, yes we offer a 15% discount for annual commitments. Would you like me to send a quote?", timestamp: "2026-02-19T13:45:00Z" }
    ]
  },
  {
    id: "SF-1004",
    customerName: "Diana Prince",
    company: "WonderWeb",
    email: "diana@wonderweb.net",
    phone: "+1-555-0104",
    subject: "Dashboard UI glitch on mobile safari",
    category: "Bug",
    priority: "Medium",
    status: "New",
    assignedTo: null,
    createdAt: "2026-02-20T08:20:00Z",
    lastUpdated: "2026-02-20T08:20:00Z",
    slaDeadline: "2026-02-23T08:20:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "The left sidebar is overlapping the main content when I view the dashboard on my iPhone.", timestamp: "2026-02-20T08:20:00Z" }
    ]
  },
  {
    id: "SF-1005",
    customerName: "Evan Wright",
    company: "Wright Solutions",
    email: "evan@wrightsolutions.inc",
    phone: "+1-555-0105",
    subject: "How do I add a new team member?",
    category: "Account Access",
    priority: "Low",
    status: "Closed",
    assignedTo: "You",
    createdAt: "2026-02-17T14:00:00Z",
    lastUpdated: "2026-02-17T15:30:00Z",
    slaDeadline: "2026-02-20T14:00:00Z",
    sentiment: "Positive",
    messages: [
      { sender: "customer", body: "I hired a new contractor and need to give them access to the platform.", timestamp: "2026-02-17T14:00:00Z" },
      { sender: "agent", body: "Hi Evan, you can invite team members under Settings > Team Management. Here's a link: [link].", timestamp: "2026-02-17T14:15:00Z" },
      { sender: "customer", body: "Perfect, figured it out. Thanks for the quick help!", timestamp: "2026-02-17T15:30:00Z" }
    ]
  },
  {
    id: "SF-1006",
    customerName: "Fiona Gallagher",
    company: "Shamrock Media",
    email: "fgallagher@shamrock.tv",
    phone: "+1-555-0106",
    subject: "Integration with Salesforce failing",
    category: "Integration",
    priority: "High",
    status: "Escalated",
    assignedTo: "Engineering Queue",
    createdAt: "2026-02-19T09:30:00Z",
    lastUpdated: "2026-02-19T16:00:00Z",
    slaDeadline: "2026-02-20T09:30:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "Our Salesforce sync has been stuck in 'pending' mode since yesterday.", timestamp: "2026-02-19T09:30:00Z" },
      { sender: "agent", body: "Hi Fiona, I can see the sync job is stalled. Let me check the logs.", timestamp: "2026-02-19T10:00:00Z" },
      { sender: "agent", body: "There seems to be an authentication mismatch. I'm escalating this to the engineers to reset the token silently.", timestamp: "2026-02-19T16:00:00Z" }
    ]
  },
  {
    id: "SF-1007",
    customerName: "George Miller",
    company: "Mad Max Logistics",
    email: "gmiller@madmax.com",
    phone: "+1-555-0107",
    subject: "Charged twice for this month",
    category: "Billing",
    priority: "High",
    status: "In Progress",
    assignedTo: "You",
    createdAt: "2026-02-20T07:15:00Z",
    lastUpdated: "2026-02-20T10:45:00Z",
    slaDeadline: "2026-02-21T07:15:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "I just noticed my credit card has two identical charges for this month's subscription. Please refund one.", timestamp: "2026-02-20T07:15:00Z" },
      { sender: "agent", body: "Hi George, I apologize for the duplicate charge. I'm investigating this with our payment processor right now.", timestamp: "2026-02-20T10:45:00Z" }
    ]
  },
  {
    id: "SF-1008",
    customerName: "Helen Troy",
    company: "Iliad Designs",
    email: "helen@iliad.io",
    phone: "+1-555-0108",
    subject: "Typo in standard email template",
    category: "Bug",
    priority: "Low",
    status: "New",
    assignedTo: null,
    createdAt: "2026-02-20T12:00:00Z",
    lastUpdated: "2026-02-20T12:00:00Z",
    slaDeadline: "2026-02-23T12:00:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "Just a heads up, the default welcome template has a typo in the second paragraph. 'Thx' should probably be 'Thanks'.", timestamp: "2026-02-20T12:00:00Z" }
    ]
  },
  {
    id: "SF-1009",
    customerName: "Ian Malcolm",
    company: "Chaos Theory Analytics",
    email: "ian@chaostheory.com",
    phone: "+1-555-0109",
    subject: "Need admin rights transferred",
    category: "Account Access",
    priority: "Medium",
    status: "Closed",
    assignedTo: "You",
    createdAt: "2026-02-15T10:00:00Z",
    lastUpdated: "2026-02-16T09:00:00Z",
    slaDeadline: "2026-02-18T10:00:00Z",
    sentiment: "Positive",
    messages: [
      { sender: "customer", body: "Our previous admin left the company. Can you transfer the owner role to my account?", timestamp: "2026-02-15T10:00:00Z" },
      { sender: "agent", body: "Hi Ian, certainly. I just need you to submit an authorization form signed by a director.", timestamp: "2026-02-15T11:00:00Z" },
      { sender: "customer", body: "Form attached. Thanks.", timestamp: "2026-02-16T08:30:00Z" },
      { sender: "agent", body: "Received. I have transferred the owner role. Let me know if you need anything else!", timestamp: "2026-02-16T09:00:00Z" }
    ]
  },
  {
    id: "SF-1010",
    customerName: "Julia Child",
    company: "French Recipes Co",
    email: "julia@frenchrecipes.com",
    phone: "+1-555-0110",
    subject: "Export feature is timing out",
    category: "Bug",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "You",
    createdAt: "2026-02-19T15:20:00Z",
    lastUpdated: "2026-02-20T09:00:00Z",
    slaDeadline: "2026-02-22T15:20:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "When I try to export my user list to CSV, it spins for 5 minutes and then times out.", timestamp: "2026-02-19T15:20:00Z" },
      { sender: "agent", body: "Hi Julia, this is a known issue with large datasets we are optimizing right now. As a workaround, I can generate the export manually for you today. Would that help?", timestamp: "2026-02-20T09:00:00Z" }
    ]
  },
  {
    id: "SF-1011",
    customerName: "Kevin Spacey",
    company: "House of Cards",
    email: "kevin@hoc.com",
    phone: "+1-555-0111",
    subject: "Billing statement request",
    category: "Billing",
    priority: "Low",
    status: "New",
    assignedTo: null,
    createdAt: "2026-02-20T10:00:00Z",
    lastUpdated: "2026-02-20T10:00:00Z",
    slaDeadline: "2026-02-23T10:00:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "Please send me the billing statement for January.", timestamp: "2026-02-20T10:00:00Z" }
    ]
  },
  {
    id: "SF-1012",
    customerName: "Laura Palmer",
    company: "Twin Peaks",
    email: "laura@twinpeaks.com",
    phone: "+1-555-0112",
    subject: "Account locked",
    category: "Account Access",
    priority: "High",
    status: "Escalated",
    assignedTo: "Engineering Queue",
    createdAt: "2026-02-18T14:20:00Z",
    lastUpdated: "2026-02-19T09:15:00Z",
    slaDeadline: "2026-02-21T14:20:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "My account is locked and I need immediate access.", timestamp: "2026-02-18T14:20:00Z" }
    ]
  },
  {
    id: "SF-1013",
    customerName: "Michael Scott",
    company: "Dunder Mifflin",
    email: "mscott@dundermifflin.com",
    phone: "+1-555-0113",
    subject: "How to export data?",
    category: "Integration",
    priority: "Medium",
    status: "Closed",
    assignedTo: "You",
    createdAt: "2026-02-16T11:00:00Z",
    lastUpdated: "2026-02-16T15:00:00Z",
    slaDeadline: "2026-02-19T11:00:00Z",
    sentiment: "Positive",
    messages: [
      { sender: "customer", body: "How do I export my data to excel?", timestamp: "2026-02-16T11:00:00Z" }
    ]
  },
  {
    id: "SF-1014",
    customerName: "Nancy Drew",
    company: "Mystery Inc",
    email: "nancy@mystery.inc",
    phone: "+1-555-0114",
    subject: "Search functionality broken",
    category: "Bug",
    priority: "High",
    status: "In Progress",
    assignedTo: "You",
    createdAt: "2026-02-19T16:30:00Z",
    lastUpdated: "2026-02-20T08:45:00Z",
    slaDeadline: "2026-02-22T16:30:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "The universal search is not returning any results.", timestamp: "2026-02-19T16:30:00Z" }
    ]
  },
  {
    id: "SF-1015",
    customerName: "Oliver Twist",
    company: "Orphanage Tech",
    email: "oliver@orphantech.org",
    phone: "+1-555-0115",
    subject: "Can I have more users?",
    category: "Billing",
    priority: "Low",
    status: "New",
    assignedTo: null,
    createdAt: "2026-02-20T11:15:00Z",
    lastUpdated: "2026-02-20T11:15:00Z",
    slaDeadline: "2026-02-23T11:15:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "We need 5 more seats for our team.", timestamp: "2026-02-20T11:15:00Z" }
    ]
  },
  {
    id: "SF-1016",
    customerName: "Peter Parker",
    company: "Daily Bugle",
    email: "peter@dailybugle.com",
    phone: "+1-555-0116",
    subject: "Webhook integration failing",
    category: "Integration",
    priority: "High",
    status: "Escalated",
    assignedTo: "Engineering Queue",
    createdAt: "2026-02-19T08:00:00Z",
    lastUpdated: "2026-02-19T12:00:00Z",
    slaDeadline: "2026-02-22T08:00:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "Webhooks for new leads are not firing.", timestamp: "2026-02-19T08:00:00Z" }
    ]
  },
  {
    id: "SF-1017",
    customerName: "Quinn Malloy",
    company: "Sliders",
    email: "qmalloy@sliders.tv",
    phone: "+1-555-0117",
    subject: "Two-factor auth issues",
    category: "Account Access",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "You",
    createdAt: "2026-02-19T14:00:00Z",
    lastUpdated: "2026-02-20T09:30:00Z",
    slaDeadline: "2026-02-22T14:00:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "I am not receiving the SMS code for 2FA.", timestamp: "2026-02-19T14:00:00Z" }
    ]
  },
  {
    id: "SF-1018",
    customerName: "Rachel Green",
    company: "Central Perk",
    email: "rachel@centralperk.com",
    phone: "+1-555-0118",
    subject: "Custom CSS not loading",
    category: "Bug",
    priority: "Low",
    status: "Closed",
    assignedTo: "You",
    createdAt: "2026-02-15T09:00:00Z",
    lastUpdated: "2026-02-16T11:00:00Z",
    slaDeadline: "2026-02-18T09:00:00Z",
    sentiment: "Positive",
    messages: [
      { sender: "customer", body: "The custom CSS file I uploaded is not changing the dashboard theme.", timestamp: "2026-02-15T09:00:00Z" }
    ]
  },
  {
    id: "SF-1019",
    customerName: "Samwise Gamgee",
    company: "Shire Tech",
    email: "sam@shire.tech",
    phone: "+1-555-0119",
    subject: "Unable to provision new env",
    category: "Integration",
    priority: "High",
    status: "In Progress",
    assignedTo: "You",
    createdAt: "2026-02-20T06:00:00Z",
    lastUpdated: "2026-02-20T10:00:00Z",
    slaDeadline: "2026-02-21T06:00:00Z",
    sentiment: "Frustrated",
    messages: [
      { sender: "customer", body: "The 'Create Sandbox' button just spins indefinitely.", timestamp: "2026-02-20T06:00:00Z" }
    ]
  },
  {
    id: "SF-1020",
    customerName: "Tony Stark",
    company: "Stark Industries",
    email: "tony@stark.com",
    phone: "+1-555-0120",
    subject: "Enterprise billing question",
    category: "Billing",
    priority: "Medium",
    status: "New",
    assignedTo: null,
    createdAt: "2026-02-20T12:30:00Z",
    lastUpdated: "2026-02-20T12:30:00Z",
    slaDeadline: "2026-02-23T12:30:00Z",
    sentiment: "Neutral",
    messages: [
      { sender: "customer", body: "Who is our dedicated account manager for the next renewal?", timestamp: "2026-02-20T12:30:00Z" }
    ]
  }
];

// Attach to window for easy access across scripts
window.SupportData = SupportData;
