<#
.SYNOPSIS
  PowerShell helper to prepare and run secret-remediation with git-filter-repo or BFG.

WARNING: History-rewriting is destructive. Coordinate with collaborators.
#>

param()

$ErrorActionPreference = 'Stop'

$repoSsh = 'git@github.com:kalviumcommunity/S72_Gaurav_Capstone_KampusKart.git'
$cloneDir = Join-Path -Path $PWD -ChildPath 'kampuskart-mirror.git'

Write-Host "This script will create a mirror clone at $cloneDir and remove sensitive paths from history." -ForegroundColor Yellow
$confirm = Read-Host 'Continue? (y/N)'
if ($confirm -notin @('y','Y')) { Write-Host 'Aborted by user.'; exit 1 }

git clone --mirror $repoSsh $cloneDir
Set-Location $cloneDir

if (Get-Command git-filter-repo -ErrorAction SilentlyContinue) {
  Write-Host 'Using git-filter-repo to remove files...'
  git filter-repo --invert-paths --paths backend/.env --paths frontend/.env --paths frontend/.env.development
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  $push = Read-Host 'Force push cleaned mirror to origin? (y/N)'
  if ($push -in @('y','Y')) { git push --force; Write-Host 'Pushed cleaned history to origin.' }
  else { Write-Host 'Skipped push. Inspect the mirror before pushing.' }
} elseif (Get-Command bfg -ErrorAction SilentlyContinue) {
  Write-Host 'Using BFG to remove files...'
  bfg --delete-files backend/.env
  bfg --delete-files frontend/.env
  bfg --delete-files frontend/.env.development
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  $push = Read-Host 'Force push cleaned mirror to origin? (y/N)'
  if ($push -in @('y','Y')) { git push --force; Write-Host 'Pushed cleaned history to origin.' }
  else { Write-Host 'Skipped push. Inspect the mirror before pushing.' }
} else {
  Write-Host 'Neither git-filter-repo nor BFG found. Install one and re-run.' -ForegroundColor Red
  exit 2
}

Write-Host 'Removing tracked .env files from a fresh working clone (does not delete local copies)...'
git clone $repoSsh tmp-inspect-repo
Set-Location tmp-inspect-repo
git rm --cached backend/.env frontend/.env frontend/.env.development -f -q || Write-Host 'Files may not exist in index.'
git commit -m 'chore(secrets): remove committed .env files' -q || Write-Host 'Nothing to commit.'
Write-Host 'Remediation complete. See docs/secret_remediation.md for follow-up steps.'
