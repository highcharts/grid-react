#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Terminal colors
const c = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

const CHANGELOG_LABELS = ['Feature', 'Bugfix', 'Breaking'];
const PACKAGE_PATHS = [
    'packages/grid-lite-react/package.json',
    'packages/grid-pro-react/package.json'
];

const dryRun = process.argv.includes('--dry-run');
const ciMode = process.argv.includes('--ci');
const versionArg = process.argv.find(arg => /^\d+\.\d+\.\d+/.test(arg));

function exec(cmd, options = {}) {
    try {
        return execSync(cmd, { encoding: 'utf-8', cwd: ROOT_DIR, ...options }).trim();
    } catch {
        return null;
    }
}

function getLatestTag() {
    const tag = exec('git describe --tags --abbrev=0 2>/dev/null');
    return tag;
}

function getCurrentVersion() {
    const pkgPath = join(ROOT_DIR, PACKAGE_PATHS[0]);
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    return pkg.version;
}

function getMergedPRs(sinceTag) {
    const baseArgs = '--state merged --base main --json number,title,body,labels,mergedAt';
    let searchArg = '';

    if (sinceTag) {
        // Get the date of the tag
        const tagDate = exec(`git log -1 --format=%aI ${sinceTag}`);
        if (tagDate) {
            searchArg = `--search "merged:>=${tagDate.split('T')[0]}"`;
        }
    }

    const cmd = `gh pr list ${baseArgs} ${searchArg} --limit 100`;
    const result = exec(cmd);

    if (!result) {
        console.error(`${c.red}Failed to fetch PRs.${c.reset} Is GitHub CLI (gh) installed and authenticated?`);
        process.exit(1);
    }

    const prs = JSON.parse(result);

    // Filter out PRs merged before the tag if we have one
    if (sinceTag) {
        const tagDate = exec(`git log -1 --format=%aI ${sinceTag}`);
        if (tagDate) {
            return prs.filter(pr => new Date(pr.mergedAt) > new Date(tagDate));
        }
    }

    return prs;
}

function getFirstLineOfBody(body) {
    if (!body) {
        return null;
    }
    const lines = body.split('\n').filter(line => line.trim());
    return lines[0]?.trim() || null;
}

function getPRLabel(pr) {
    const labelNames = pr.labels.map(l => l.name);
    for (const label of CHANGELOG_LABELS) {
        if (labelNames.includes(label)) {
            return label;
        }
    }
    return null;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}

function recommendVersion(currentVersion, prs) {
    const [major, minor, patch] = currentVersion.split('.').map(Number);

    const hasBreaking = prs.some(pr => getPRLabel(pr) === 'Breaking');
    const hasFeature = prs.some(pr => getPRLabel(pr) === 'Feature');

    if (hasBreaking) {
        return `${major + 1}.0.0`;
    } else if (hasFeature) {
        return `${major}.${minor + 1}.0`;
    } else {
        return `${major}.${minor}.${patch + 1}`;
    }
}

function generateChangelog(version, prs) {
    const today = new Date().toISOString().split('T')[0];
    const sections = {
        Breaking: [],
        Feature: [],
        Bugfix: [],
        Other: []
    };

    for (const pr of prs) {
        const label = getPRLabel(pr) || 'Other';
        const description = getFirstLineOfBody(pr.body) || pr.title;
        const mergeDate = formatDate(pr.mergedAt);
        sections[label].push(`- ${description} (#${pr.number}) - ${mergeDate}`);
    }

    let changelog = `## [${version}] - ${today}\n`;

    if (sections.Breaking.length > 0) {
        changelog += '\n### Breaking Changes\n';
        changelog += sections.Breaking.join('\n') + '\n';
    }

    if (sections.Feature.length > 0) {
        changelog += '\n### Features\n';
        changelog += sections.Feature.join('\n') + '\n';
    }

    if (sections.Bugfix.length > 0) {
        changelog += '\n### Bug Fixes\n';
        changelog += sections.Bugfix.join('\n') + '\n';
    }

    if (sections.Other.length > 0) {
        changelog += '\n### Other\n';
        changelog += sections.Other.join('\n') + '\n';
    }

    return changelog;
}

function updateChangelog(newEntry) {
    const changelogPath = join(ROOT_DIR, 'CHANGELOG.md');

    if (!existsSync(changelogPath)) {
        writeFileSync(changelogPath, `# Changelog\n\n${newEntry}`);
    } else {
        const content = readFileSync(changelogPath, 'utf-8');
        const lines = content.split('\n');
        const headerIndex = lines.findIndex(line => line.startsWith('# '));

        if (headerIndex !== -1) {
            lines.splice(headerIndex + 1, 0, '', newEntry);
            writeFileSync(changelogPath, lines.join('\n'));
        } else {
            writeFileSync(changelogPath, `# Changelog\n\n${newEntry}\n${content}`);
        }
    }
}

function updatePackageVersions(version) {
    for (const relPath of PACKAGE_PATHS) {
        const pkgPath = join(ROOT_DIR, relPath);
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        pkg.version = version;
        writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');
    }
}

