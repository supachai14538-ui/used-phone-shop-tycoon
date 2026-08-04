# 🔄 WORKFLOW
# Used Phone Shop Tycoon

Version: 1.0

Status: Active

---

# Overview

This document describes how game systems communicate during gameplay.

The workflow defines the execution order of systems.

Every gameplay event should follow these workflows.

---

# Master Workflow

```
Player Input
      │
      ▼
UI Layer
      │
      ▼
Game Controller
      │
      ▼
Game System
      │
      ▼
Database Update
      │
      ▼
UI Refresh
```

---

# Daily Workflow

```
Start Day

↓

Initialize Daily Data

↓

Generate Customers

↓

Player Interacts

↓

Process Transactions

↓

Update Economy

↓

Update Reputation

↓

Generate Daily Summary

↓

End Day
```

---

# Purchase Workflow

```
Player

↓

Call Customer

↓

Customer Generated

↓

Phone Generated

↓

Phone Inspection

↓

Market Price Evaluation

↓

Negotiation

↓

Purchase Decision

↓

Inventory Update

↓

Cash Update

↓

Receipt

↓

UI Refresh
```

---

# Repair Workflow

```
Inventory

↓

Select Device

↓

Calculate Repair Cost

↓

Player Confirmation

↓

Repair

↓

Update Condition

↓

Update Device Value

↓

Update Inventory

↓

Update Cash

↓

UI Refresh
```

---

# Selling Workflow

```
Buyer Generated

↓

Select Device

↓

Set Selling Price

↓

Negotiation

↓

Accept / Reject

↓

Complete Sale

↓

Remove From Inventory

↓

Update Cash

↓

Receipt

↓

Update Reputation

↓

UI Refresh
```

---

# End Day Workflow

```
Player Ends Day

↓

Calculate Daily Profit

↓

Calculate Expenses

↓

Update Statistics

↓

Generate Summary

↓

Save Game

↓

Start New Day
```

---

# Save Workflow

```
Game Event

↓

Update Game State

↓

Serialize Data

↓

Write Save File

↓

Verification

↓

Save Complete
```

---

# Module Communication

Customer

↓

Negotiation

↓

Inventory

↓

Repair

↓

Sales

↓

Economy

↓

Reputation

↓

Save

Each module only communicates through public interfaces.

Modules must never directly edit another module's internal state.

---

# Event Flow

Examples

CustomerArrived

↓

NegotiationStarted

↓

NegotiationCompleted

↓

PhonePurchased

↓

RepairCompleted

↓

PhoneSold

↓

DayEnded

↓

GameSaved

---

# UI Workflow

```
Player Action

↓

Button Click

↓

Controller

↓

Game System

↓

Database

↓

Refresh UI
```

The UI should never contain business logic.

---

# Error Workflow

```
Invalid Action

↓

Validation

↓

Display Error

↓

Restore Previous State
```

The game should never crash because of invalid player input.

---

# Future Workflow

Future systems must integrate into the existing workflow.

Examples

Auction

↓

Purchase Workflow

Pawn

↓

Inventory Workflow

Employees

↓

Repair Workflow

Competitors

↓

Economy Workflow

No future system should bypass existing workflows.

---

# Workflow Principles

Every workflow must be

- Predictable
- Modular
- Reusable
- Easy to Debug
- Easy to Expand

---

# Final Principle

Player Action

↓

One Workflow

↓

One Result

↓

One State Update

↓

One UI Refresh
