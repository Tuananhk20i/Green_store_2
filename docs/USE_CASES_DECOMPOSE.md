# Use Case — Decomposed by Actor

This document lists the decomposed use-cases for each actor and points to the PlantUML diagrams in `docs/`.

Files added
- `docs/use-case-guest.puml` — Guest (unauthenticated) use cases: browse, search, view product, chat, register/login, and add-to-cart redirect behavior.
- `docs/use-case-customer.puml` — Authenticated customer use cases: cart management, checkout, address/account management, orders.
- `docs/use-case-admin.puml` — Admin use cases: product/order/user/promotion management and reports.

How to render
- Install PlantUML or use VS Code PlantUML extension. Render any file, for example:

```powershell
# using plantuml.jar
java -jar path\to\plantuml.jar docs\use-case-customer.puml
```

Notes and suggestions
- Each per-actor diagram focuses on primary actions and preconditions. They are intentionally concise so you can include them in documentation or dev handoff notes.
- If you want, I can also generate a combined PDF or SVG for inclusion in documentation.

Next steps (optional)
- Expand each actor diagram with alternative and exception flows (e.g., payment failure, address missing).
- Generate PNG/SVG images and commit them to `docs/` for quick preview without PlantUML tooling.
