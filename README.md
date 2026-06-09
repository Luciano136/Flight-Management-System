# ✈️ Flight Management System

A web-based airline management simulation built with vanilla JavaScript, HTML, and CSS.

It allows users to create flights, manage passengers, track flight status, and distribute mileage rewards upon completion.

---
## ⚙️ Features
- Create and manage flights
- Assign and remove passengers
- Seat capacity control system
- Flight state management (pending → in progress → completed)
- Automatic mileage distribution on completion
- Passenger mileage tracking system
- Free mileage reward calculation

---

## 📸 Overview

### 1. Empty state
   
![Initial view](https://github.com/user-attachments/assets/1a856da9-1d40-4492-a9db-68731c804ac2)
System starts with no flights or passengers created.

---

### 2. Flight management
   
![Initial view](https://github.com/user-attachments/assets/17013231-6971-44f0-ad18-c4c968f4ae92)
Multiple flights with different statuses (pending, in progress, completed) managed in real time.

---

### 3. Passenger assignment
   
![Initial view](https://github.com/user-attachments/assets/9821145f-5f51-4dc4-b27f-f7d2aea0ae18)
Passengers are assigned to flights with capacity control and seat allocation.

---

### 4. Active flight
   
![Initial view](https://github.com/user-attachments/assets/67d57c1d-8e31-4e9f-9135-39c39e924cdd)
Flight in progress with assigned passengers and live state tracking.

---

### 5. Flight history
   
![Initial view](https://github.com/user-attachments/assets/58c0261c-23f4-4bea-a5bc-bbcf9646606d)
Completed flights stored with final mileage distribution.

---

### 6. Passenger rewards system
   
![Initial view](https://github.com/user-attachments/assets/85050544-8f02-4b86-acf4-450666d4298e)
Global passenger view showing accumulated miles and free mileage rewards.

---

---

## 🧠 System Logic

Flights follow a simple state machine:
pending → inProgress → completed

Rules:
- Flights cannot start without passengers
- Only pending flights can be activated
- Only active flights can be completed
- Mileage is distributed automatically on completion

---

## 🏗️ Architecture

The project is split into modules:

- data.js: global state management
- ui.js: rendering and DOM updates
- flights.js: flight logic and rules
- users.js: passenger management
- app.js: entry point

---

## 🛠️ Technologies used
- HTML
- CSS
- JavaScript

---

## 🎯 Purpose

This project was built to practice:
- State management without frameworks
- DOM manipulation
- Modular JavaScript structure
- Building real-world application logic

---

## 🚀 Future improvements
- LocalStorage persistence
- Edit flights and passengers
- Search and filtering system
- Better analytics dashboard
- Free miles redemption system for passengers
