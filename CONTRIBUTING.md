# Contributing to KampusKart

Thank you for contributing to KampusKart! This document outlines our development workflow and PR guidelines.

---

## 📋 PR Guidelines

### Ground Rules
- ✅ **Maximum 1 PR per day**
- ✅ **Target ≤100 LOC per PR** (up to 150 with justification)
- ✅ **Daily consistency** - commit every day during the sprint
- ✅ **No skipping days** - maintain momentum

### PR Template

Every PR must include:

```markdown
## What changed?
[Brief 2-3 line explanation of the changes]

## Which Kalvium Concept(s)?
- [Concept Name from scoring rubric]

## How to test?
[Step-by-step instructions or test command]

## Video Proof
[Loom link or screen recording - 2-3 minutes]

## Proof of Work
- GitHub Projects card moved to "Done"
- Commits: X files changed, Y lines added
```

---

## 🌿 Branch Naming Convention

- Feature: `feature/[issue-name]`
- Bug fix: `fix/[issue-name]`
- Documentation: `docs/[topic]`

Example: `feature/user-authentication`

---

## 💻 Code Standards

### General
- Write clean, readable code
- Add comments for complex logic
- No `console.log` in production code
- Handle errors gracefully

### Backend
- Use async/await (not callbacks)
- Validate all inputs
- Return consistent JSON responses
- Use proper HTTP status codes

### Frontend
- Create reusable components
- Use functional components with hooks
- Keep components under 150 lines
- Match hi-fidelity designs exactly

---

## ✅ Before Submitting PR

- [ ] Code runs locally without errors
- [ ] All new features tested manually
- [ ] No sensitive data (API keys, passwords) in code
- [ ] `.env.example` updated if new env vars added
- [ ] Video proof recorded and uploaded
- [ ] GitHub Projects board updated
- [ ] PR description filled completely

---

## 🎥 Video Proof Requirements

- **Length**: 2-3 minutes
- **Content**: Show the feature working + explain the code
- **Tool**: Loom, OBS, or any screen recorder
- **Include**: Terminal output, browser, code walkthrough

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] API endpoints tested from deployed URL
- [ ] Frontend connects to deployed backend
- [ ] No hardcoded localhost URLs

---

## 📞 Getting Help

- Check existing issues first
- Ask in the cohort Discord channel
- Tag your mentor for urgent blockers

---

**Happy Coding! 🎉**
