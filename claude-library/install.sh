#!/usr/bin/env bash
# Installs every skill in this repo for your whole Mac, not just this project.
#
#   bash claude-library/install.sh
#
# 1. Copies claude-library/skills/* and .claude/skills/* into ~/.claude/skills,
#    so Claude Code uses them in every folder and every project.
#    A skill that is already there is left alone unless you pass --update.
#    Add --all to also install the large optional sets in claude-library/more/.
# 2. Makes one zip per skill in ~/Desktop/claude-skill-zips, for the Claude app
#    and claude.ai (Settings > Capabilities > Skills > Upload skill).
#
# It only copies files. It runs none of the skills' scripts and changes no settings.

set -euo pipefail

update=false
all=false
for arg in "$@"; do
  [ "$arg" = "--update" ] && update=true
  [ "$arg" = "--all" ] && all=true
done

repo="$(cd "$(dirname "$0")/.." && pwd)"
target="$HOME/.claude/skills"
zips="$HOME/Desktop/claude-skill-zips"
mkdir -p "$target" "$zips"

installed=0
skipped=0
dirs=("$repo"/claude-library/skills/* "$repo"/.claude/skills/*)
# --all also installs claude-library/more/* (the large optional sets, such as the 277 extra ECC skills).
[ "$all" = true ] && dirs+=("$repo"/claude-library/more/*/*)
for dir in "${dirs[@]}"; do
  [ -f "$dir/SKILL.md" ] || continue
  name="$(basename "$dir")"
  if [ -e "$target/$name" ] && [ "$update" = false ]; then
    skipped=$((skipped + 1))
  else
    rm -rf "${target:?}/$name"
    cp -R "$dir" "$target/$name"
    installed=$((installed + 1))
  fi
  (cd "$(dirname "$dir")" && rm -f "$zips/$name.zip" && zip -qr "$zips/$name.zip" "$name" -x "*.DS_Store")
done

echo "Installed $installed skills into $target ($skipped already there; run with --update to refresh them)."
echo "Zips for the Claude app are in $zips. Upload the ones you want in Settings > Capabilities > Skills."
echo "Restart Claude Code to pick up new skills."
