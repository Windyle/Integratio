# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

> __You can follow the development on Trello: https://trello.com/b/yc077fT2/integratio__

## [Unreleased] - yyyy-mm-dd

### Added

- First Layout of the application
- Creatio Instance Management
  - Import from filesystem
  - Save to local db
  - Import from local db on startup
- Instance Treeview Generation
- Post Request to Creatio with "blank" base url of the selected entity
  - Random Body Filler
  - Body Reset
  - Body local save for easier access
  - Load saved body
- Get Filters generator
  - Filters local save for easier access
- Populated lookup for picking inherited columns from metadata for the following objects:
  - Account
  - AccountIndustry
  - Activity
  - AddressType
  - Case
  - CaseCategory
  - Contact
  - Invoice
  - InvoicePayment
  - Lead
  - Opportunity
  - OpportunityProductInterest
  - Order
  - OrderDeliveryStatus
  - OrderProduct
  - PaymentType
  - Product
  - ProductCategory
  - SocialMessage

### Changed

### Fixed
