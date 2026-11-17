# MIS Career Hub

A full-stack web app where CSUSM business and MIS students can browse MIS career paths and the free tools their student email unlocks. Club officers sign in to add, edit and delete that content and to read messages sent through the contact form.

**Live app:** _add your GitHub Pages link here_

## Features

| Requirement | Where it is |
| --- | --- |
| User login and authentication | `login.html` (Supabase Auth, email and password) |
| Admin add, edit, delete | `admin.html`: Careers, Free tools, Messages tabs |
| Contact information | `contact.html` and the footer on every page |
| Public preview page | `index.html`: anyone can browse without logging in |
| Responsive design | Bootstrap 5 grid, tested at phone and desktop widths |

## How it works

- **Frontend:** HTML, CSS, Bootstrap 5 and JavaScript, hosted on GitHub Pages.
- **Backend:** Supabase (a hosted PostgreSQL database with built-in login).
- **Security:** Row Level Security rules in `sql/schema.sql`. Visitors can only read content and send messages. Only users listed in the `admins` table can change content or read messages. Public sign-ups are turned off.
- All database text is escaped before it is shown, so content cannot run as code.

## Files

```
index.html     Public preview: careers, free tools, quiz link
contact.html   Contact information and contact form
login.html     Admin sign-in
admin.html     Admin dashboard (add, edit, delete)
css/style.css  Custom styles
js/config.js   Supabase URL and publishable key (fill these in)
js/common.js   Shared helpers
js/public.js   Loads careers and resources
js/contact.js  Sends contact messages
js/login.js    Sign-in
js/admin.js    Dashboard logic
sql/schema.sql     Tables and security rules (run first)
sql/seed.sql       12 careers and 5 free tools (run second)
sql/make-admin.sql Makes your account an admin (run third)
```

## Setup

See the setup guide shared with this project. In short: create a Supabase project, run the three SQL files in order, create your user, paste the URL and publishable key into `js/config.js`, and publish with GitHub Pages.

## Credits

Career content comes from my MIS Career Fit Quiz. Job data comes from the U.S. Bureau of Labor Statistics 2025–35 projections. Built with help from Claude and GitHub Copilot.
