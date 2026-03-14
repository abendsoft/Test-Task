# Test Task — Dawn-based Shopify theme

This repo is a customisation of the **Dawn** theme for Shopify. It’s set up so you can develop locally, push to a GitHub repo, and deploy to a development store via Shopify CLI and an optional CI pipeline.

## What’s in here

- **Base:** [Dawn](https://github.com/Shopify/dawn) (Shopify’s reference theme).
- **Filters:** Collection and search filtering use **Shopify’s Search & Discovery app**. The filter UI is built with the storefront Filter API; filter definitions (which facets appear, product filters, etc.) are managed in the Shopify admin via **Search & Discovery**. Make sure the app is installed and filters are configured for your collections.
- **Front-end:** The theme uses **Web Components** (Custom Elements) for things like facet filters, cart drawer, modals, and menus. You’ll see tags like `<facet-filters-form>`, `<price-range>`, `<menu-drawer>`, etc. Reference: [Using custom elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).
- **Loading:** CSS and JS are split so that section-specific assets (e.g. collection filters, quick add, cart drawer, predictive search) load only when those sections or features are used. Global scripts stay in the layout; the rest are included per section or via theme settings.

The theme is responsive and works on mobile; layout and components follow Dawn’s existing breakpoints and patterns.

## Local development

1. **Clone and open the repo**
   ```bash
   git clone https://github.com/abendsoft/Test-Task.git
   cd Test-Task
   ```

2. **Install Shopify CLI** (if you haven’t already)  
   See: [Shopify CLI installation](https://shopify.dev/docs/themes/tools/cli/install).

3. **Point at your development store**
   - Either set `store` (and optionally `theme`) in `shopify.theme.toml` under `[environments.development]`, or pass the store each time.
   - For a **Theme Access** password (needed for push/pull), use the [Theme Access](https://apps.shopify.com/theme-access) app in the store and create a password. Don’t commit this; use env vars or a local config.

4. **Run the dev server**
   ```bash
   shopify theme dev
   ```
   Use the URL it prints to preview the theme on your dev store.

5. **Push to the store when you’re ready**
   ```bash
   shopify theme push
   ```
   Use `--theme <id>` if you’re not using `shopify.theme.toml`, and `--store` if needed.

## Deploying with the pipeline (GitHub Actions)

The workflow in `.github/workflows/deploy-theme.yml` pushes this theme to your Shopify store when you push to the `main` branch (or when you run the workflow manually).

**Setup:**

1. **Theme Access password**  
   In your Shopify admin, install the Theme Access app, create a theme access password, and copy it.

2. **GitHub secrets**  
   In the repo: **Settings → Secrets and variables → Actions**, add:
   - `SHOPIFY_CLI_THEME_TOKEN` — the Theme Access password from step 1.
   - `SHOPIFY_FLAG_STORE` — your store’s myshopify.com hostname (e.g. `my-dev-store` for `my-dev-store.myshopify.com`).

3. **Push to `main`**  
   Pushing to `main` runs the workflow and runs `shopify theme push` with those secrets. The first run will create or update the theme linked to the CLI; you can also pass a theme ID in the workflow if you want to target a specific theme.

If you prefer not to use GitHub Actions, you can run `shopify theme push` locally or from another CI system using the same env vars (`SHOPIFY_CLI_THEME_TOKEN`, `SHOPIFY_FLAG_STORE`, and optionally `SHOPIFY_FLAG_FORCE=1`).

## Search & Discovery (filters)

Collection and search results use Shopify’s native filtering:

- **Search & Discovery** in the admin is where you define which filters exist (e.g. product type, vendor, price, metafields). Install it from the Shopify App Store if it’s not already on the store.
- The theme only renders the filters that Shopify exposes via the Storefront API (e.g. `collection.filters` in Liquid). No extra app is required for the front-end; the theme is already wired to use `results.filters` and the facet components.

So: **filters are driven by Shopify’s Search & Discovery app**; the theme just displays and updates them.

## Repo and license

- **GitHub:** [abendsoft/Test-Task](https://github.com/abendsoft/Test-Task.git)
- Dawn is licensed under the MIT License; any customisations in this repo follow the same unless stated otherwise.

If you hit issues, check that the development store has Search & Discovery set up and that Theme Access (and the token in GitHub secrets) is correct for the store you’re pushing to.
