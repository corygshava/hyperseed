// data sources (used kimi k2 for the verbose dependecy)

// ── NAMES ─────────────────────────────────────────────────────────────────────
const names = [
  "James",    "Mary",      "John",     "Patricia",  "Robert",
  "Michael",  "Jennifer",  "David",    "Linda",     "William",
  "Elizabeth","Richard",   "Barbara",  "Joseph",    "Susan",
  "Thomas",   "Jessica",   "Charles",  "Sarah",     "Christopher",
  "Karen",    "Daniel",    "Nancy",    "Matthew",   "Lisa",
  "Anthony",  "Betty",     "Mark",     "Dorothy",   "Donald",
  "Sandra",   "Steven",    "Ashley",   "Kenneth",   "Kimberly",
  "Paul",     "Donna",     "Andrew",   "Emily",     "Joshua",
  "Michelle", "Kevin",     "Carol",    "Brian",     "Amanda",
  "George",   "Melissa",   "Edward",   "Deborah",   "Ronald",
  "Stephanie","Timothy",   "Rebecca",  "Jason",     "Laura",
  "Jeffrey",  "Sharon",    "Ryan",     "Cynthia",   "Jacob",
  "Kathleen", "Gary",      "Helen",    "Nicholas",  "Amy",
  "Eric",     "Shirley",   "Jonathan", "Angela",    "Stephen",
  "Anna",     "Larry",     "Ruth",     "Justin",    "Brenda",
  "Scott",    "Pamela",    "Brandon",  "Nicole",    "Frank",
  "Catherine","Benjamin",  "Samantha", "Gregory",   "Katherine",
  "Samuel",   "Christine", "Raymond",  "Debra",     "Patrick",
  "Rachel",   "Alexander", "Janet",    "Jack",      "Emma",
  "Dennis",   "Cheryl",    "Jerry",    "Marie",     "Tyler",
  "Heather",  "Aaron",     "Joan",     "Jose",      "Maria"
];

// ── SURNAMES ──────────────────────────────────────────────────────────────────
const surnames = [
  "Smith",      "Johnson",   "Williams", "Brown",    "Jones",
  "Garcia",     "Miller",    "Davis",    "Rodriguez","Martinez",
  "Hernandez",  "Lopez",     "Gonzalez", "Wilson",   "Anderson",
  "Thomas",     "Taylor",    "Moore",    "Jackson",  "Martin",
  "Lee",        "Perez",     "Thompson", "White",    "Harris",
  "Sanchez",    "Clark",     "Ramirez",  "Lewis",    "Robinson",
  "Walker",     "Young",     "Allen",    "King",     "Wright",
  "Scott",      "Torres",    "Nguyen",   "Hill",     "Flores",
  "Green",      "Adams",     "Nelson",   "Baker",    "Hall",
  "Rivera",     "Campbell",  "Mitchell", "Carter",   "Roberts",
  "Gomez",      "Phillips",  "Evans",    "Turner",   "Diaz",
  "Parker",     "Cruz",      "Edwards",  "Collins",  "Reyes",
  "Stewart",    "Morris",    "Morales",  "Murphy",   "Cook",
  "Rogers",     "Gutierrez", "Ortiz",    "Morgan",   "Cooper",
  "Peterson",   "Bailey",    "Reed",     "Kelly",    "Howard",
  "Ramos",      "Kim",       "Cox",      "Ward",     "Richardson",
  "Watson",     "Brooks",    "Chavez",   "Wood",     "James",
  "Bennett",    "Gray",      "Mendoza",  "Ruiz",     "Hughes",
  "Price",      "Alvarez",   "Castillo", "Sanders",  "Patel",
  "Myers",      "Long",      "Ross",     "Foster",   "Jimenez"
];

