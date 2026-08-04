# 🏗️ SYSTEM ARCHITECTURE
# Used Phone Shop Tycoon

Version: 1.0

---

# Overview

Used Phone Shop Tycoon is built using a modular architecture.

Every game feature is developed as an independent module.

Modules communicate through defined interfaces instead of directly modifying each other's data.

The architecture is designed for long-term scalability and AI-assisted development.

---

# System Layers

```
Presentation Layer
        │
        ▼
UI Layer
        │
        ▼
Game Controller
        │
        ▼
Core Systems
        │
        ▼
Game Database
```

---

# Project Structure

```
used-phone-shop-tycoon/

assets/
css/
js/
data/
docs/
prototype/
```

---

# Core Modules

## 1. Customer System

Responsibilities

- Generate customers
- Generate personalities
- Generate requests
- Control customer behavior

Communicates with

- Negotiation
- Inventory
- Economy

---

## 2. Negotiation System

Responsibilities

- Buy negotiation
- Sell negotiation
- Customer satisfaction
- Deal success/failure

Communicates with

- Customer
- Economy

---

## 3. Inventory System

Responsibilities

- Store devices
- Update phone condition
- Track ownership
- Track repair status

Communicates with

- Repair
- Sales

---

## 4. Repair System

Responsibilities

- Repair phones
- Increase condition
- Calculate repair cost

Communicates with

- Inventory
- Economy

---

## 5. Economy System

Responsibilities

- Cash
- Profit
- Expenses
- Market price

Communicates with

Every gameplay system

---

## 6. Sales System

Responsibilities

- Selling phones
- Calculate revenue
- Generate receipt

Communicates with

- Inventory
- Economy
- Customer

---

## 7. Reputation System

Responsibilities

- Shop reputation
- Customer trust

Communicates with

- Customer
- Economy

---

## 8. Save System

Responsibilities

- Save game
- Load game
- Auto save

Independent module

---

# Data Layer

All gameplay data should be stored separately.

Examples

```
phones.json

customers.json

furniture.json

economy.json

events.json
```

No hard-coded gameplay values.

---

# Asset Layer

```
assets/

characters/

devices/

furniture/

icons/

ui/

audio/

effects/
```

Future assets must follow the official Bible documents.

---

# Documentation Layer

```
README.md

GAME_CONSTITUTION.md

SYSTEM_ARCHITECTURE.md

WORKFLOW.md

Character Bible

Device Bible

Furniture Bible

UI Bible
```

---

# Development Rules

One Module

↓

One Responsibility

↓

One Feature

↓

One Commit

---

# Core Data Flow

```
Customer

↓

Negotiation

↓

Purchase

↓

Inventory

↓

Repair

↓

Inventory

↓

Sales

↓

Receipt

↓

Economy

↓

Save
```

---

# Future Modules

Employee System

Auction System

Pawn System

Trade-In System

Competitor System

Quest System

Achievement System

Analytics System

Cloud Save

---

# Architecture Principles

- Modular
- Scalable
- Maintainable
- Data Driven
- Mobile First
- Web First
- AI Friendly

---

# Final Note

Every new system must integrate into the existing architecture without breaking existing modules.

Modules should communicate through clearly defined interfaces.

Avoid unnecessary dependencies between systems.
