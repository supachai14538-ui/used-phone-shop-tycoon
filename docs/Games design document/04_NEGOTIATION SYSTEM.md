# 🤝 NEGOTIATION SYSTEM
# Used Phone Shop Tycoon

Version: 1.0

Status: Core System

---

# Overview

The Negotiation System controls all price negotiations between the player and customers.

Negotiation is one of the primary gameplay mechanics and directly affects profitability, reputation, and player strategy.

Every transaction involving buying or selling should pass through this system.

---

# System Goals

The Negotiation System should

- Create meaningful player decisions
- Prevent fixed pricing
- Reward strategic thinking
- Support different customer personalities
- Remain simple to understand
- Be expandable

---

# Negotiation Types

## Purchase Negotiation

Player buys a phone from a seller.

Player Goal

Buy below market value.

Customer Goal

Sell above minimum acceptable price.

---

## Selling Negotiation

Player sells a phone to a buyer.

Player Goal

Sell above cost.

Customer Goal

Buy below maximum budget.

---

# Negotiation Variables

Every negotiation uses

Market Price

↓

Customer Asking Price

↓

Player Offer

↓

Customer Counter Offer

↓

Negotiation Result

---

# Customer Attributes

Each customer has

Minimum Acceptable Price

Maximum Budget

Patience

Negotiation Skill

Mood

Personality

Trust Level

---

# Player Actions

Player may

Accept

Reject

Counter Offer

Cancel

No other actions should affect the negotiation.

---

# Negotiation Flow

```
Start Negotiation

↓

Display Initial Price

↓

Player Makes Offer

↓

Evaluate Offer

↓

Customer Response

↓

Accept

or

Counter Offer

or

Reject

↓

Repeat

↓

Complete Transaction
```

---

# Negotiation Outcomes

Possible Results

Accepted

Rejected

Counter Offer

Customer Leaves

Timeout (Future)

---

# Counter Offer Logic

Customers should not immediately accept or reject every offer.

Instead they may

Increase Price

Decrease Price

Stand Firm

Walk Away

The behavior depends on

- Personality
- Mood
- Patience
- Offer Difference

---

# Patience System

Each customer has limited patience.

Patience decreases when

- Offer is too low
- Too many negotiations
- Time passes

When patience reaches zero

Customer leaves the shop.

---

# Mood System

Mood changes during negotiation.

Happy

↓

Neutral

↓

Thinking

↓

Disappointed

↓

Angry

↓

Leave

Mood directly affects future offers.

---

# Negotiation Limits

Maximum negotiation attempts should be configurable.

Default

3 Attempts

Future balancing may change this value.

---

# Reputation Influence

High Reputation

- Easier negotiations
- Better offers
- Higher trust

Low Reputation

- Difficult negotiations
- More rejections
- Faster customer frustration

---

# Economy Interaction

Negotiation directly affects

Purchase Cost

Selling Price

Profit

Cash Flow

Business Growth

---

# Future Expansion

Special Discounts

VIP Negotiations

Employee Negotiators

Limited-Time Promotions

Bundle Deals

Trade Discounts

Online Negotiation

---

# Events

NegotiationStarted

OfferSubmitted

CounterOfferReceived

NegotiationAccepted

NegotiationRejected

CustomerLeft

TransactionCompleted

---

# Module Communication

Negotiation System communicates with

Customer System

Economy System

Inventory System

Sales System

Reputation System

No direct modification of external modules.

---

# Balancing Rules

Negotiation should

Reward skill

Punish greed

Remain fair

Avoid randomness without reason

Every failed negotiation should teach the player something.

---

# Design Principles

Negotiation should feel

Dynamic

Fair

Rewarding

Unpredictable

Strategic

Every customer should negotiate differently.

---

# Final Principle

Negotiation is not gambling.

It is a strategic conversation between the player and the customer.

The player should win by making smart decisions,
not by relying on luck.
