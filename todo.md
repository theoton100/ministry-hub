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

## SEO Fixes - Homepage
- [x] Add meta description (50-160 characters)
- [x] Add meta keywords
- [x] Fix missing alt text on images

## Bug Fixes - Round 3
- [x] Fix admin login not redirecting to dashboard on published site (trust proxy + cookie sameSite fix)
- [x] Add PDF file upload for digital books (admin can upload PDF per book)
- [x] Add download-after-payment flow (customers download PDF only after successful payment)
- [x] Make it clear on Store page that customers are paying to download digital products
- [x] Update AdminBooks with PDF upload UI and file preview
- [x] Update Store page with "Digital Download" badges and "Buy & Download" buttons
- [x] Update PaymentVerify page with download section for book purchases
- [x] Add getDownloadUrl procedure that verifies payment before allowing download
- [x] Write vitest tests for PDF upload and download features (4 new tests)
- [x] All 38 tests passing

## Bug Fixes - Round 4: Routing Restructure (FINAL FIX)
- [x] Update AdminGuard to accept children prop
- [x] Move all admin routes from Admin.tsx to App.tsx (Option A)
- [x] Simplify Admin.tsx to just render empty component
- [x] All navigation links work (routes unchanged)
- [x] All 38 tests passing
- [x] /admin/blog/new route now properly handled in App.tsx

## Apple Pay Integration (Paystack)
- [x] Add Apple merchant ID domain association file to .well-known directory

