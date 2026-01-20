# Changelog

## [1.0.0] - 2026-01-20

### Features
- Standardize on `Grid` as the primary export instead of `GridLite`/`GridPro` (#10) - 2026-01-20
- Add release automation with versioning, tagging, and changelog generation (#9) - 2026-01-08
- This PR introduces smoke tests for both `@highcharts/grid-lite-react` and `@highcharts/grid-pro-react`. It refactors the shared test utilities to support dynamic option updates and significantly improves the robustness of the `useGrid` hook to handle initialization race conditions. (#8) - 2026-01-12


## [0.2.0] - 2025-12-16

### Bug Fixes
- Fixed TypeScript declarations not resolving correctly when importing from the package (#7)

### Other
- Added Next.js integration examples (#5)
- Improved documentation and code snippets (#6)

## [0.1.0] - 2025-12-08

### Features
- Initial release of `@highcharts/grid-lite-react` and `@highcharts/grid-pro-react`
- React component wrappers for Highcharts Grid with full TypeScript support
- Ref forwarding for direct grid instance access
