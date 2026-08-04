# 📦 INVENTORY SYSTEM
# Used Phone Shop Tycoon

Version: 1.0

Status: Core System

---

# Overview

The Inventory System manages every device owned by the player.

It stores phone information, repair status, ownership, valuation, and selling availability.

Every purchased phone must exist inside the inventory before any further actions can occur.

---

# System Goals

The Inventory System should

- Store all owned devices
- Track phone condition
- Track repair status
- Track ownership
- Track selling status
- Support future expansion

---

# Inventory Lifecycle

```
Purchase Phone

↓

Create Inventory Item

↓

Store Device

↓

Repair (Optional)

↓

Update Device

↓

Available For Sale

↓

Sold

↓

Remove From Inventory

↓

Archive Transaction
```

---

# Inventory Item

Each inventory item contains

Device ID

Brand

Model

Storage

Color

Condition

Purchase Price

Estimated Market Value

Repair Cost

Repair Status

Selling Status

Purchase Date

Selling Date

Current Owner

Unique Serial ID

---

# Inventory Status

Every phone has one status.

Purchased

Waiting For Repair

Repairing (Future)

Ready For Sale

Reserved (Future)

Sold

Archived

---

# Repair Status

Possible values

Pending

Completed

Not Required

Failed (Future)

---

# Selling Status

Possible values

Unavailable

Available

Reserved

Sold

---

# Player Actions

Player may

Inspect Device

Repair Device

Set Selling Price

Sell Device

Remove Device (Future)

View History

---

# Inventory Categories

Current Inventory

Phones currently owned.

Sold Devices

Historical records.

Future

Reserved Phones

Pawned Phones

Auction Items

Employee Devices

---

# Device Information

Every stored device should maintain

Phone Information

↓

Business Information

↓

Repair Information

↓

Sales Information

All information remains attached to the same device until archived.

---

# Inventory Capacity (Future)

Inventory capacity may depend on

Shop Level

↓

Storage Furniture

↓

Warehouse Upgrade

If inventory is full

Player cannot purchase more devices.

---

# Inventory Search (Future)

Player should be able to filter by

Brand

Model

Condition

Repair Status

Selling Status

Purchase Date

Estimated Value

Profit Potential

---

# Economy Interaction

Inventory affects

Business Assets

↓

Repair Cost

↓

Expected Revenue

↓

Cash Flow

Inventory value contributes to overall business growth.

---

# Module Communication

Inventory System communicates with

Customer System

Negotiation System

Repair System

Sales System

Economy System

Save System

Inventory never modifies other modules directly.

---

# Events

PhonePurchased

InventoryUpdated

RepairCompleted

SellingPriceUpdated

PhoneSold

InventoryArchived

---

# Data Structure

Inventory data should be stored separately.

Example

inventory.json

Each phone should have a unique identifier.

Never rely on array position.

---

# Future Expansion

Warehouse

Favorite Devices

Collections

Trade-In Queue

Bulk Inventory

Inventory Tags

Search Filters

Sorting

Phone History

QR Code Labels

---

# Design Principles

Inventory should be

Simple

Reliable

Fast

Scalable

Easy to search

Every phone should have its own identity.

---

# Final Principle

The Inventory is the heart of the business.

Every phone has a story.

From the moment it is purchased until it is sold, every action should be recorded and traceable.
