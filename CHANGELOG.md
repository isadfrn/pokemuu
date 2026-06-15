# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-15

First stable release of Pokémuu — a veterinary anatomical atlas of bovines in Pokémon-style card format.

### Added

- Initial project MVP with the full bovine anatomical atlas (328 cards across Muscles, Joints, Bones and Special categories).
- Docker infrastructure for containerized builds and deployment.
- VPS deployment script.
- Developer name credit in the footer.
- Light theme support, set as the default theme.
- Roadmap section.
- Adjusted card numbering.
- English version of the README.

### Changed

- Converted card images to WebP for improved performance.

### Fixed

- Escaped quotes in the empty state message.
- Added Buildx setup to enable GitHub Actions cache support.
