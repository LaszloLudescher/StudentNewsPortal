const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const app = express();

// Initialize Prisma 7 with the SQLite Driver Adapter
const adapter = new PrismaBetterSqlite3({ url: "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

const PORT = 3000;

app.use(cors()); 
app.use(express.json());

// ==========================================
// MOCK DATA FOR SEEDING
// ==========================================
const mockData = [
  {
    image: "/sweat.png",
    translations: JSON.stringify({
      ro: { title: "Succesul studenților", summary: "Locul I.", content: "Conținut...", date: "12 iunie 2026" },
      en: { title: "Students Triumph", summary: "First place.", content: "Content...", date: "June 12, 2026" }
      // (Paste your full language translations back here if needed)
    })
  },
  {
    image: "/sweat.png",
    translations: JSON.stringify({
      ro: { title: "Noua bibliotecă", summary: "Acces gratuit.", content: "Conținut...", date: "10 iunie 2026" },
      en: { title: "New Digital Library", summary: "Free Access.", content: "Content...", date: "June 10, 2026" }
    })
  }
];

const mockUsers = [
    { email: 'admin@news.com', password: 'adminpassword', role: 'ADMIN' },
    { email: 'editor@news.com', password: 'editorpassword', role: 'EDITOR' },
    { email: 'journalist@news.com', password: 'journalistpassword', role: 'JOURNALIST' },
    { email: 'user@news.com', password: 'userpassword', role: 'USER' }
];

// ==========================================
// DATABASE SEEDING ROUTINE
// ==========================================
async function seedDatabase() {
    // 1. Seed Articles
    const articleCount = await prisma.newsArticle.count();
    if (articleCount === 0) {
        console.log("⏳ Database is empty. Seeding news articles...");
        for (const article of mockData) {
            await prisma.newsArticle.create({ data: article });
        }
        console.log("✅ News articles seeded successfully!");
    } else {
        console.log(`ℹ️ Database has ${articleCount} articles. Skipping article seed.`);
    }

    // 2. Seed Users
    const userCount = await prisma.user.count();
    if (userCount === 0) {
        console.log("⏳ Seeding mock users for all roles...");
        for (const user of mockUsers) {
            await prisma.user.create({ data: user });
        }
        console.log("✅ Users seeded! (Admin, Editor, Journalist, User)");
    } else {
        console.log(`ℹ️ Database has ${userCount} users. Skipping user seed.`);
    }
}

// ==========================================
// AUTH ROUTES (LOGIN & REGISTER)
// ==========================================
app.post('/api/register', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Security check: Don't let users register as ADMIN
        let assignedRole = role === 'EDITOR' || role === 'JOURNALIST' ? role : 'USER';
        
        const user = await prisma.user.create({
            data: { email, password, role: assignedRole }
        });
        
        res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        res.status(400).json({ error: "Email already exists or invalid data." });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ==========================================
// NEWS ROUTES
// ==========================================
app.get('/api/news', async (req, res) => {
    try {
        const articles = await prisma.newsArticle.findMany();
        const formattedArticles = articles.map(a => ({
            id: a.id, image: a.image, translations: JSON.parse(a.translations)
        }));
        res.json(formattedArticles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});

app.get('/api/news/:id', async (req, res) => {
    try {
        const article = await prisma.newsArticle.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!article) return res.status(404).json({ message: "Article not found" });
        res.json({ id: article.id, image: article.image, translations: JSON.parse(article.translations) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch article" });
    }
});

// ==========================================
// SERVER STARTUP
// ==========================================
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`\n🚀 Backend running on port ${PORT}`);
    await seedDatabase();
});