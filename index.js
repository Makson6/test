import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post('/api/person', async (req, res) => {
    const { name, country, language, photo } = req.body;
    try {
        const person = await prisma.person.create({
            data: {
                name,
                country,
                language,
                photo,
            },
        });
        res.json(person);
    } catch (error) {
        res.status(500).json({ error: 'Error creating person' });
    }
});

app.get('/api/person', async (req, res) => {
    try {
        const people = await prisma.person.findMany();
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching people' });
    }
});

app.get('/api/person/search', async (req, res) => {
    const { query } = req.query;
    try {
        const people = await prisma.person.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { country: { contains: query, mode: 'insensitive' } },
                    { language: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: 'Error searching people' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
