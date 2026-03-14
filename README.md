# Test Task — Dawn-based Shopify theme

This repo is a customisation of the **Dawn** theme for Shopify. It’s set up so you can develop locally, push to a GitHub repo, and deploy to a development store via Shopify CLI and an optional CI pipeline.

## What’s in here

- **Base:** [Dawn](https://github.com/Shopify/dawn) (Shopify’s reference theme).
- **Filters:** Collection and search filtering use **Shopify’s Search & Discovery app**. The filter UI is built with the storefront Filter API; filter definitions (which facets appear, product filters, etc.) are managed in the Shopify admin via **Search & Discovery**. Make sure the app is installed and filters are configured for your collections.
- **Front-end:** The theme uses **Web Components** (Custom Elements) for things like facet filters, cart drawer, modals, and menus. You’ll see tags like `<facet-filters-form>`, `<price-range>`, `<menu-drawer>`, etc. Reference: [Using custom elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).
- **Loading:** CSS and JS are split so that section-specific assets (e.g. collection filters, quick add, cart drawer, predictive search) load only when those sections or features are used. Global scripts stay in the layout; the rest are included per section or via theme settings.

The theme is responsive and works on mobile; layout and components follow Dawn’s existing breakpoints and patterns.

## Branching: main and staging

- **`main`** — production. Deploys to the store’s main theme (ID: `187032699252`) at [test-task-development.myshopify.com](https://test-task-development.myshopify.com/).
- **`staging`** — staging. Use this for testing before merging into `main`. Deploys to a separate staging theme (you set its ID in GitHub secrets).

**Workflow:**

1. Pull latest from `main`: `git checkout main && git pull`
2. Create or switch to `staging`: `git checkout staging` (or `git checkout -b staging` to create it from `main`)
3. Do your work on `staging`, commit and push. The pipeline deploys to the staging theme.
4. When ready, merge into `main`: e.g. open a Pull Request from `staging` → `main`, then merge. Pushing to `main` deploys to the production theme.

So: **develop on staging, then merge staging into main** when you’re happy with the changes.

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

- **Push to `main`** → workflow **Deploy to main (production)** pushes to theme `187032699252` on `test-task-development.myshopify.com`.
- **Push to `staging`** → workflow **Deploy to staging** pushes to your staging theme (using the theme ID in the `SHOPIFY_STAGING_THEME_ID` secret).

**Setup:**

1. **Theme Access password**  
   In your Shopify admin, install the [Theme Access](https://apps.shopify.com/theme-access) app, create a theme access password, and copy it.

2. **GitHub secrets**  
   In the repo: **Settings → Secrets and variables → Actions**, add:
   - `SHOPIFY_CLI_THEME_TOKEN` — the Theme Access password from step 1.
   - `SHOPIFY_FLAG_STORE` — `test-task-development` (your store’s myshopify.com subdomain).
   - `SHOPIFY_STAGING_THEME_ID` — theme ID of your **staging** theme. In Shopify Admin go to **Online Store → Themes**, duplicate the main theme, name it e.g. “Staging”, and copy its theme ID from the URL or theme options.

3. **Branches**  
   Pushing to `main` deploys to the production theme. Pushing to `staging` deploys to the staging theme.

If you prefer not to use GitHub Actions, you can run `shopify theme push` locally with the same env vars and `--theme <id>` for the theme you want to update.

## Search & Discovery (filters)

Collection and search results use Shopify’s native filtering:

- **Search & Discovery** in the admin is where you define which filters exist (e.g. product type, vendor, price, metafields). Install it from the Shopify App Store if it’s not already on the store.
- The theme only renders the filters that Shopify exposes via the Storefront API (e.g. `collection.filters` in Liquid). No extra app is required for the front-end; the theme is already wired to use `results.filters` and the facet components.

So: **filters are driven by Shopify’s Search & Discovery app**; the theme just displays and updates them.

## Repo and license

- **GitHub:** [abendsoft/Test-Task](https://github.com/abendsoft/Test-Task.git)
- Dawn is licensed under the MIT License; any customisations in this repo follow the same unless stated otherwise.

If you hit issues, check that the development store has Search & Discovery set up and that Theme Access (and the token in GitHub secrets) is correct for the store you’re pushing to.
