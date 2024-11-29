const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const API = process.env.Gemini;
const genAI = new GoogleGenerativeAI(API);
const LocationAPI = process.env.LocationAPI;
const LocationAI = new GoogleGenerativeAI(LocationAPI);
const GuruAPI = process.env.GuruAPI;
const GuruAI = new GoogleGenerativeAI(GuruAPI);

const LoveGuru = async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(201).json({ answer: text });
  } catch (error) {
    console.log("Error in LoveGuru:", error.message || error);
    res.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
};

const TunedGuru = async (req, res) => {
  try {
    const { prompt } = req.query;
    const model = GuruAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(201).json({ answer: text });
  } catch (error) {
    console.log("Error in TunedGuru:", error.message || error);
    res.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
};

const LocationGuru = async (req, res) => {
  try {
    const { prompt } = req.query;
    const model = LocationAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(201).json({ answer: text });
  } catch (error) {
    console.log("Error in LocationGuru:", error.message || error);
    res.status(500).json({ error: "An unexpected error occurred while processing your request." });
  }
};

module.exports = { LoveGuru, TunedGuru, LocationGuru };
