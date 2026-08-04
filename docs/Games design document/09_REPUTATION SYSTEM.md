# ⭐ REPUTATION SYSTEM
# Used Phone Shop Tycoon

Version: 1.0

Status: Core System

---

# Overview

The Reputation System represents how customers perceive the player's business.

A higher reputation increases customer trust, improves business opportunities, and unlocks premium content.

A lower reputation makes negotiations harder and reduces business growth.

---

# System Goals

The Reputation System should

- Reward honest business practices
- Encourage smart decisions
- Influence customer behavior
- Support long-term progression
- Affect every major gameplay system

---

# Reputation Workflow

```
Game Event

↓

Evaluate Reputation Change

↓

Apply Reputation Modifier

↓

Update Reputation Score

↓

Unlock Rewards (Future)

↓

Refresh UI

↓

Save Data
```

---

# Reputation Score

Range

0 - 100

Default

50

---

# Reputation Levels

0 - 19

Very Poor

---

20 - 39

Poor

---

40 - 59

Average

---

60 - 79

Trusted

---

80 - 100

Excellent

---

# Reputation Sources

Positive

- Successful Sales
- Fair Negotiations
- Honest Pricing
- High Repair Quality
- Customer Satisfaction
- Completing Daily Goals (Future)

Negative

- Failed Negotiations
- Overpriced Phones
- Selling Low-quality Devices
- Repair Failures (Future)
- Customer Complaints (Future)

---

# Reputation Effects

Higher Reputation

- Better Customers
- Easier Negotiations
- More Expensive Devices
- More VIP Customers (Future)
- Better Selling Opportunities

Lower Reputation

- Difficult Negotiations
- Impatient Customers
- Low Trust
- Fewer High-value Customers
- Reduced Customer Traffic

---

# Customer Interaction

Customer behavior changes based on

Shop Reputation

↓

Trust

↓

Negotiation

↓

Buying / Selling Decision

---

# Economy Interaction

Higher reputation may increase

Average Selling Price

Customer Count

Business Growth

Long-term Profit

---

# Customer System Interaction

Customer System uses Reputation to determine

Customer Quality

Budget

Patience

Trust

Returning Customer Chance

---

# Negotiation Interaction

Reputation affects

Acceptance Rate

Counter Offer

Negotiation Attempts

Walk Away Chance

---

# Sales Interaction

Higher reputation may increase

Customer Satisfaction

Positive Reviews (Future)

Repeat Customers

Referral Chance (Future)

---

# Future Features

Customer Reviews

Online Rating

Social Media Reputation

Business Awards

VIP Membership

Local Popularity

Media Events

---

# Events

ReputationIncreased

ReputationDecreased

ReputationUpdated

LevelChanged

RewardUnlocked

---

# Data Structure

reputation.json

Contains

Current Reputation

Level

History

Statistics

Configuration

---

# Balancing Rules

Reputation should

Grow slowly

Decrease gradually

Reward consistency

Never change dramatically from a single event

---

# Design Principles

Reputation should feel

Meaningful

Visible

Rewarding

Influential

Long-term

The player should care about maintaining a good reputation.

---

# Future Expansion

Google Reviews

Loyal Customers

Business Certificates

Premium Membership

Brand Partnerships

Special Events

Influencer Visits

---

# Final Principle

Reputation is earned,

not purchased.

A trusted shop attracts better customers,

creates better opportunities,

and builds a stronger business.
