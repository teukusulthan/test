# Hijrahfood Retail Sales Dashboard

Technical assessment MVP for Junior Software Engineer position at Hijrahfood.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (charts)

## Features

- 📊 Dashboard summary (total revenue, transactions, avg order, items sold)
- 📋 Sales data table with pagination
- 🔍 Search, category, and gender filters
- 📈 Category revenue bar chart
- 📱 Responsive design

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## API

Uses Hijrahfood Public API at `https://public.hijrahfood.id`

- `GET /health` — Health check
- `GET /metadata` — Dataset metadata
- `GET /sales` — List sales (paginated, filterable)
- `GET /sales/{id}` — Sale detail
- `GET /categories` — Available categories
- `GET /summary` — Sales summary
