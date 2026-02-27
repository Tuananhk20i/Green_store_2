# Diagrams — Sequence & Activity

This file describes the two new diagrams added for the Green Store project.

Files added
- `docs/sequence-add-to-cart.puml` — Sequence diagram describing the Add to Cart flow for both Guest and Authenticated users. It shows how the client saves a pending add, navigates to `/login`, restores the action after successful authentication, and replays the API call.
- `docs/activity-checkout.puml` — Activity diagram describing the Checkout flow: cart check, authentication requirement, address selection, payment, order creation, and error/retry loops.

Why these diagrams
- Sequence diagram: clarifies client and server interactions during Add to Cart when the user is not logged in. Useful for implementing the UX where guests are redirected to login and their pending action is preserved and replayed after login.
- Activity diagram: useful for checking decision points in checkout (cart empty, authenticated, payment success) and to plan UI states.

Rendering instructions
- Using PlantUML CLI (Java required):

```powershell
# from project root (Windows PowerShell)
java -jar path\to\plantuml.jar docs\sequence-add-to-cart.puml
java -jar path\to\plantuml.jar docs\activity-checkout.puml
# This generates PNG/SVG files in the same folder.
```

- VS Code: install a PlantUML extension, open the `.puml` file and use the preview pane.
- Online: paste the file contents into https://www.plantuml.com/plantuml or other PlantUML renderers.

Next steps / Offer
- I can generate SVG/PNG files now and add them to `docs/` (small, safe change). Tell me which format you prefer (SVG recommended).
- I can also add a sequence diagram for "Login → Restore Add → Checkout" or expand the activity diagram to include order status updates and admin approval steps.
