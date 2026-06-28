# 🎮 Word Puzzle Game (React Frontend)

A simple Hangman-style word puzzle game built with React. The game fetches words and questions from a Spring Boot backend and lets users guess letters to complete the word.

---

## 🚀 Tech Stack

- React (JavaScript)
- React Router
- React Bootstrap
- Context API
- Fetch API
- LocalStorage

---

## 🎮 Features

- Start screen with user name input
- Level-based gameplay system
- Lives system (10 hearts)
- Letter guessing (A–Z buttons)
- Dynamic word masking (-----)
- Questions loaded from backend
- Win / Lose logic
- Restart game functionality
- Progress saved in localStorage

---

## 🧠 Game Logic

- Backend provides words + questions via API
- Frontend fetches data from:

http://localhost:8080/names

- Each level corresponds to one word
- Correct letters are revealed
- Wrong letters reduce life
- When word is completed → next level
- If life = 0 → game resets

---

## 📡 Backend API

### Base URL

http://localhost:8080/names


### Endpoints

#### 📥 Get all words

GET /names


#### ➕ Add word

POST /names


#### ✏️ Update word/question

PUT /names/{id}


---

## 🗄️ Data Structure

Each word object looks like:

```json
{
  "id": 1,
  "name": "react",
  "questions": "Frontend library for building UI?"
}
🎯 How to Run
1. Install dependencies
npm install
2. Start development server
npm run dev
⚙️ Environment

Make sure backend is running:

Spring Boot backend must run on:
http://localhost:8080
🧩 Main Features Explained
🔤 Letter System
A–Z buttons generated dynamically
Clicked letters are disabled
Correct letters fill the word
💔 Life System
Start with 10 lives
Wrong guess → life -1
Life = 0 → reset game
🏆 Level System
Each correct word → next level
Level increases automatically
💾 LocalStorage
Saves:
level
life
progress (val)
Keeps game state after refresh
📌 Folder Structure (Simplified)
src/
 ├── components/
 │    ├── GamePage.jsx
 │    ├── Home.jsx
 │    └── HangmanContext.jsx
 ├── App.js
 ├── css/
🧠 Key Highlights
Simple game logic with React hooks
Backend API integration (Spring Boot)
State management with Context API
Persistent game progress
Clean UI with React Bootstrap
📌 Status

✔ Frontend complete
✔ Backend connected
✔ Fully playable game
