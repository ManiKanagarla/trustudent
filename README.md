# Trustudent

**Your Authentic Academic Identity**

Trustudent is a digital verification platform for academic identity — covering ID, education, employment, and background verification for colleges, universities, and enterprises.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Pages & Sections](#pages--sections)
- [Services Offered](#services-offered)
- [Tech Stack](#tech-stack)
- [Current Status](#current-status)
- [Pending Items](#pending-items)
- [GoDaddy Deployment Guide](#godaddy-deployment-guide)
- [Contact Form](#contact-form)

---

## Overview

Trustudent is a single-page marketing website presenting the Trustudent verification platform to potential clients — institutions, employers, and enterprises. Fully static except for the PHP-based contact form.

Key highlights:
- 100% digital and paperless
- 24/7 verification uptime
- Average check time under 60 seconds
- Global coverage

---

## Project Structure

```
trustudent/
├── index (2).html   # Main single-page website (rename to index.html before deploy)
├── styles.css       # Custom CSS styles
├── script.js        # JavaScript (navbar, offcanvas menu, form validation, contact form)
├── contact.php      # Server-side contact form email handler
├── images/
│   ├── Trustudent LOGO.png                   # Dark background logo (not in use)
│   ├── TRUSTUDENT  Logo.jpeg                 # Dark background logo (not in use)
│   └── Trustudent_LOGO-removebg-preview.png  # Transparent PNG — used in footer
└── README.md        # This file
```

---

## Pages & Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Main banner with tagline and a mock verified student ID card |
| About | `#about` | Platform overview and key stats |
| Services | `#services` | Full list of verification services |
| Who We Serve | `#serve` | Industries and sectors served |
| Why Trustudent | `#why` | Core value propositions |
| Contact | `#contact` | Contact form, company info, and "What happens next?" steps |

---

## Services Offered

1. **ID & Education Verification**
2. **Employment Verification**
3. **Background & Police Clearance**
4. **Recruitment & Staffing**
5. **Guidance & Counselling**
6. **Overseas Educational Services**
7. **Verification API** *(Coming Soon)*

---

## Tech Stack

| Layer | Technology |
|---|---|
| HTML | HTML5, Bootstrap 5.3.3 |
| CSS | Custom CSS + Bootstrap Icons 1.11.3 |
| Fonts | Google Fonts — Inter (400, 500, 600, 700, 800) |
| JavaScript | Vanilla JS (ES2017+, async/await) |
| Backend | PHP — contact form only |
| Email | PHP `mail()` → sends to `info@trustudent.in` |

---

## Current Status

### Done
- [x] Full single-page layout — Hero, About, Services, Who We Serve, Why Us, Contact, Footer
- [x] Mobile responsive — no horizontal scroll, all sections adapt cleanly
- [x] Offcanvas mobile navigation (Bootstrap 5) — slides in from right, closes before scrolling to section
- [x] Navbar scroll spy — active link highlights as user scrolls
- [x] Contact form — front-end validation + PHP back-end handler
- [x] Form field validations:
  - Name: letters and spaces only (filtered live as you type)
  - Phone: digits, +, -, spaces, parentheses only (filtered live)
  - Email: format validated
  - Subject: required
  - Message: required, live character counter (0 / 2000)
- [x] "What happens next?" block in contact section (fills vertical space on desktop)
- [x] Footer logo — transparent PNG (`Trustudent_LOGO-removebg-preview.png`) on dark navy footer
- [x] Navbar — Bootstrap badge icon + "Trustudent" text (temporary, pending designer logo)
- [x] Contact form email updated to `info@trustudent.in` (GoDaddy domain email)
- [x] Social media icons present in footer (Facebook, Instagram, LinkedIn)

---

## Pending Items

| Item | Details |
|---|---|
| **Rename HTML file** | Rename `index (2).html` → `index.html` before uploading to GoDaddy |
| **Navbar logo** | Waiting for designer — need horizontal PNG with transparent background, dark navy text, ~40px height |
| **Social media links** | Facebook, Instagram, LinkedIn hrefs are `#` placeholders — need real URLs |
| **Deploy to GoDaddy** | Upload files via File Manager or FTP — see deployment guide below |
| **Test contact form email** | After deploy, submit a test form and confirm email arrives at `info@trustudent.in` |
| **PHP mail reliability** | If emails don't arrive, switch to PHPMailer with GoDaddy SMTP settings |

---

## GoDaddy Deployment Guide

### Step 1 — Prepare files
1. Rename `index (2).html` to `index.html`
2. Make sure all files are ready:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `contact.php`
   - `images/` folder with all logo files

### Step 2 — Upload to GoDaddy
1. Log in to GoDaddy → **My Products** → **Web Hosting** → **Manage**
2. Open **File Manager** (or use FTP with FileZilla)
3. Navigate to `public_html/`
4. Upload all files and the `images/` folder into `public_html/`
5. Make sure `index.html` is directly inside `public_html/` (not in a subfolder)

### Step 3 — Test the site
1. Visit your domain — the site should load immediately
2. Check all section scroll links work
3. Check mobile view

### Step 4 — Test contact form email
1. Fill in the contact form and submit
2. Check `info@trustudent.in` inbox (and spam folder)
3. If email does not arrive — see PHP mail troubleshooting below

### PHP Mail Troubleshooting (if emails don't arrive)

**Why PHP `mail()` can fail:**

1. **Spam filtering** — PHP `mail()` sends with no authentication. Gmail, Outlook and most providers flag unauthenticated emails as spam or silently drop them. The form submits successfully and PHP says "sent" — but the email never arrives.

2. **GoDaddy blocks unverified senders** — GoDaddy shared hosting has strict outbound mail policies. If the `From:` address doesn't match a verified email on their server, the email is blocked or bounces silently.

3. **No error reporting** — PHP `mail()` has no real error handling. If it fails, it just returns `false` with no explanation.

**The fix — PHPMailer + GoDaddy SMTP:**

PHPMailer connects directly to GoDaddy's own mail server using your actual `info@trustudent.in` credentials. This means:
- Email is authenticated — comes from a verified sender
- GoDaddy trusts it — no blocking
- Receiving servers (Gmail etc.) trust it — no spam folder
- Real error messages if something goes wrong

**GoDaddy SMTP settings:**
- Host: `smtpout.secureserver.net`
- Port: `465` (SSL) or `587` (TLS)
- Username: your full GoDaddy email (`info@trustudent.in`)
- Password: your GoDaddy email password

**What to do in order:**
1. Deploy the site and test with the existing `mail()` first
2. If emails arrive in `info@trustudent.in` — done, no changes needed
3. If emails don't arrive — switch to PHPMailer with the SMTP settings above (quick change to `contact.php`)

---

## Contact Form

**Fields:**

| Field | Required | Validation | Max Length |
|---|---|---|---|
| Name | Yes | Letters and spaces only | 100 |
| Email | Yes | Valid email format | 150 |
| Phone | Yes | Digits, +, -, spaces, () only | 30 |
| Subject | Yes | Cannot be empty | 120 |
| Message | Yes | Cannot be empty | 2000 |

**Email recipient:** `info@trustudent.in`

**Validation happens at two layers:**
- Front-end (JS) — live input filtering + submit validation with specific error messages
- Back-end (PHP) — same rules enforced server-side, returns JSON response
