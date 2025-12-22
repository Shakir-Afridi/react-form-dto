# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2025-12-22

### Fixed

- Fixed onChange issue for Radio Button field

### Added

- Added new `handleChangeCallback` prop to FormBuilder component
  - Optional callback method that is invoked on every field change
  - Only called when the method is provided
  - Receives field ID and value as parameters

## [1.0.2] - 2025-12-21

### Added

- **visibleWhen functionality**: Added conditional visibility support for form fields
  - Fields can now be conditionally shown/hidden based on other field values
  - Supports complex visibility conditions and dependencies
- Comprehensive documentation for visibleWhen feature
  - Usage examples and best practices
  - API reference for visibility configuration

### Documentation

- Updated README with visibleWhen examples
- Added detailed guide for conditional field visibility
