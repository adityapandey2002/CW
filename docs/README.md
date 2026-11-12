# Documentation Index — Consultancy Wala

This directory contains the technical documentation for the **Consultancy Wala** marketing website. All documents are derived from the actual repository contents; where a fact could not be verified from the code, it is explicitly marked.

## Document Map

| # | Document | Description |
|---|----------|-------------|
| — | [README.md](../README.md) | Project README (root) |
| 01 | [01-project-overview.md](./01-project-overview.md) | What the project is, who it is for, value proposition |
| 02 | [02-technology-stack.md](./02-technology-stack.md) | Languages, frameworks, libraries actually used |
| 03 | [03-project-structure.md](./03-project-structure.md) | Directory tree and module layout |
| 04 | [04-system-architecture.md](./04-system-architecture.md) | Architecture, layers, data flow |
| 05 | [05-application-workflows.md](./05-application-workflows.md) | End-to-end user and system workflows |
| 06 | [06-modules-and-features.md](./06-modules-and-features.md) | Module-by-module analysis |
| 07 | [07-database-documentation.md](./07-database-documentation.md) | Database (none used) |
| 08 | [08-api-documentation.md](./08-api-documentation.md) | Server actions and HTTP surface |
| 09 | [09-authentication-and-authorization.md](./09-authentication-and-authorization.md) | Auth (none implemented) |
| 10 | [10-configuration-and-environment.md](./10-configuration-and-environment.md) | Config and environment variables |
| 11 | [11-installation-and-setup.md](./11-installation-and-setup.md) | Local setup steps |
| 12 | [12-development-guide.md](./12-development-guide.md) | Developer workflow |
| 13 | [13-testing-and-quality.md](./13-testing-and-quality.md) | Testing and linting |
| 14 | [14-deployment-and-infrastructure.md](./14-deployment-and-infrastructure.md) | Deployment |
| 15 | [15-security-documentation.md](./15-security-documentation.md) | Security posture |
| 16 | [16-error-handling-and-logging.md](./16-error-handling-and-logging.md) | Error handling and logging |
| 17 | [17-integrations-and-third-party-services.md](./17-integrations-and-third-party-services.md) | External integrations |
| 18 | [18-maintenance-and-troubleshooting.md](./18-maintenance-and-troubleshooting.md) | Maintenance and troubleshooting |
| 19 | [19-performance-and-scalability.md](./19-performance-and-scalability.md) | Performance and scalability |
| 20 | [20-future-improvements.md](./20-future-improvements.md) | Future improvements |
| AI | [AI_AGENT_CONTEXT.md](./AI_AGENT_CONTEXT.md) | Context for future AI coding agents |

## Diagrams

- [diagrams/system-architecture.md](./diagrams/system-architecture.md)
- [diagrams/application-flow.md](./diagrams/application-flow.md)
- [diagrams/database-er-diagram.md](./diagrams/database-er-diagram.md)
- [diagrams/deployment-architecture.md](./diagrams/deployment-architecture.md)

## Conventions

- File paths are relative to the repository root.
- "Not verified from the current repository." is used when evidence is missing.
- No application source code was modified to produce this documentation.

## Validating This Documentation

```bash
node scripts/validate-docs.mjs
```

The script (zero external dependencies) checks that every relative Markdown link resolves, code fences are balanced, Mermaid blocks are structurally valid, and no documentation file is empty.