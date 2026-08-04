# 💰 SALES SYSTEM
# Used Phone Shop Tycoon

Version: 1.0

Status: Core System

---

# Overview

The Sales System is responsible for selling repaired devices to customers.

It manages pricing, customer purchasing behavior, negotiation, transaction completion, and profit calculation.

The Sales System is the primary source of revenue for the business.

---

# System Goals

The Sales System should

- Sell phones from inventory
- Calculate revenue
- Calculate profit
- Generate receipts
- Update inventory
- Improve business progression

---

# Sales Workflow

```
Buyer Arrives

↓

Search Inventory

↓

Player Selects Device

↓

Set Selling Price

↓

Buyer Evaluates Price

↓

Negotiation

↓

Accept

or

Reject

↓

Complete Transaction

↓

Generate Receipt

↓

Update Inventory

↓

Update Economy

↓

Update Reputation
```

---

# Selling Requirements

A phone can only be sold if

- It exists in inventory
- It is available for sale
- It is not reserved
- It is not currently being repaired

---

# Selling Price

Selling price is determined by

Market Value

↓

Phone Condition

↓

Repair Quality

↓

Player Pricing

↓

Final Selling Price

---

# Buyer Evaluation

Before negotiating, buyers evaluate

- Phone Condition
- Selling Price
- Market Value
- Personal Budget
- Personality
- Shop Reputation

The evaluation influences negotiation behavior.

---

# Negotiation

All price discussions are handled by

Negotiation System

Sales System only

- Starts negotiation
- Receives result
- Completes transaction

---

# Transaction Result

Possible outcomes

Sale Completed

Customer Rejects

Customer Leaves

Reserved (Future)

---

# Profit Calculation

Profit

=

Selling Price

-

Purchase Price

-

Repair Cost

-

Future Expenses

Examples of future expenses

Tax

Employee Commission

Marketing Cost

Warranty Claims

---

# Receipt System

Every successful sale generates

Receipt ID

Date

Device

Purchase Price

Repair Cost

Selling Price

Profit

Customer

---

# Inventory Interaction

After successful sale

Inventory Status

↓

Sold

↓

Archived

↓

Removed from Available Inventory

---

# Economy Interaction

Successful sales update

Cash

Revenue

Profit

Daily Statistics

Business Value

---

# Reputation Interaction

Successful transactions may

Increase Reputation

Customer Satisfaction

Repeat Customer Chance (Future)

Poor pricing may

Decrease Reputation

Reduce Customer Trust

---

# Customer Interaction

Buyer

↓

Browse Inventory

↓

Evaluate Device

↓

Negotiate

↓

Purchase

↓

Leave Shop

---

# Events

BuyerArrived

SellingStarted

NegotiationStarted

SaleCompleted

SaleCancelled

ReceiptGenerated

InventoryUpdated

CashUpdated

---

# Data Structure

Each completed sale should record

Sale ID

Phone ID

Customer ID

Purchase Price

Repair Cost

Selling Price

Profit

Sale Date

---

# Future Expansion

Bundle Sales

Accessory Sales

Warranty

Installment Payments

Trade-In

Online Orders

Delivery

Reserved Devices

VIP Customers

Business Customers

---

# Module Communication

Sales System communicates with

Inventory System

Negotiation System

Customer System

Economy System

Reputation System

Receipt System

Save System

Sales System never directly changes unrelated modules.

---

# Design Principles

Sales should feel

Rewarding

Fair

Strategic

Fast

Satisfying

Every successful sale should feel like progress.

---

# Final Principle

Selling is the reward for every decision made before it.

Good buying,

good repairing,

and good negotiation

lead to successful sales.