function prompt(question) {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

function showHelp() {
    console.log(`
Usage: node scripts/release.js [options] [version]

Options:
  --dry-run    Preview changes without modifying files
  --ci         Non-interactive mode (use with version argument)
  --help       Show this help message

Examples:
  pnpm release:prepare --dry-run     Preview the release
  pnpm release:prepare               Interactive release
  pnpm release:prepare --ci 1.0.0    Non-interactive with specific version
`);
}

async function main() {
    if (process.argv.includes('--help')) {
        showHelp();
        process.exit(0);
    }

    if (dryRun) {
        console.log(`\n${c.yellow}${c.bold}[DRY RUN MODE]${c.reset}\n`);
    }

    // Get latest tag and current version
    const latestTag = getLatestTag();
    const currentVersion = getCurrentVersion();

    console.log(`${c.dim}Current version:${c.reset} ${c.bold}${currentVersion}${c.reset}`);
    console.log(`${c.dim}Latest tag:${c.reset} ${c.bold}${latestTag || '(none)'}${c.reset}\n`);

    // Fetch PRs
    console.log(`${c.cyan}Fetching merged PRs${latestTag ? ` since ${latestTag}` : ''}...${c.reset}`);
    const prs = getMergedPRs(latestTag);

    if (prs.length === 0) {
        console.log(`\n${c.yellow}No merged PRs found since last release.${c.reset}`);
        process.exit(0);
    }

    // Display PRs
    console.log(`\n${c.cyan}Found ${c.bold}${prs.length}${c.reset}${c.cyan} PR(s):${c.reset}\n`);

    for (const pr of prs) {
        const label = getPRLabel(pr);
        const description = getFirstLineOfBody(pr.body) || pr.title;
        const shortDesc = description.length > 60 ? description.slice(0, 57) + '...' : description;

        if (label) {
            console.log(`  ${c.green}\u2713${c.reset} ${c.dim}#${pr.number}${c.reset} ${shortDesc} ${c.blue}(${label})${c.reset}`);
        } else {
            console.log(`  ${c.dim}\u2022 #${pr.number}${c.reset} ${shortDesc} ${c.dim}(Other)${c.reset}`);
        }
    }

    // Version recommendation
    const recommended = recommendVersion(currentVersion, prs);
    console.log(`\n${c.dim}Recommended version:${c.reset} ${c.green}${c.bold}${recommended}${c.reset}`);

    // Generate changelog preview
    const changelogEntry = generateChangelog(recommended, prs);
    console.log(`\n${c.cyan}── Changelog Preview ──${c.reset}`);
    console.log(`${c.dim}${changelogEntry}${c.reset}`);

    if (dryRun) {
        console.log(`${c.yellow}[DRY RUN]${c.reset} No changes made.\n`);
        console.log(`Run without ${c.bold}--dry-run${c.reset} to create the release.`);
        process.exit(0);
    }

    // Determine version (CI mode uses argument, interactive mode prompts)
    let newVersion;
    if (ciMode) {
        newVersion = versionArg || recommended;
        console.log(`\nUsing version: ${c.bold}${newVersion}${c.reset}`);
    } else {
        const inputVersion = await prompt(`\n${c.yellow}Enter new version${c.reset} [${c.bold}${recommended}${c.reset}]: `);
        newVersion = inputVersion.trim() || recommended;
    }

    // Validate version format (allow pre-release like 1.0.0-beta.1)
    if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(newVersion)) {
        console.error(`${c.red}Invalid version format.${c.reset} Use semver (e.g., 1.2.3 or 1.2.3-beta.1)`);
        process.exit(1);
    }

    // Regenerate changelog with actual version if different
    const finalChangelog = newVersion !== recommended
        ? generateChangelog(newVersion, prs)
        : changelogEntry;

    // Update files
    console.log(`\n${c.cyan}Updating files...${c.reset}`);
    updateChangelog(finalChangelog);
    updatePackageVersions(newVersion);

    // Pause to allow editing
    if (!ciMode) {
        console.log(`\n${c.green}Files updated:${c.reset}`);
        console.log(`  ${c.dim}-${c.reset} CHANGELOG.md`);
        console.log(`  ${c.dim}-${c.reset} packages/grid-lite-react/package.json`);
        console.log(`  ${c.dim}-${c.reset} packages/grid-pro-react/package.json`);
        console.log(`\n${c.yellow}Edit CHANGELOG.md now if needed.${c.reset}`);
        await prompt(`${c.dim}Press Enter to continue with commit...${c.reset}`);
    }

    // Git commit and tag
    console.log(`\n${c.cyan}Creating git commit...${c.reset}`);
    exec('git add CHANGELOG.md packages/*/package.json');
    exec(`git commit -m "Release v${newVersion}"`);

    console.log(`${c.cyan}Creating git tag ${c.bold}v${newVersion}${c.reset}${c.cyan}...${c.reset}`);
    exec(`git tag v${newVersion}`);

    console.log(`\n${c.green}${c.bold}\u2705 Release v${newVersion} prepared!${c.reset}\n`);
    console.log(`${c.cyan}Next steps:${c.reset}`);
    console.log(`  ${c.bold}1.${c.reset} Review:  ${c.dim}git show HEAD${c.reset}`);
    console.log(`  ${c.bold}2.${c.reset} Push:    ${c.dim}git push && git push --tags${c.reset}`);
    console.log(`  ${c.bold}3.${c.reset} Publish: ${c.dim}pnpm release${c.reset}`);
}

main().catch(err => {
    console.error(`${c.red}Error:${c.reset} ${err.message}`);
    process.exit(1);
});
