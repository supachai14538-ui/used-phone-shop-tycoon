# 📦 MODULE SPECIFICATION
# Used Phone Shop Tycoon

Version: 1.0

---

# Purpose

This document defines the standard specification for every module used in the project.

Every gameplay module must follow this specification.

The goal is to ensure:

- Consistency
- Maintainability
- Scalability
- AI-friendly development

---

# Standard Module Structure

Every module should contain the following sections.

---

## Module Name

Example

Customer System

---

## Description

Short explanation describing the purpose of the module.

---

## Responsibilities

List every responsibility.

Example

- Generate customers
- Generate personality
- Generate offers
- Handle customer states

One module should have one primary responsibility.

---

## Inputs

Data received from other modules.

Example

- Player Action
- Inventory Data
- Economy Data

---

## Outputs

Data returned to other modules.

Example

- Customer Object
- Negotiation Result
- Reputation Update

---

## Dependencies

Modules required by this module.

Example

Customer System

↓

Negotiation System

↓

Economy System

Avoid unnecessary dependencies.

---

## Events

Events produced by this module.

Example

CustomerArrived

NegotiationStarted

NegotiationSuccess

NegotiationFailed

CustomerLeft

---

## Public Functions

Functions accessible by other modules.

Example

generateCustomer()

acceptOffer()

rejectOffer()

leaveShop()

---

## Internal Functions

Private functions.

Cannot be called by other modules.

Example

calculateMood()

generateDialogue()

randomPersonality()

---

## Module State

Data stored inside the module.

Example

Current Customer

Current Mood

Negotiation Count

Offer History

---

## Data Source

Specify where data comes from.

Example

customers.json

economy.json

phones.json

---

## Error Handling

Example

Invalid customer

Invalid phone

Missing inventory

Insufficient cash

---

## Performance Notes

Expected complexity.

Avoid unnecessary loops.

Avoid duplicated calculations.

---

## Future Expansion

Possible future upgrades.

Example

VIP Customers

Scammers

Collectors

Returning Customers

---

# Module Communication Rules

Modules should never directly modify another module's internal state.

Communication should happen through:

- Public Functions
- Events
- Shared Data Models

---

# Naming Convention

Module

CustomerSystem

Function

generateCustomer()

Variable

customerList

Constant

MAX_NEGOTIATION

Event

CustomerArrived

File

customer-system.js

---

# Folder Convention

js/

customer/

repair/

inventory/

economy/

shop/

ui/

---

# Development Rules

One Module

↓

One Responsibility

↓

One Owner

↓

One Test

↓

One Documentation

---

# AI Development Rules

Before creating a new module, AI must verify:

Does a similar module already exist?

Can this feature be added to an existing module?

Would adding this responsibility violate the Single Responsibility Principle?

If yes,

create a new module instead.

---

# Golden Rules

A module should be:

- Small
- Independent
- Testable
- Reusable
- Predictable
- Documented

Never create "God Modules."

If a module becomes too large,

split it.
