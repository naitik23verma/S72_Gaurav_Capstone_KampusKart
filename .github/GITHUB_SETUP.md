# GitHub Repository Setup Guide

This guide will help you set up your GitHub repository with all necessary configurations for KampusKart.

## Repository Settings

### 1. General Settings

1. Go to **Settings** > **General**
2. Set repository name: `KampusKart`
3. Add description: `🎓 MIT ADT University Campus Portal - Your all-in-one campus companion`
4. Add website: `https://kampuskart.netlify.app/`
5. Add topics/tags:
   - `campus-portal`
   - `university`
   - `react`
   - `nodejs`
   - `mongodb`
   - `express`
   - `typescript`
   - `tailwindcss`
   - `socket-io`
   - `education`

### 2. Features

Enable the following features:
- [x] Issues
- [x] Projects
- [x] Wiki (optional)
- [x] Discussions (optional)
- [ ] Sponsorships (optional)

### 3. Pull Requests

Configure pull request settings:
- [x] Allow merge commits
- [x] Allow squash merging
- [x] Allow rebase merging
- [x] Automatically delete head branches
- [x] Allow auto-merge

### 4. Branch Protection Rules

Create protection rules for `main` branch:

1. Go to **Settings** > **Branches** > **Add rule**
2. Branch name pattern: `main`
3. Enable:
   - [x] Require a pull request before merging
   - [x] Require approvals (1 approval)
   - [x] Dismiss stale pull request approvals when new commits are pushed
   - [x] Require status checks to pass before merging
   - [x] Require branches to be up to date before merging
   - [x] Require conversation resolution before merging
   - [x] Include administrators (optional)

## GitHub Actions Secrets

### Required Secrets

Go to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**

#### For CI/CD Workflows

1. **VITE_GOOGLE_MAPS_API_KEY**
   - Description: Google Maps API key for frontend
   - Get from: https://console.cloud.google.com/

2. **NETLIFY_AUTH_TOKEN**
   - Description: Netlify authentication token
   - Get from: Netlify > User Settings > Applications > Personal access tokens

3. **NETLIFY_SITE_ID**
   - Description: Netlify site ID
   - Get from: Netlify > Site Settings > General > Site details > Site ID

4. **RENDER_API_KEY**
   - Description: Render API key for deployment
   - Get from: Render > Account Settings > API Keys

5. **RENDER_SERVICE_ID**
   - Description: Render service ID for backend
   - Get from: Render > Service > Settings > Service ID

### Optional Secrets (for enhanced features)

6. **CODECOV_TOKEN** (if using code coverage)
7. **SLACK_WEBHOOK** (for deployment notifications)

## GitHub Pages (Optional)

If you want to host documentation on GitHub Pages:

1. Go to **Settings** > **Pages**
2. Source: Deploy from a branch
3. Branch: `gh-pages` or `main` > `/docs`
4. Save

## Issue Labels

Create custom labels for better issue management:

| Label | Color | Description |
|-------|-------|-------------|
| `bug` | `#d73a4a` | Something isn't working |
| `enhancement` | `#a2eeef` | New feature or request |
| `documentation` | `#0075ca` | Improvements or additions to documentation |
| `good first issue` | `#7057ff` | Good for newcomers |
| `help wanted` | `#008672` | Extra attention is needed |
| `priority: high` | `#e11d21` | High priority |
| `priority: medium` | `#fbca04` | Medium priority |
| `priority: low` | `#0e8a16` | Low priority |
| `frontend` | `#61dafb` | Frontend related |
| `backend` | `#68a063` | Backend related |
| `security` | `#ee0701` | Security related |
| `performance` | `#f9d0c4` | Performance improvements |
| `dependencies` | `#0366d6` | Dependency updates |
| `wontfix` | `#ffffff` | This will not be worked on |
| `duplicate` | `#cfd3d7` | This issue or pull request already exists |

## Project Boards (Optional)

