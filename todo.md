# Ministry Hub - Project TODO

## Design & Setup
- [x] Design system (colors, fonts, theme)
- [x] Database schema for blog posts, sermons, podcasts
- [x] Project file structure and routing

## Public Pages
- [x] Homepage with hero section (latest sermon, warm uplifting design)
- [x] Responsive navigation (Watch, Listen, Blog, Newsletter, About)
- [x] Watch page (YouTube sermon player + archive)
- [x] Listen page (Spotify podcast player)
- [x] Blog listing page (excerpts, featured images)
- [x] Individual blog post page (full content)
- [x] Newsletter signup (Mailchimp integration)
- [x] About page (Pastor Theo bio, ministry vision)
- [x] Footer with social links

## Admin Dashboard
- [x] Admin authentication (role-based access)
- [x] Blog post editor (create, edit, publish)
- [x] Sermon management (add YouTube video links)
- [x] Podcast episode management
- [ ] Google Drive integration for blog storage

## Integrations
- [x] YouTube embed player
- [x] Spotify embed player
- [x] Mailchimp newsletter form
- [ ] Google Drive API for content storage

## Quality
- [x] Fully responsive design (mobile, tablet, desktop)
- [x] Vitest unit tests
- [x] Polish and final review

## Image Updates
- [x] Upload Pastor Theo's real photos and logo to CDN
- [x] Generate enhanced hero image using nano banana with real photos
- [x] Update website with real pastor photo on About page
- [x] Update website logo/branding with real logo
- [x] Add real photos throughout the site (homepage, about, etc.)

## Bug Fixes
- [x] Fix sermon.featured query returning undefined when no sermons exist (causes TanStack Query error)

## Redesign - Joel Osteen Style
- [x] Change ministry name to T.I. Solomon throughout the site
- [x] Redesign color scheme to dark navy/blue theme matching Joel Osteen
- [x] Rebuild homepage with content-dense sections (hero, newsletter inline, featured message, book/resource, sermon cards, community, social media embeds)
- [x] Redesign Navbar with dark theme and Joel Osteen-style navigation
- [x] Redesign Footer with dense multi-column layout
- [x] Update all pages (Watch, Listen, Blog, About, Newsletter) with new dark theme
- [x] Add Instagram/social media embed section on homepage
- [x] Update admin dashboard to match new branding

## Full Rebuild - Pastor Theo Feedback
- [x] Change font to Open Sans only (remove Playfair Display / all serif fonts)
- [x] Upload torch logos (light + dark) to CDN
- [x] Use torch logos in navbar and footer (light for dark bg, dark for light bg)
- [x] Remove ALL pastor photos and generated images from the site
- [x] Rebuild homepage: clean layout with buttons linking to each page (Watch, Listen, Blog, About, Newsletter)
- [x] Ensure every menu item has its own dedicated page
- [x] Update all pages to use Open Sans only

## Hero Image Update
- [x] Add Pastor Theo's preaching photo as hero section background image

## NASA.gov-Inspired Redesign
- [x] Update color scheme: dark black/charcoal bg, red brand accent (like NASA red), white text
- [x] Update typography: bold, spacious, editorial style with Open Sans
- [x] Remove all icons from buttons — text-only buttons
- [x] Redesign homepage with NASA-style editorial grid layout
- [x] Redesign navbar: minimal, clean, NASA-style
- [x] Redesign footer: clean multi-column like NASA
- [x] Update all pages (Watch, Listen, Blog, About, Newsletter) with new design
- [x] Update admin dashboard sidebar to match new brand colors

## Spotify Integration
- [x] Embed Pastor Theo's Spotify show (06RqL9JBCkhSPxAumdfY5l) on the Podcast page
- [x] Add Spotify show link to homepage and footer

## Admin Security & UI
- [x] Remove Admin link from the navbar
- [x] Add secret admin link on the footer logo
- [x] Add email/password login for admin (theoton100@gmail.com)
- [x] Secure admin dashboard behind login

## Mailchimp Integration
- [x] Connect Mailchimp API for newsletter subscribers
- [x] Send email notifications to subscribers when a new blog post is published

## Spotify Episodes
- [x] Show each individual Spotify episode on the Podcast page (not just the show embed)

## Bug Fixes - Round 2
- [x] Fix admin login not redirecting to dashboard after successful sign-in (cookie parsing fix)
- [x] Remove hardcoded podcast episodes from Listen page (let admin add them)

## Paystack Payment Integration (replacing Stripe — not available in Ghana)
- [x] Configure Paystack secret and public keys
- [x] Add Paystack payment initialization API routes
- [x] Create public-facing donation/give page with Paystack checkout
- [x] Create public-facing books/store page with Paystack checkout

## Podcast Page Cleanup
- [x] Remove all hardcoded Spotify links and embeds from Listen page
- [x] Only show episodes added by admin from the dashboard

## Books & Donations Feature
- [x] Add books and orders tables to database schema
- [x] Create admin book management page (add/edit/delete books with price in USD)
- [x] Create public Books/Store page displaying books with prices
- [x] Create Donations/Give page with preset and custom donation amounts
- [x] Integrate Paystack checkout for book purchases
- [x] Integrate Paystack checkout for donations
- [x] Add Paystack callback handler for payment verification
- [x] Add Books and Give to navigation menu
- [x] Clean up Listen page (already database-driven only)
- [x] Fix AdminGuard import error
- [x] Add Books and Orders to admin dashboard sidebar
- [x] Add Orders page with revenue summary
- [x] Add Books/Orders stats to admin overview
- [x] Write vitest tests for books and payments (12 tests)