// ── BUSINESS NAMES ────────────────────────────────────────────────────────────
const businessNames = [
  "Acme Corp",          "Globex Inc",         "Initech",            "Wayne Enterprises",  "Stark Industries",
  "Cyberdyne Systems",  "Omni Consumer Prod", "Gringotts",          "Oscorp",             "Tyrell Corporation",
  "Wonka Industries",   "Virtucon",           "Gekko & Co",         "Strickland Propane", "Pied Piper",
  "Hooli",              "Goliath Corp",       "Bluth Company",      "Sterling Cooper",    "Dunder Mifflin",
  "Rekall Inc",         "Nakatomi Trading",   "LexCorp",            "Aperture Science",   "Black Mesa",
  "MomCorp",            "GloboChem",          "Soylent Corp",       "Zorg Industries",    "Clamp Enterprises",
  "Paper Street Soap",  "ENCOM",              "InGen",              "Umbrella Corp",      "Weiland-Yutani",
  "Buy n Large",        "Ajitani Systems",    "Prestige Worldwide", "Vandelay Industries","Kramerica",
  "Ghostbusters Inc",   "Bubba Gump Shrimp",  "MacroHard",          "Ninite",             "Plow King",
  "Slate Rock & Gravel","Industrial Illusions","Gadgetron",        "MegaLo Mart",        "Powell Industries",
  "Vance Refrigeration","Initrode",           "Intertrode",         "Techdirt",           "Compuglobalhypermeganet",
  "DataDyne",           "Hyperion",           "Atlas Corp",         "Jacobs",             "Tessier-Ashpool",
  "Abstergo",           "Mishima Zaibatsu",   "Blue Sun",           "Capitol Corp",       "Primatech",
  "Massive Dynamic",    "Kumatsu Motors",     "Vaalco",             "Alchemax",           "Cybertek",
  "FutureTech",         "AeroDyne",           "Pentex",             "Yutani",             "Helios",
  "Roxxon",             "GeneCo",             "ChronoGuard",        "Ankh-Morpork",       "Krusty Krab",
  "Virtuoso Dynamics",  "NovaLogic",          "Bright Falls",       "Veridian Dynamics",  "Global Dynamics",
  "Stark-Fujikawa",     "Fusion Systems",     "Quantum Inc",        "SkyNet Labs",        "Biolab",
  "NovaTech",           "CryNet Systems",     "Helix Corp",         "Synapse",            "EvoTech",
  "Nexus Dynamics",     "Helios Labs",        "Aurora Systems",     "Zenith Corp",        "Orion Industries",
  "Pulsar Tech",        "CosmoDyne",          "Starlight Inc",      "Nebula Corp",        "Galaxy Holdings"
];

// ── DEPARTMENTS ───────────────────────────────────────────────────────────────
const departments = [
  "Engineering",  "Marketing",    "Sales",        "HR",           "Finance",
  "Operations",   "Legal",        "IT",           "R&D",          "Procurement",
  "Logistics",    "Support",      "QA",           "Design",       "Product",
  "Analytics",    "Strategy",     "Compliance",   "Security",     "Facilities",
  "Customer Success","Business Dev","PR",         "Communications","Internal Audit",
  "Data Science", "DevOps",       "Mobile",       "Web",          "Cloud",
  "AI/ML",        "Blockchain",   "Growth",       "Content",      "Social Media",
  "Brand",        "Partnerships", "Investor Relations","Accounting","Treasury",
  "Tax",          "Payroll",      "Recruiting",   "L&D",          "Compensation",
  "Benefits",     "Diversity",    "Culture",      "Events",       "Travel",
  "Procurement",  "Inventory",    "Warehousing",  "Distribution", "Planning",
  "Sourcing",     "Vendor Mgmt",  "Quality",      "Manufacturing","Assembly",
  "Maintenance",  "Safety",       "Environment",  "Sustainability","Risk",
  "Insurance",    "Claims",       "Contracts",    "Governance",   "Ethics",
  "Patent",       "Trademark",    "Privacy",      "Cybersecurity","Network",
  "Infrastructure","Helpdesk",    "Systems",      "Database",     "Architecture",
  "Front-end",    "Back-end",     "Full-stack",   "Embedded",     "Firmware",
  "Hardware",     "UX",           "UI",           "Visual",       "Industrial",
  "Graphic",      "Motion",       "Audio",        "Video",        "AR/VR",
  "Game",         "Narrative",    "Localization", "International","Expansion",
  "M&A",          "Ventures",     "Incubator",    "Accelerator",  "Innovation"
];

// ── WEBSITE NAMES ─────────────────────────────────────────────────────────────
const websiteNames = [
  "google",    "amazon",   "facebook", "twitter",  "linkedin",
  "youtube",   "instagram","reddit",   "netflix",  "spotify",
  "github",    "stackoflw","airbnb",   "uber",     "pinterest",
  "whatsapp",  "telegram", "snapchat", "tiktok",   "discord",
  "twitch",    "ebay",     "etsy",     "paypal",   "stripe",
  "wordpress", "shopify",  "wix",      "square",   "zoom",
  "slack",     "notion",   "asana",    "trello",   "monday",
  "hubspot",   "salesfrc", "zoho",     "freshwk",  "atlassian",
  "adobe",     "canva",    "figma",    "sketch",   "invision",
  "dribbble",  "behance",  "medium",   "quora",    "vimeo",
  "soundcloud","bandcamp", "shazam",   "lastfm",   "goodreads",
  "tripadv",   "yelp",     "foursq",   "zomato",   "doordash",
  "grubhub",   "postmates","instacart","shipt",    "freshdir",
  "dropbox",   "box",      "onedrive", "drive",    "icloud",
  "evernote",  "bear",     "roam",     "obsidian", "remnote",
  "anki",      "quizlet",  "kahoot",   "coursera", "udemy",
  "khan",      "edx",      "skillshr", "plurals",  "codecad",
  "leetcode",  "hackerrnk","codeforc", "topcoder", "atcoder",
  "producthnt","angellist","kickstart","indiegogo","gofundme",
  "patreon",   "substack", "ghost",    "convertk", "mailchimp"
];
    
    const validSymbols = ["_", ".", "-", "+","_","_._",""];
    const emailProviders = ["gmail", "yahoo", "hotmail", "outlook", "protonmail"];
    const domainExtensions = ["com", "net", "org", "io", "co"];