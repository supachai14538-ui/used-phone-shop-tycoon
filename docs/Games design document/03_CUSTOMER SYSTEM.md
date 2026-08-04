# 👤 CUSTOMER SYSTEM
# Used Phone Shop Tycoon

Version: 1.0

Status: Core System

---

# Overview

The Customer System is responsible for generating, managing, and controlling all customer interactions.

Customers are the primary source of gameplay.

Without customers, no buying or selling can occur.

---

# System Goals

The Customer System should:

- Generate unique customers
- Generate buying customers
- Generate selling customers
- Support different personalities
- Support future events
- Be data-driven

---

# Customer Types

## Seller

Customers who bring phones to sell.

Responsibilities

- Own a phone
- Set an asking price
- Negotiate
- Accept or reject offers

---

## Buyer

Customers who visit the shop looking for devices.

Responsibilities

- Search inventory
- Evaluate prices
- Negotiate
- Purchase phones

---

## Future Types

- Collector
- VIP Customer
- Business Customer
- Scammer
- Returning Customer

---

# Customer Properties

Every customer contains

Name

Age

Occupation

Personality

Budget

Patience

Negotiation Skill

Trust Level

Mood

Customer Type

---

# Personality

Each customer belongs to one personality profile.

Examples

Friendly

Neutral

Aggressive

Patient

Impatient

Greedy

Easy-going

Expert

Future personalities can be added without changing the system.

---

# Mood

Customer mood changes during negotiation.

Possible States

Happy

Neutral

Thinking

Disappointed

Angry

Leaves Shop

Mood directly affects negotiation.

---

# Negotiation Attributes

Every customer has

Minimum Selling Price

Maximum Buying Price

Negotiation Flexibility

Patience

Offer History

---

# Customer Lifecycle

```
Generate Customer

↓

Enter Shop

↓

Interaction

↓

Negotiation

↓

Purchase / Sale

↓

Receipt

↓

Leave Shop
```

---

# Customer Generation

Customers are generated from

Random Name

↓

Random Appearance

↓

Random Personality

↓

Random Occupation

↓

Random Budget

↓

Random Device (Seller)

or

↓

Random Shopping Intent (Buyer)

---

# Data Source

Customer data should be stored in

customers.json

Example

- Names
- Occupations
- Personality Templates
- Dialogue Templates

---

# Dialogue System

Customer dialogue depends on

Personality

Mood

Negotiation Progress

Success / Failure

Future updates may include dynamic dialogue generation.

---

# Reputation Interaction

Higher shop reputation increases

- Customer Trust
- Better Devices
- More VIP Customers

Lower reputation increases

- Difficult Negotiations
- Lower Trust
- Fewer High-value Customers

---

# Future Expansion

VIP Customers

Collectors

Returning Customers

Special Events

Story Characters

Fraud Customers

Online Customers

---

# Module Communication

Customer System communicates with

Negotiation System

Inventory System

Sales System

Economy System

Reputation System

Customer System should never directly modify these modules.

---

# Events

CustomerGenerated

CustomerEntered

NegotiationStarted

NegotiationCompleted

CustomerPurchased

CustomerSoldPhone

CustomerLeft

---

# Design Principles

Customers should feel

- Unique
- Believable
- Predictable enough to learn
- Random enough to stay interesting

No two customers should feel exactly the same.

---

# Final Principle

Customers are not numbers.

Customers are people with goals, emotions, and different personalities.

The player should feel like running a real second-hand phone shop.
