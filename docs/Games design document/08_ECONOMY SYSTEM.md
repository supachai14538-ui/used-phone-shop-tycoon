# 💹 ECONOMY SYSTEM
# Used Phone Shop Tycoon

Version: 1.0

Status: Core System

---

# Overview

The Economy System is the financial backbone of the game.

It manages all business-related income, expenses, profits, market values, and financial progression.

Every monetary transaction in the game must pass through this system.

---

# System Goals

The Economy System should

- Manage player cash
- Calculate profit and loss
- Track business value
- Control market prices
- Support long-term progression
- Remain data-driven

---

# Economy Workflow

```
Game Event

↓

Financial Transaction

↓

Update Cash

↓

Update Statistics

↓

Update Business Value

↓

Refresh UI

↓

Save Data
```

---

# Core Resources

## Cash

Current money owned by the player.

Used for

- Buying phones
- Repairing phones
- Shop upgrades
- Future expenses

Cash can never become negative.

---

## Revenue

Money earned from

- Phone sales
- Future services
- Future events

---

## Expenses

Money spent on

- Phone purchases
- Repairs
- Shop upgrades
- Future employee salaries
- Future taxes

---

## Profit

Profit

=

Revenue

-

Expenses

Profit is calculated

- Daily
- Weekly (Future)
- Monthly (Future)
- Lifetime

---

# Business Value

Business Value represents

- Cash
- Inventory Value
- Shop Assets
- Future Equipment

Business Value measures overall company growth.

---

# Market Price

Every phone has

Market Value

↓

Condition Modifier

↓

Demand Modifier

↓

Final Estimated Price

Market prices may change daily.

---

# Financial Categories

Income

Expenses

Assets

Liabilities (Future)

Net Worth

Daily Profit

Lifetime Profit

---

# Statistics

Track

Phones Purchased

Phones Sold

Average Profit

Highest Profit

Lowest Profit

Success Rate

Negotiation Success

Total Repairs

---

# Daily Summary

At the end of each day

Calculate

Revenue

Expenses

Profit

Cash

Inventory Value

Business Value

Generate Daily Report

---

# Market System (Future)

Phone prices may change based on

Supply

Demand

New Phone Releases

Random Events

Seasonal Events

Economic Conditions

---

# Inflation (Future)

The economy may gradually change over time.

Effects

Higher phone prices

Higher repair costs

Higher upgrade costs

Higher selling prices

---

# Random Events (Future)

Examples

Holiday Sales

Phone Launch

Economic Boom

Economic Recession

Supplier Discount

Repair Promotion

Events temporarily affect the economy.

---

# Shop Growth

Business growth depends on

Cash

↓

Profit

↓

Reputation

↓

Inventory Value

↓

Business Level

---

# Economy Interaction

Economy communicates with

Customer System

Negotiation System

Inventory System

Repair System

Sales System

Reputation System

Save System

Every transaction should pass through the Economy System.

---

# Events

CashUpdated

ExpenseAdded

RevenueAdded

ProfitCalculated

BusinessValueUpdated

DailySummaryGenerated

EconomySaved

---

# Data Structure

economy.json

Contains

Cash

Revenue

Expenses

Statistics

Business Value

Daily Summary

Configuration

---

# Future Expansion

Taxes

Employee Salary

Loan System

Bank Interest

Insurance

Investments

Stock Market

Franchise Income

Rental Costs

Maintenance Costs

---

# Balancing Rules

The economy should

Reward good decisions

Punish poor decisions

Remain understandable

Avoid excessive randomness

Support long-term progression

---

# Design Principles

The economy should feel

Fair

Transparent

Predictable

Rewarding

Expandable

The player should always understand where money comes from and where it goes.

---

# Final Principle

Money is not the goal.

Money is a tool.

The true goal is building a successful second-hand phone business.
