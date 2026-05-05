#!/usr/bin/env bash
# Remediate leaked secrets (BFG / git-filter-repo helpers)
# WARNING: These operations rewrite repo history and require coordination.

set -euo pipefail

REPO_SSH="git@github.com:kalviumcommunity/S72_Gaurav_Capstone_KampusKart.git"
CLONE_DIR="${PWD}/kampuskart-mirror.git"

echo "This script will create a mirror clone and remove sensitive paths from history."
echo "You MUST review the commands before pushing."

read -p "Continue and create mirror clone in ${CLONE_DIR}? (y/N) " confirm
if [[ "${confirm}" != "y" && "${confirm}" != "Y" ]]; then
  echo "Aborted by user."
  exit 1
fi

echo "Cloning repository (mirror)..."
git clone --mirror "${REPO_SSH}" "${CLONE_DIR}"
cd "${CLONE_DIR}"

if command -v git-filter-repo >/dev/null 2>&1; then
  echo "Using git-filter-repo to remove files..."
  git filter-repo --invert-paths --paths backend/.env --paths frontend/.env --paths frontend/.env.development
  echo "Filter complete. Run gc and push when ready."
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  echo "Push the cleaned repo back to origin with force?"
  read -p "Force push cleaned mirror to origin? (y/N) " pconfirm
  if [[ "${pconfirm}" == "y" || "${pconfirm}" == "Y" ]]; then
    git push --force
    echo "Pushed cleaned history to origin. Notify collaborators to re-clone."
  else
    echo "Skipped push. You can inspect the cleaned mirror at ${CLONE_DIR} and push manually."
  fi
else
  echo "git-filter-repo not found. Trying BFG as fallback (you must have BFG installed)."
  if ! command -v bfg >/dev/null 2>&1; then
    echo "BFG not found. Install git-filter-repo or BFG and re-run this script." >&2
    exit 2
  fi
  echo "Running BFG to delete files..."
  # The BFG needs a bare repo mirror
  bfg --delete-files backend/.env
  bfg --delete-files frontend/.env
  bfg --delete-files frontend/.env.development
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  read -p "Force push cleaned mirror to origin? (y/N) " pconfirm
  if [[ "${pconfirm}" == "y" || "${pconfirm}" == "Y" ]]; then
    git push --force
    echo "Pushed cleaned history to origin. Notify collaborators to re-clone."
  else
    echo "Skipped push. You can inspect the cleaned mirror at ${CLONE_DIR} and push manually."
  fi
fi

echo "Cleanup local workspace: remove any working .env files from repo root (not deleted from your machine)."
git clone "${REPO_SSH}" tmp-inspect-repo
cd tmp-inspect-repo || exit 0
git rm --cached backend/.env frontend/.env frontend/.env.development || true
git commit -m "chore(secrets): remove committed .env files" || true
echo "Remediation script finished. Read docs/secret_remediation.md for follow-up steps."
