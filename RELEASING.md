# Releasing

## PR Labels

| Label | Version bump |
|-------|--------------|
| `Breaking` | Major (x.0.0) |
| `Feature` | Minor (0.x.0) |
| `Bugfix` | Patch (0.0.x) |

The first line of the PR description becomes the changelog entry.

## Release

```bash
# Preview
pnpm release:prepare --dry-run

# Prepare (updates changelog, bumps versions, commits, tags)
pnpm release:prepare

# Review, push, publish
git show HEAD
git push && git push --tags
pnpm release
```

Requires [GitHub CLI](https://cli.github.com/) (`gh`).
