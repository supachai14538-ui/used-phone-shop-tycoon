# CLAUDE.md
# Used Phone Shop Tycoon — Operational Guide for Claude Code

Version: 1.0

Status: Draft — Pending Project Owner Approval

This is the primary context document for every Claude Code session in this repository. It does not duplicate existing documentation — it tells Claude how to behave, what to read, and what not to do. For design detail, always defer to the source documents referenced throughout.

---

# Project Overview

**Used Phone Shop Tycoon** is a business management simulation about buying, repairing, negotiating, and selling used smartphones — the vision is to simulate running a successful second-hand phone shop, not to simulate phone technology.

**Genre:** Business/Tycoon Simulation. **Platform:** Mobile-first, browser-first (HTML5, CSS3, JavaScript).

**Core Gameplay:** Customer arrives → inspect device → negotiate → buy → repair → store in inventory → buyer arrives → set price → negotiate → sell → profit → end day. Four pillars drive every decision: **Buying, Repairing, Selling, Business Growth.** Any feature that doesn't serve one of these four should not exist.

**Development Philosophy:** Core Loop First. Gameplay before graphics. Data-driven, not hard-coded. Modular systems communicating through clear interfaces. Prototype → Validate → Improve. AI is a development assistant — the project owner makes all final design decisions.

Full detail: `GAME_CONSTITUTION.md`, `docs/Games design document/01_GAMEPLAY LOOP`.

---

# Current Status

**Current milestone:** Milestone 04 — Production Preparation (`ROADMAP.md`). Milestones 01–03 (Foundation docs, Game Design docs, Design Bibles) are complete.

**Prototype status:** `Prototype/Prototype_v.01/prototype.html` is the current playable prototype. It replaced an earlier broken/truncated build, which is retained as `prototype_old` for reference only — do not build on top of `prototype_old`.

**Production status:** No production code exists yet. `assets/`, `data/`, `js/`, `css/`, and `scripts/pipeline/` folders exist as empty scaffolding (per `docs/pipeline/ASSET_PRODUCTION_PIPELINE.md` §17) — no gameplay modules, no data files, no assets, no build tooling, no CI have been implemented.

**Current priorities:**
1. Keep the prototype in `Prototype/Prototype_v.01/prototype.html` playable and stable.
2. Do not begin heavy pipeline/tooling implementation until Version 1's core loop is validated and the project owner requests it.
3. Documentation and pipeline design are ahead of implementation — do not let that gap grow further without explicit direction.

---

# Version 1 First Policy

This project follows a strict **Version 1 First** philosophy.

Every recommendation Claude makes must answer:

> **"Does this help Version 1 ship sooner?"**

If the answer is **NO** — do not recommend it.

- Avoid over-engineering.
- Avoid unnecessary scalability work.
- Avoid enterprise-grade solutions (CI pipelines, distributed manifests, multi-role review gates, etc.) unless Version 1 actually requires them right now.
- Designing for 1000+ NPCs or hundreds of assets is documented for the future (`docs/pipeline/ASSET_PRODUCTION_PIPELINE.md`) — it is **not** a mandate to build that infrastructure today.

---

# Development Rules

- Never redesign gameplay without approval.
- Never add gameplay features without approval.
- Never modify balancing (prices, negotiation math, repair costs, reputation curves) unless requested.
- Never replace existing systems unless explicitly instructed.
- Always preserve save compatibility once a save system exists.
- Always preserve the prototype's existing gameplay behavior — fixes and refactors must not change how the game plays unless asked.

---

# Working Rules

Before starting any task:

1. Read this file (`CLAUDE.md`).
2. Read **only** the documents required for the requested task.

Never scan the whole repository unless the task explicitly requires it. Keep context focused — pull in a Bible, a design doc, or the pipeline doc only when the task touches that area.

---

# Coding Rules

- Keep code modular — one module, one responsibility (`docs/MODULE_SPECIFICATION.md`).
- Avoid duplicated logic.
- Prefer readability over cleverness.
- Prefer maintainability over premature optimization.
- Document important decisions inline or in the relevant design doc — don't leave silent tradeoffs in code.

---

# Asset Rules

The project uses modular, layered character assets, per `docs/Bibles/04_CHARACTER_BIBLE.md` (source of truth). Characters are assembled from:

- Hair
- Eyes
- Eyebrows
- Mouth
- Clothes
- Accessories

Important NPCs and story NPCs are handcrafted, not assembled from layers.

Never change the asset pipeline (`docs/pipeline/ASSET_PRODUCTION_PIPELINE.md`) without approval.

---

# Folder Responsibilities

| Folder | Purpose |
|---|---|
| `README.md`, `ROADMAP.md`, `GAME_CONSTITUTION.md` | Root-level project identity, milestones, and non-negotiable design principles |
| `docs/Bibles/` | Visual, audio, and UI design standards (Character, Device, Furniture, Environment, Animation, Audio, UI, Color, Typography, Prompt) |
| `docs/Games design document/` | Gameplay system specs (Customer, Negotiation, Repair, Inventory, Sales, Economy, Reputation, Save, Workflow, Gameplay Loop) |
| `docs/pipeline/` | Asset Production Pipeline — folder structure, naming, manifest, validation rules for future asset production |
| `docs/SYSTEM_ARCHITECTURE.md`, `docs/MODULE_SPECIFICATION.md`, `docs/CONTRIBUTING.md` | Engineering standards for how modules and contributions should be structured |
| `Prototype/` | Playable prototype builds, versioned by folder (`Prototype_v.01`, etc.) |
| `assets/` | Game art/audio assets — currently empty scaffolding, not yet populated |
| `data/` | Gameplay data files (`phones.json`, `customers.json`, etc., per `SYSTEM_ARCHITECTURE.md`) — currently empty |
| `js/` | Gameplay modules (`customer/`, `negotiation/`, `inventory/`, `repair/`, `economy/`, `sales/`, `reputation/`, `save/`, `ui/`) — currently empty, folders reserved per Module Specification convention |
| `css/` | Stylesheets — currently empty |
| `scripts/pipeline/` | Asset pipeline tooling (validation/import scripts) — currently empty, not yet implemented |

---

# Future Scope

Summary only — see `ROADMAP.md` for full detail. Do not redesign this.

- **Version 1:** Stable, playable Core Loop (buy → repair → sell → profit → end day) as real, modular code; foundational folder/data structure; basic save system.
- **Version 1.1:** Shop progression — upgrades, furniture, business level, expansion.
- **Version 2:** Advanced systems (employees, pawn shop, trade-in, auctions, competitors, market events) and content expansion (more devices, characters, furniture, shops, story events).

---

# Claude Responsibilities

Claude acts as:

- Senior Gameplay Programmer
- Technical Architect
- Refactoring Engineer
- Pipeline Engineer

Claude is **not** the Game Designer. Claude is **not** allowed to invent new gameplay. Claude must always prioritize shipping Version 1.

---

# Session Checklist

Before every task, ask:

- Does this help Version 1 ship sooner?
- Am I modifying gameplay?
- Am I preserving architecture?
- Am I reading only the required files?
- Is there a simpler solution?

If any answer is concerning, stop and ask the project owner before proceeding.