## Color & Currency Updates
- [ ] Change all red (#FF0000, #DC143C, #E53935, etc.) to gold (#FFD700 or similar)
- [ ] Update currency from USD to Ghana cedis (GHS) in Store page
- [ ] Update currency from USD to Ghana cedis (GHS) in Give page
- [ ] Update Paystack initialization to use GHS currency code
- [ ] Update price displays to show GHS symbol (₵) instead of $ or USD
- [ ] Test Store and Give pages with GHS prices

## Button Text & Background Color Fixes
- [x] Remove all hardcoded text-white from Button components across all pages
- [x] Fix all hardcoded black/dark backgrounds to #201c1d
- [x] Fix form background colors to #201c1d instead of black

## Remaining Black Background Fixes
- [x] Audit and fix ALL remaining black/dark backgrounds (divs, cards, boxes, inputs, sections) to #201c1d

## Nav Icon & UX Improvements
- [x] Fix red hamburger/mobile menu icon color to white/gold
- [x] Improve UX: add scroll animations, hover effects, transitions across pages
- [x] Add micro-interactions on cards and buttons
- [x] Improve homepage sections with animated entry effects

## Color Redesign (Vusi Thembekwayo Premium Palette)
- [x] Crop logo to remove excess sides
- [x] Extract exact colors from Vusi's site (navy, purple, orange, cream)
- [x] Update all CSS variables to new palette
- [x] Fix footer logo display
- [x] Audit all components for contrast and readability
- [x] Verify no white-on-white or poor contrast anywhere
- [x] Test all pages for design consistency


## Complete Site Redesign - Vusi Thembekwayo Layout Structure
- [x] Redesign homepage with hero + featured speaker section + testimonials grid + impact highlights
- [x] Redesign Watch page with featured sermon hero + sermon grid
- [x] Redesign Blog page with featured post + blog grid
- [x] Redesign About page with pastor profile + ministry pillars
- [x] Redesign Give page with impact section and donation form
- [x] Add testimonials section to homepage (grid of 4 testimonials)
- [x] Add impact/statistics section to homepage
- [x] Update Navbar with premium design and orange CTA
- [x] Update Footer with premium design and social links
- [x] Verify all pages have proper spacing, hierarchy, and visual consistency


## Design Refinement - Match Vusi's Premium Aesthetic Accurately
- [x] Audit all pages and remove non-Vusi colors (#d78e00, etc.)
- [x] Use only Vusi colors: #0a0e27 (navy), #6b2d9e (purple), #ff8c42 (orange), #f5f1e8 (cream), white
- [x] Redesign navbar/header to match Vusi's elegant style (cleaner, more refined)
- [x] Reduce font-weight across all pages (less bold, more sophisticated)
- [x] Remove testimonials section from homepage
- [x] Refine overall design for premium, fancy appearance
- [x] Test all pages for consistency and elegance


## Color Correction - Match Vusi's Actual Aesthetic
- [x] Update CSS with correct Vusi colors: black (#000000 or #1a1a1a), NOT navy
- [x] Add orange-to-purple gradient header banner (#ff8c42 → #8b5cf6)
- [x] Update all backgrounds from navy to black
- [x] Add beige/cream card sections (#f5f1e8) for contrast
- [x] Update button colors to orange with purple gradients
- [x] Redesign navbar with gradient banner
- [x] Update homepage with black backgrounds and proper spacing
- [x] Update Watch, Blog, About, Give pages with correct colors
- [x] Verify all text contrast and readability


## Button Color Fix - Orange-to-Purple Gradient
- [x] Update all primary buttons to orange-to-purple gradient
- [x] Update button text to white
- [x] Update button hover states with gradient effects
- [x] Update CTA buttons across all pages
- [x] Test button colors on all pages


## Complete Redesign - Match Vusi's Actual Aesthetic
- [x] Increase logo size in navbar (make it much larger and more prominent)
- [x] Remove featured speaker image from core message section
- [x] Redesign homepage with asymmetric layouts (text-first approach)
- [x] Add beige/cream card sections like Vusi's podcast cards
- [x] Redesign Watch/Podcast pages with card grid layout
- [x] Simplify Give page: remove detailed expense breakdown
- [x] Refine spacing and typography across all pages
- [x] Test all pages for design consistency


## Color Scheme Redesign - Match Vusi's Layout
- [ ] Remove black backgrounds from all content sections (keep only header, footer, hero)
- [ ] Update Featured Speaker section to white/cream background
- [ ] Update Blog page with featured article and card grid layout
- [ ] Update Books/Store page with beige card backgrounds
- [ ] Redesign Footer to match Vusi's layout (organized columns)
- [ ] Update all pages with proper color sections
- [ ] Test all pages for design consistency


## Text Size Reduction - Smaller, Refined Typography
- [ ] Reduce all heading sizes (no text-5xl, text-6xl)
- [ ] Reduce body text sizes for compact layout
- [ ] Update Home page with smaller text
- [ ] Update Blog page with smaller text
- [ ] Update Books/Store page with smaller text
- [ ] Update all pages for consistent smaller typography

## Color Palette Fix - Learn from Vusi's Exact Colors
- [x] Fix navbar menu text from orange to white
- [x] Change body section backgrounds from white to light gray (#f3f1ed or #f5f1e8)
- [x] Remove orange text accents from body sections
- [ ] Update hero section styling to match Vusi's design
- [ ] Ensure all text hierarchy uses white/gray, not orange
- [ ] Test all pages with correct color scheme

## Remove All Orange Text Colors (Match Vusi's Shop Page)
- [x] Remove orange text from Home.tsx (section labels, icons, hover states)
- [x] Remove orange text from Watch.tsx (section labels, icons, hover states)
- [x] Remove orange text from Blog.tsx (section labels, icons, hover states)
- [x] Remove orange text from About.tsx (section labels, icons, hover states)
- [x] Remove orange text from Give.tsx (section labels, icons, hover states)
- [x] Remove orange text from Footer.tsx (hover states on links)
- [ ] Remove orange text from Admin pages (AdminOverview.tsx, AdminBooks.tsx)
- [x] Verify all text is now black or gray (no orange text anywhere except buttons)

## Design Improvements - Vusi Shop Page & Homepage Fixes
- [x] Apply Vusi's shop design to Books/Store page (beige card backgrounds, dark image containers)
- [x] Fix homepage blog boxes to match section background color (#f5f1e8)
- [x] Remove unwanted hover effects/borders on homepage blog boxes
- [x] Redesign Podcast page to match Vusi's aesthetic (black header, white content sections)


## Discipleship Platform Redesign - Conversion & Income Focus
- [x] Redesign homepage hero: "Faith Was Never Meant to Feel Confusing" headline
- [x] Add Problem section: "If this feels familiar..." with 4 pain points
- [x] Add Solution section: "You don't need more pressure. You need structure."
- [x] Create Pathway section: 3-step visual journey (Reset → Structure → Stability)
- [x] Create 7-Day Reset section with Mailchimp signup CTA
- [x] Create Structured Walk System offer section with Paystack payment
- [x] Add "How It Works" section (4-step WhatsApp delivery process)
- [x] Update About section to focus on mission, not biography
- [x] Add final CTA section: "Stop Restarting Your Spiritual Life"
- [x] Create Checkout page for Structured Walk System
- [x] Wire up tRPC payment initialization procedure
- [ ] Test Mailchimp integration for free reset
- [ ] Test Paystack integration for Structured Walk System
- [ ] Verify WhatsApp group link delivery after payment
- [ ] Design 7-Day Reset PDF (Canva)
- [ ] Create audio teachings for Structured Walk System


## 7-Day Reset Download Page (No Mailchimp Automation)
- [x] Create ResetDownload.tsx page with PDF download link
- [x] Add route to App.tsx for /reset-download
- [x] Update Home.tsx to redirect after successful signup
- [x] Test complete signup → download flow
- [x] Verify PDF downloads correctly

## Bug Fixes
- [x] Fix "Start 7-Day Reset" button in hero section - now scrolls to form


## Contact Page
- [x] Create Contact.tsx page with contact form
- [x] Add tRPC handler for contact form submission
- [x] Add Contact route to App.tsx
- [x] Add Contact link to navigation menu
- [x] Test contact form submission


## Post-Payment Automation
- [x] Send email to pastor with customer details after Structured Walk System payment
- [x] Include name, email, and WhatsApp number in the notification
- [x] Test payment flow and email delivery


## Light Mode Redesign - Rick Warren Daily Hope Aesthetic
- [ ] Update CSS variables: light backgrounds, yellow (#FFD700), orange (#FF8C00), cyan (#00BCD4), blue (#2196F3)
- [ ] Update ThemeProvider to light mode
- [ ] Redesign homepage: white background, colorful cards, yellow CTAs
- [ ] Update Blog page to light mode with colorful cards
- [ ] Update Books/Store page to light mode
- [ ] Update Podcast page to light mode
- [ ] Update About page to light mode
- [ ] Update Contact page to light mode
- [ ] Update Navbar to light mode with yellow DONATE button
- [ ] Update Footer to match Rick Warren aesthetic
- [ ] Test all pages for contrast and readability
