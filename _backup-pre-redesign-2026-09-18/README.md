# Pre-redesign backup — 2026-09-18

Snapshot of the 8 pages immediately before they were replaced by the
astra-mockup-2026 redesign, taken at commit 015d024 (the pending-sweep
commit, right before the redesign commit).

To restore any one page: copy it back from here to its live path and
re-run the SFTP deploy for that file, or simply:

    git checkout 015d024 -- <path>

which pulls the exact pre-redesign version straight from git history —
this folder is a convenience copy, not the only record.

Rollback for the whole launch: `git revert <redesign-commit-sha>` or
`git checkout 015d024 -- index.html municipal.html small-business.html
ai-adoption-policy.html our-clients.html case-studies/index.html
team/index.html blog/answer-engine-optimization-aeo-guide.html styles.css
app.js assets/`, then redeploy via SFTP.

This folder is not part of the SFTP deploy batch — it stays local/in-git
only.
