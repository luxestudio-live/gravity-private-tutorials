# Gravity Private Tutorials — Website Feature List

## 1) Core Website Experience
- Fully responsive website (mobile, tablet, desktop)
- Modern branded UI aligned with institute identity
- Fast-loading pages with smooth navigation
- Public pages for Home, About, Courses, Faculty, Results, Gallery, and Contact

## 2) Homepage Features
- Hero slideshow (desktop/tablet) with auto-rotating banners
- Mobile-optimized hero behavior and readability
- Dynamic announcement top bar (auto-rotating, looped)
- Dynamic featured updates section below hero
  - Shows only when active content exists
  - Rotates one featured item at a time
  - Auto fallback image if no image uploaded

## 3) Courses & Academic Presentation
- Structured course sections for 8th–10th and 11th–12th
- Board-specific and entrance-focused positioning
- Clear batch/course cards with key highlights

## 4) Faculty Management + Public Display
- Admin can add/edit/delete faculty entries
- Faculty data is fully dynamic from database
- No hardcoded fallback faculty on public page
- Public faculty page always reflects latest admin updates

## 5) Gallery Management + Public Display
- Admin can upload/manage gallery images
- Public gallery dynamically reads managed entries
- No hardcoded default gallery items
- Uploaded images are preserved and displayed correctly

## 6) Results System (Topper-Focused)
- Four fixed categories:
  - CBSE 10th Toppers
  - ICSE 10th Toppers
  - HSC 12th Toppers
  - Star Achievers (NEET/JEE/CET)
- Admin-driven result records
- Top 10 limit per category
- Position-based ordering (manual position control)
- Duplicate position prevention within same category

## 7) Announcements System
- Dedicated admin section to manage announcements
- Add/edit/delete announcements with display order + active toggle
- Public top bar auto-hides when no active announcements
- Active announcements rotate in loop automatically

## 8) Featured Campaign/Event System
- Dedicated admin section for featured campaigns/events
- Supports title, description, image, CTA text, CTA link, order, active toggle
- Auto-hide on homepage when no active featured items
- Uniform display behavior with controlled content length

## 9) Contact & Lead Capture
- Contact form with validation
- Firestore storage for submissions
- Admin contacts view for lead management
- Integrated quick-contact actions (call/WhatsApp)
- Embedded map and social links

## 10) App Promotion Integration
- Google Play app CTA integrated on:
  - Homepage
  - Courses page
  - Contact page
- Updated app naming and link consistency

## 11) Admin Panel Experience
- Protected admin routes with authentication checks
- Sidebar-driven management UI
- Dashboard with quick actions and stats overview
- Improved desktop/mobile admin usability

## 12) Media & Cloud Integrations
- Firebase (Auth + Firestore) for secure data/auth flows
- Cloudinary-based media upload integration
- Environment-driven configuration

## 13) Security & Config Readiness
- Environment variable based setup
- No hardcoded Firebase app config in code
- Firestore rules pattern supports public read + admin write model (collection-wise)

## 14) Deployment & Operations
- Production deployed on Vercel
- Ongoing updates deployable quickly via Vercel CLI
- Production alias configured and active

---

## Suggested Client Value Summary
This website is not just informational — it is a complete admission-focused, trust-building, and operationally manageable platform where non-technical staff can keep content current in real time through the admin panel.
