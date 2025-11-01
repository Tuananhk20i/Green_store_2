# Use Cases — Green Store

This document describes the primary actors and use cases for the Green Store project and provides the PlantUML file to render a use-case diagram.

Files
- `docs/use-case-diagram.puml` — PlantUML source for the use-case diagram.
- `docs/USE_CASES.md` — this file (descriptions, flows, rendering instructions).

Actors
- Guest (Unauthenticated): Browses site, searches, views product details, can open login/register. If attempts to add to cart, they are redirected to login.
- Customer (Authenticated user): All Guest capabilities plus add-to-cart, view cart, checkout, manage account, chat.
- Admin: Can manage products, manage orders, view revenue/reports, and access admin pages.

Primary Use Cases
1. Browse Products
   - Actor: Guest, Customer
   - Brief: Browse product listings (home, category pages, top selling, etc.)
   - Success: User sees product cards and can open product details.

2. Search Products
   - Actor: Guest, Customer
   - Brief: Search with suggestions and results.

3. View Product Details
   - Actor: Guest, Customer
   - Brief: See product information, price, promotions, and "Add to Cart" control.

4. Add to Cart
   - Actor: Customer (primary), Guest (alternate)
   - Brief: Add item(s) to current cart. If Guest attempts this, they are redirected to the login page.
   - Preconditions: For Checkout, user must be authenticated and cart non-empty.

5. View Cart
   - Actor: Customer
   - Brief: See cart items, update quantities, remove items.

6. Checkout
   - Actor: Customer
   - Brief: Provide shipping/payment details, place order.
   - Preconditions: Customer must be authenticated.

7. Login / Register
   - Actor: Guest, Customer
   - Brief: Authenticate or create account. After login, user may be redirected back to previous flow (e.g., adding an item).

8. Manage Account
   - Actor: Customer
   - Brief: View and edit addresses, orders, account details.

9. Chat / Contact
   - Actor: Guest, Customer
   - Brief: Quick contact or chat service.

10. Admin: Manage Products, Manage Orders, Reports
   - Actor: Admin
   - Brief: Admin screens for product CRUD, order processing, and revenue reporting.

Main success scenario for "Add to Cart" (Customer)
1. Customer clicks "Add to Cart" on product page or card.
2. Client calls cart API or updates local cart context.
3. Item is added; UI updates (mini-cart, toast, etc.).

Alternate flow: Guest tries to add to cart
1. Guest clicks "Add to Cart".
2. Client detects unauthenticated state OR server returns 401.
3. App navigates to `/login` (or opens auth modal). After successful login, optionally restore attempted action (e.g., re-add item).

Rendering the diagram
- Locally with PlantUML CLI (requires Java + PlantUML):

```powershell
# from project root (Windows PowerShell)
java -jar path\to\plantuml.jar docs\use-case-diagram.puml
# this generates PNG/SVG next to the .puml file
```

- Using VS Code: install the PlantUML extension, open `docs/use-case-diagram.puml`, and use preview.
- Online: paste the contents into https://www.plantuml.com/plantuml or other PlantUML renderers.

Notes / Next steps
- I included the key alternate flow you requested earlier: redirecting guests attempting to add to cart to `/login`.
- If you'd like, I can:
  - Generate an SVG and add it to `docs/use-case-diagram.svg`.
  - Expand the diagram to include more admin sub-cases (promotions, installers) or sequence diagrams for critical flows (checkout, login+restore-add-to-cart).