Create a project board for task management:

1. Go to **Projects** > **New project**
2. Choose template: **Automated kanban**
3. Columns:
   - To Do
   - In Progress
   - Review
   - Done

## Discussions (Optional)

Enable discussions for community engagement:

1. Go to **Settings** > **General** > **Features**
2. Enable **Discussions**
3. Create categories:
   - Announcements
   - General
   - Ideas
   - Q&A
   - Show and tell

## Repository Topics

Add these topics to make your repository discoverable:

```
campus-portal, university, react, nodejs, mongodb, express, typescript, 
tailwindcss, socket-io, education, student-portal, campus-management,
real-time-chat, google-maps, jwt-authentication, rest-api, full-stack
```

## Social Preview

Create a social preview image:

1. Go to **Settings** > **General** > **Social preview**
2. Upload an image (1280x640px recommended)
3. Use your logo or a screenshot of the application

## About Section

Update the About section on the main repository page:

- **Description**: 🎓 MIT ADT University Campus Portal - Your all-in-one campus companion for navigation, events, news, lost & found, and more.
- **Website**: https://kampuskart.netlify.app/
- **Topics**: (as listed above)

## README Badges

Your README already includes these badges:
- Live Demo
- License
- Node.js version
- React version
- MongoDB version

Consider adding more:
- Build status
- Code coverage
- Dependencies status
- Last commit
- Contributors

## Security

1. Enable **Dependabot alerts**:
   - Go to **Settings** > **Security & analysis**
   - Enable **Dependabot alerts**
   - Enable **Dependabot security updates**

2. Enable **Code scanning**:
   - Go to **Security** > **Code scanning**
   - Set up **CodeQL analysis**

3. Review **Security policy**:
   - Your SECURITY.md is already in place

## Webhooks (Optional)

Set up webhooks for external integrations:

1. Go to **Settings** > **Webhooks** > **Add webhook**
2. Configure for:
   - Slack notifications
   - Discord notifications
   - CI/CD triggers

## Collaborators

Add collaborators if working in a team:

1. Go to **Settings** > **Collaborators**
2. Add team members with appropriate permissions:
   - **Admin**: Full access
   - **Write**: Push access
   - **Read**: Read-only access

## Verification Checklist

Before making your repository public, verify:

- [x] README.md is complete and informative
- [x] LICENSE file is present
- [x] CONTRIBUTING.md has clear guidelines
- [x] CODE_OF_CONDUCT.md is in place
- [x] SECURITY.md has security policy
- [x] .gitignore excludes sensitive files
- [x] No .env files are committed
- [x] No API keys or secrets in code
- [x] All documentation is up to date
- [x] GitHub Actions workflows are configured
- [x] Issue templates are created
- [x] PR template is created
- [x] Branch protection rules are set
- [x] Repository description and topics are added

## Post-Setup Tasks

After setting up the repository:

1. **Test GitHub Actions**:
   - Push a commit to trigger CI workflow
   - Create a PR to test PR checks
   - Merge to main to test CD workflow

2. **Test Issue Templates**:
   - Create a test issue using each template
   - Verify all fields are present

3. **Test PR Template**:
   - Create a test PR
   - Verify the template appears

4. **Monitor Workflows**:
   - Check Actions tab for workflow runs
   - Verify deployments are successful

5. **Update Documentation**:
   - Add screenshots to README
   - Update API documentation if needed
   - Add more examples if helpful

## Maintenance

Regular maintenance tasks:

- **Weekly**: Review and respond to issues
- **Weekly**: Review and merge PRs
- **Monthly**: Update dependencies
- **Monthly**: Review and update documentation
- **Quarterly**: Security audit
- **Quarterly**: Performance review

## Resources

- [GitHub Docs](https://docs.github.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify Documentation](https://docs.netlify.com/)
- [Render Documentation](https://render.com/docs)

---

**Your repository is now production-ready and GitHub-ready! 🚀**
