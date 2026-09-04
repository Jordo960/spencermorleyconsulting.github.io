#!/bin/bash
# Promote the Option C / A' homepage candidate into index.html — 2026-09-04
#
# This is the ONLY step that changes index.html. Run it, eyeball the result
# locally, then run the deploy script. Rollback before committing is
# `git checkout -- index.html` (git holds the current homepage; no backup
# file is created on purpose).
set -u
cd /Users/jordanmorley/SMC/website || exit 1

SRC="index-redesign-candidate.html"
DST="index.html"
EXPECTED_MD5="75041078f2874b2fc5abc56535270c2c"

[ -f "$SRC" ] || { echo "ERROR: $SRC not found."; exit 1; }

GOT=$(md5 -q "$SRC" 2>/dev/null || md5sum "$SRC" | cut -d' ' -f1)
if [ "$GOT" != "$EXPECTED_MD5" ]; then
  echo "ERROR: $SRC checksum mismatch."
  echo "  expected $EXPECTED_MD5"
  echo "  got      $GOT"
  echo "The candidate changed since it was verified. Stopping."
  exit 1
fi

if ! git diff --quiet -- "$DST"; then
  echo "WARNING: index.html has uncommitted changes that this will overwrite."
  git diff --stat -- "$DST"
  read -r -p "Continue anyway? [y/N] " a
  [ "$a" = "y" ] || [ "$a" = "Y" ] || { echo "Aborted."; exit 0; }
fi

cp "$SRC" "$DST" || { echo "ERROR: copy failed."; exit 1; }
echo "Promoted $SRC -> $DST"
echo
echo "Preview it locally before deploying:"
echo "  cd /Users/jordanmorley/SMC/website && python3 -m http.server 8000"
echo "  open http://localhost:8000/"
echo
echo "To undo (before committing):  git checkout -- index.html"
