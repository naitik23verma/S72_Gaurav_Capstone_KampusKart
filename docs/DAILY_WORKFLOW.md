# Daily Workflow Guide

Quick reference for your daily PR routine during the 30-day sprint.

---

## ⏰ Daily Schedule (2 hours)

- **30 min**: Plan & review issue
- **60 min**: Code implementation
- **20 min**: Testing & verification
- **10 min**: Record video proof

---

## 📋 Daily Checklist

### Morning (Planning)
- [ ] Review today's issue from GitHub Projects
- [ ] Move card to "In Progress"
- [ ] Read concept requirements from execution plan
- [ ] Sketch out approach (5 min)

### Coding (Implementation)
- [ ] Create feature branch: `git checkout -b feature/day-X-[name]`
- [ ] Write code (target ≤100 LOC)
- [ ] Test locally (API/component works)
- [ ] Check line count: `git diff --stat`

### Testing (Verification)
- [ ] Run the feature manually
- [ ] Test edge cases
- [ ] Check console for errors
- [ ] Verify against acceptance criteria

### Documentation (PR)
- [ ] Stage files: `git add .`
- [ ] Commit: `git commit -m "feat: Day X - [description]"`
- [ ] Push: `git push origin feature/day-X-[name]`
- [ ] Create PR on GitHub with full template

### Video Proof (Recording)
- [ ] Open Loom or screen recorder
- [ ] Show feature working (1 min)
- [ ] Explain code changes (1 min)
- [ ] Show terminal/console output (30 sec)
- [ ] Upload and copy link to PR

### Wrap Up
- [ ] Move GitHub Projects card to "Done"
- [ ] Link PR to issue
- [ ] Update progress tracker
- [ ] Celebrate! 🎉

---

## 🎥 Video Recording Template

**Structure** (2-3 minutes):

1. **Intro** (15 sec)
   - "Hey, this is Day X of KampusKart"
   - "Today I implemented [concept]"

2. **Demo** (60 sec)
   - Show the feature working
   - Click through UI or test API
   - Show data in database/console

3. **Code Walkthrough** (60 sec)
   - Open key files
   - Explain main changes
   - Highlight important logic

4. **Proof** (15 sec)
   - Show git diff or file count
   - Show GitHub Projects board
   - "Moving card to Done!"

---

## 💻 Git Commands Quick Reference

```bash
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/day-X-[name]

# During work
git status
git add .
git commit -m "feat: Day X - [description]"

# Check your changes
git diff --stat
git log --oneline -1

# Push to GitHub
git push origin feature/day-X-[name]

# After PR merged
git checkout main
git pull origin main
git branch -d feature/day-X-[name]
```

---

## 📊 Line Count Check

```bash
# Count lines in staged files
git diff --cached --stat

# Count lines in specific file
Get-Content filename.js | Measure-Object -Line

# Count all lines in commit
git diff HEAD~1 --stat
```

---

## 🚨 Common Pitfalls to Avoid

❌ **Don't**:
- Skip video proof (you'll forget details later)
- Exceed 150 LOC without justification
- Leave console.logs in code
- Hardcode API URLs or secrets
- Skip testing before pushing
- Create 2 PRs in one day

✅ **Do**:
- Record video immediately after feature works
- Keep PRs small and focused
- Test edge cases
- Use environment variables
- Update .env.example if needed
- Maintain daily consistency

---

## 📝 PR Description Template (Copy-Paste)

```markdown
# [Day X] [Concept Name]

## What changed?
[2-3 line explanation]

## Which Kalvium Concept(s)?
- [Concept Name] (X points)

## How to test?
1. [Step 1]
2. [Step 2]
3. [Expected result]

## Video Proof
[Loom link]

## Proof of Work
- ✅ Files changed: X
- ✅ Lines added: Y
- ✅ GitHub Projects card moved to Done
- ✅ Video recorded and linked
```

---

## 🎯 Quality Checklist Before PR

- [ ] Code runs without errors
- [ ] Feature works as expected
- [ ] No console.logs or debug code
- [ ] Comments added for complex logic
- [ ] Error handling implemented
- [ ] Matches design (if frontend)
- [ ] API tested with Postman (if backend)
- [ ] .env.example updated (if new vars)
- [ ] README updated (if needed)

---

## 📈 Progress Tracking

Keep a simple daily log:

```
Day 1 ✅ - Repo setup - PR #1
Day 2 ✅ - Low-fid wireframes - PR #2
Day 3 ⏳ - In progress
Day 4 📅 - Planned
...
```

---

## 🆘 When You're Stuck

1. **Check the execution plan** - Re-read the day's requirements
2. **Review previous PRs** - See what worked before
3. **Google the error** - Stack Overflow is your friend
4. **Ask in Discord** - Cohort members can help
5. **Tag your mentor** - For urgent blockers
6. **Take a break** - 10 min walk helps!

---

## 🏆 Motivation Tips

- **Visualize the end**: 14 points, completed capstone!
- **Track progress**: Update your score daily
- **Share wins**: Post in Discord when you complete a day
- **Reward yourself**: Treat after each milestone
- **Remember why**: This is YOUR product solving real problems

---

**You've got this! One day at a time. 🚀**
