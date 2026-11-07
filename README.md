<div align="center">

# CTINASSL Activity

**Activity by Kyle Zoleta, Details, blah blah blah.**


[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MUI](https://img.shields.io/badge/MUI-9-007fff?logo=mui&logoColor=white)](https://mui.com)


[![All rights reserved](https://img.shields.io/badge/license-all%20rights%20reserved-6b4c7a)](LICENSE)


## About
**CTINASSL Activity** blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah.

## What's inside

### Feature 1
dfaffewfw

### Feature 2
dfaffewfw

### Feature 3
dfaffewfw

### Feature 4
dfaffewfw

</div>

---

## Tech stack


| Layer      | Choice                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js 16](https://nextjs.org) (App Router, pre-rendered pages revalidated after admin saves), React 19 |
| Language   | TypeScript                                                                                               |
| UI         | [MUI 9](https://mui.com) (Emotion) with CSS design tokens and cascade layers; [Lucide](https://lucide.dev) and Simple Icons |
| Motion     | [GSAP](https://gsap.com), [Lenis](https://lenis.darkroom.engineering) smooth scrolling, canvas-confetti  |
| Data       | [Neon](https://neon.tech) Postgres with [Drizzle ORM](https://orm.drizzle.team), validated with Zod       |
| Media      | [Cloudinary](https://cloudinary.com) (signed uploads, optimised delivery)                                 |
| Hosting    | [Vercel](https://vercel.com) (region `sin1`) with a daily cron for clean-up and visitor totals            |

```mermaid
flowchart LR
  visitor([Visitor]) -->|pre-rendered pages| next[Next.js on Vercel]
  visitor -->|contact form| actions[Server actions]
  visitor -->|visit counts| track["/api/track"]
  owner([Owner]) -->|password + session| admin["/admin"]
  admin -->|saves, then revalidates pages| next
  actions --> db[(Neon Postgres)]
  track --> db
  admin --> db
  admin -->|signed uploads| cloudinary[Cloudinary]
  cron[Daily cron] -->|clean-up, daily totals| db
```

