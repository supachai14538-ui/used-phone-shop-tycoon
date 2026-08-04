# 🤝 CONTRIBUTING
# Used Phone Shop Tycoon

Thank you for contributing to this project.

This document describes the development standards used throughout the project.

---

# Development Philosophy

Every contribution should follow the project constitution.

Priority

Gameplay

↓

Maintainability

↓

Performance

↓

Visual Effects

---

# Before Writing Code

Read

- README.md
- GAME_CONSTITUTION.md
- SYSTEM_ARCHITECTURE.md
- MODULE_SPECIFICATION.md

Understand the existing architecture before adding new features.

---

# Branch Strategy

Never develop directly on the main branch.

Recommended branches

feature/...

fix/...

docs/...

prototype/...

---

# Commit Message

Recommended format

Feature

```
feat: add repair system
```

Fix

```
fix: negotiation calculation
```

Documentation

```
docs: update character bible
```

Refactor

```
refactor: inventory module
```

---

# Coding Standards

- Write readable code.
- Keep functions small.
- Avoid duplicated logic.
- Prefer modular architecture.
- Never hard-code gameplay values.

---

# Documentation

Every major feature should update its documentation.

If architecture changes,

update

- SYSTEM_ARCHITECTURE.md
- MODULE_SPECIFICATION.md

If gameplay changes,

update

Game Design Documents.

---

# Module Rules

One module

↓

One responsibility

Avoid "God Objects."

---

# Performance

Performance is part of gameplay.

Avoid unnecessary

- Loops
- Rendering
- Memory allocation
- Visual effects

---

# Asset Rules

Assets must follow the official Bible documents.

Do not introduce inconsistent styles.

---

# AI-assisted Development

AI is used as a development assistant.

All generated code must be reviewed before merging.

Never merge AI-generated code without verification.

---

# Pull Requests

Every Pull Request should

- Build successfully
- Follow architecture
- Include documentation updates
- Preserve gameplay stability

---

# Final Rule

When unsure,

choose

Simplicity

over

Complexity.
