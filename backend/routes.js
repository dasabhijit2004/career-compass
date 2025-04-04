import express from "express";
const router = express.Router();
import { Mistral } from '@mistralai/mistralai';
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

// Function to get career suggestions
const getCareerSuggestions = async (choices) => {
    const response = await client.agents.complete({
        agentId: process.env.CAREER_AI_AGENT,
        messages: [{ role: 'user', content: choices }],
    });
    
    return response.choices[0].message;
};

// Function to extract resume keywords
const getResumeKeywords = async (jobDescription) => {
    const response = await client.agents.complete({
        agentId: KEYW0RD_AI_AGENT,
        messages: [{ role: 'user', content: jobDescription }],
    });
    console.log("Response from Mistral:", response);
    return response;
};

// Route to generate career advice
router.post("/career-suggestions", async (req, res) => {
    try {
        const { choices } = req.body;
        // console.log("Received choices:", req.body);
        //convert object to string
        // const choicesString = Object.entries(choices).map(([key, value]) => `${key}: ${value}`).join(", ");
        // console.log(choicesString);

        const suggestions = await getCareerSuggestions(choices);

        // console.log("Career suggestions:", suggestions);
        res.json({ suggestions });
    } catch (error) {
        res.json({ error });
    }
});

// Route to generate resume keywords
router.post("/resume-keywords", async (req, res) => {
    try {
        const { jobDescription } = req.body;
        if (!jobDescription || typeof jobDescription !== "string") {
            return res.status(400).json({ error: "Invalid job description format" });
        }

        const keywords = await getResumeKeywords(jobDescription);
        res.json({ keywords });
    } catch (error) {
        res.status(500).json({ error: "Error generating resume keywords" });
    }
});

export default router;
