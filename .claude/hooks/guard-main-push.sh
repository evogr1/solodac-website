#!/bin/sh
# Blocks git pushes that would update main: a push to main deploys solodac.com live.
# Claude Code passes the tool call as JSON on stdin; exit 2 blocks it and shows the message.
input=$(cat)
command=$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write(JSON.parse(s).tool_input.command||"")}catch{}})')
case "$command" in
  *"git push"*)
    branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if printf '%s' "$command" | grep -Eq '(^|[[:space:]:])main([[:space:]]|$)' || { [ "$branch" = "main" ] && ! printf '%s' "$command" | grep -Eq 'origin[[:space:]]+[^[:space:]-]'; }; then
      echo "Blocked: pushing to main deploys solodac.com live. Get the owner's explicit OK, then push it yourself or ask them to." >&2
      exit 2
    fi
    ;;
esac
exit 0
