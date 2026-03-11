import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, Cell, PieChart, Pie, AreaChart, Area, Legend,
  LineChart, Line, ComposedChart
} from "recharts";

// ─── COLOR PALETTE ──────────────────────────────────────────
const C = {
  bg: '#0F1419', card: '#1A2028', cardHover: '#222A35',
  gold: '#C8A97E', goldLight: '#E8D5B5', goldDim: '#8B7A5E',
  green: '#7A8B6F', purple: '#8B7D9B', blue: '#6B8EAD', red: '#AD6B6B',
  text: '#E8E4DE', textDim: '#8B8680', textMid: '#B5AFA8',
  border: '#2A3240', accent: '#D4A853'
};

// ─── ALL DATA ───────────────────────────────────────────────

// Demographics
const ageData = [
  { group: '0-5 нас', pct: 13 }, { group: '6-17 нас', pct: 25 },
  { group: '18-59 нас', pct: 55 }, { group: '60+ нас', pct: 8 }
];

const migrationData = [
  { khoroo: 'Хороо #23', pct: 16 }, { khoroo: 'Хороо #24', pct: 10 },
  { khoroo: 'Хороо #17', pct: 10 }, { khoroo: 'Хороо #18', pct: 9 },
  { khoroo: 'Хороо #11', pct: 8 }
];

const infraData = [
  { need: 'Орлого', pct: 16 }, { need: 'Эрүүл мэнд', pct: 14 },
  { need: 'Боловсрол', pct: 14 }, { need: 'Машин зогсоол', pct: 11 },
  { need: 'Орон байр', pct: 9 }, { need: 'Тээвэр', pct: 8 },
  { need: 'Ундны ус', pct: 8 }, { need: 'Хэрэглээний ус', pct: 6 },
  { need: 'Цахилгаан', pct: 4 }, { need: 'Төрийн үйлчилгээ', pct: 4 },
  { need: 'Хүнс', pct: 3 }, { need: 'Бусад', pct: 3 }
];

// Insight 2 - Price per sqm by neighborhood
const priceBySqmNeighborhood = [
  { name: 'Romana Residence', avg: 9.84, med: 10.97, count: 6 },
  { name: 'River Garden', avg: 9.79, med: 8.56, count: 145 },
  { name: 'Japan town', avg: 9.22, med: 10.50, count: 24 },
  { name: '120 мянгат', avg: 8.90, med: 8.50, count: 109 },
  { name: 'Хороо 18', avg: 8.74, med: 8.01, count: 117 },
  { name: 'Стадион Оргил', avg: 8.37, med: 9.02, count: 10 },
  { name: 'Удирдлагын Академи', avg: 8.32, med: 8.98, count: 52 },
  { name: 'Хороо 17', avg: 8.09, med: 8.10, count: 123 },
  { name: 'Хороо 15', avg: 7.93, med: 7.01, count: 233 },
  { name: 'Хүннү', avg: 7.73, med: 7.25, count: 45 }
];

// Insight 3 - Avg sqm by neighborhood
const avgSqmNeighborhood = [
  { name: 'Japan town', avg: 242.84, med: 277.8, count: 22 },
  { name: 'King Tower', avg: 175.39, med: 166.0, count: 41 },
  { name: 'River Garden', avg: 171.13, med: 174.2, count: 88 },
  { name: '120 мянгат', avg: 160.22, med: 110.0, count: 77 },
  { name: 'Хурд', avg: 153.57, med: 125.0, count: 12 },
  { name: 'Хороо 11', avg: 150.39, med: 122.9, count: 108 },
  { name: 'Зайсан', avg: 143.74, med: 113.5, count: 274 },
  { name: 'Хороо 17', avg: 143.54, med: 137.0, count: 79 },
  { name: 'Хороо 18', avg: 133.54, med: 88.0, count: 84 },
  { name: 'Хороо 15', avg: 121.25, med: 103.62, count: 138 }
];

// Insight 4 - Property type
const typeData = [
  { name: 'Орон сууц', value: 61, color: C.gold },
  { name: 'Газар', value: 44, color: C.green },
  { name: 'Оффис', value: 18, color: C.purple }
];

// Insight 5 - Payment terms
const paymentData = [
  { term: 'Банкны зээл', count: 78, pct: 63 },
  { term: 'Бэлэн', count: 27, pct: 22 },
  { term: 'Бартер', count: 18, pct: 15 }
];

// Insight 6 - Floor vs price
const floorPriceData = [
  { floor: '0', price: 9.22 }, { floor: '1', price: 8.02 }, { floor: '2', price: 6.77 },
  { floor: '3', price: 5.89 }, { floor: '4', price: 6.99 }, { floor: '5', price: 5.42 },
  { floor: '6', price: 5.43 }, { floor: '7', price: 7.93 }, { floor: '8', price: 9.01 },
  { floor: '9', price: 5.00 }, { floor: '10', price: 7.07 }, { floor: '14', price: 8.47 },
  { floor: '16', price: 7.80 }, { floor: '18', price: 9.30 }, { floor: '21', price: 11.00 }
];

// Insight 8 - Window count vs price
const windowData = [
  { count: '0', price: 9.22, n: 62 }, { count: '2', price: 6.02, n: 2 },
  { count: '3', price: 5.87, n: 10 }, { count: '4', price: 7.02, n: 12 },
  { count: '5', price: 7.14, n: 15 }, { count: '6', price: 8.26, n: 10 },
  { count: '7', price: 5.36, n: 4 }, { count: '8', price: 7.17, n: 8 }
];

// Insight 9 - Balcony vs price
const balconyData = [
  { count: '0', price: 8.78, n: 66 }, { count: '1', price: 7.12, n: 45 },
  { count: '2', price: 6.66, n: 8 }, { count: '3+', price: 6.64, n: 4 }
];

// Insight 10 - Building age vs price
const buildingAgeData = [
  { year: '2000', price: 3.70 }, { year: '2008', price: 4.03 }, { year: '2010', price: 3.60 },
  { year: '2011', price: 4.35 }, { year: '2012', price: 3.85 }, { year: '2014', price: 7.72 },
  { year: '2015', price: 4.26 }, { year: '2016', price: 6.53 }, { year: '2017', price: 5.67 },
  { year: '2018', price: 6.35 }, { year: '2019', price: 5.45 }, { year: '2020', price: 6.86 },
  { year: '2021', price: 5.66 }, { year: '2022', price: 8.60 }, { year: '2023', price: 9.13 },
  { year: '2024', price: 8.52 }, { year: '2025', price: 7.29 }, { year: '2026', price: 6.15 }
];

// Insight 11 - Size category
const sizeCatData = [
  { cat: 'Жижиг (50-100м²)', ppsqm: 7.39, price: 555.49 },
  { cat: 'Дунд (100-150м²)', ppsqm: 6.87, price: 876.23 },
  { cat: 'Том (150-250м²)', ppsqm: 8.31, price: 1574.40 },
  { cat: 'Тансаг (250-500м²)', ppsqm: 9.02, price: 2802.50 }
];

// Insight 13 - Monthly price trend
const monthlyPriceData = [
  { month: '2024-10', med: 3.19, avg: 4.68, count: 9 },
  { month: '2024-11', med: 5.86, avg: 6.09, count: 115 },
  { month: '2024-12', med: 5.40, avg: 5.14, count: 7 },
  { month: '2025-01', med: 5.50, avg: 5.68, count: 89 },
  { month: '2025-02', med: 6.00, avg: 5.66, count: 85 },
  { month: '2025-03', med: 4.75, avg: 4.19, count: 18 },
  { month: '2025-04', med: 5.54, avg: 5.65, count: 104 },
  { month: '2025-05', med: 5.30, avg: 5.31, count: 71 },
  { month: '2025-06', med: 5.50, avg: 5.40, count: 94 },
  { month: '2025-07', med: 5.67, avg: 5.81, count: 84 },
  { month: '2025-08', med: 5.30, avg: 6.02, count: 134 },
  { month: '2025-09', med: 5.95, avg: 5.64, count: 117 },
  { month: '2025-10', med: 5.83, avg: 6.14, count: 153 },
  { month: '2025-11', med: 6.00, avg: 7.26, count: 39 },
  { month: '2025-12', med: 6.21, avg: 7.38, count: 135 },
  { month: '2026-01', med: 7.62, avg: 8.14, count: 73 },
  { month: '2026-02', med: 6.00, avg: 6.83, count: 37 },
  { month: '2026-03', med: 6.45, avg: 6.92, count: 56 }
];

// Insight 14 - Listing count by type
const listingCountData = [
  { month: '2024-10', apartment: 9, land: 21, office: 2, total: 32 },
  { month: '2024-11', apartment: 115, land: 14, office: 0, total: 129 },
  { month: '2024-12', apartment: 7, land: 4, office: 0, total: 11 },
  { month: '2025-01', apartment: 89, land: 24, office: 7, total: 120 },
  { month: '2025-02', apartment: 85, land: 12, office: 10, total: 107 },
  { month: '2025-03', apartment: 18, land: 7, office: 1, total: 26 },
  { month: '2025-04', apartment: 104, land: 24, office: 7, total: 135 },
  { month: '2025-05', apartment: 71, land: 27, office: 5, total: 104 },
  { month: '2025-06', apartment: 94, land: 31, office: 5, total: 130 },
  { month: '2025-07', apartment: 84, land: 12, office: 3, total: 100 },
  { month: '2025-08', apartment: 134, land: 22, office: 12, total: 168 },
  { month: '2025-09', apartment: 117, land: 25, office: 5, total: 148 },
  { month: '2025-10', apartment: 153, land: 17, office: 6, total: 179 },
  { month: '2025-11', apartment: 39, land: 17, office: 5, total: 62 },
  { month: '2025-12', apartment: 135, land: 24, office: 8, total: 167 },
  { month: '2026-01', apartment: 73, land: 10, office: 5, total: 88 },
  { month: '2026-02', apartment: 37, land: 21, office: 5, total: 63 },
  { month: '2026-03', apartment: 56, land: 39, office: 14, total: 109 }
];

// Insight 15 - H17 vs other Khan-Uul
const comparisonData = [
  { month: '2024-10', other: 3.20, h17: 3.19, diff: 0 },
  { month: '2024-11', other: 3.50, h17: 5.86, diff: 68 },
  { month: '2024-12', other: 3.30, h17: 5.40, diff: 64 },
  { month: '2025-01', other: 3.51, h17: 5.50, diff: 57 },
  { month: '2025-02', other: 3.80, h17: 6.00, diff: 58 },
  { month: '2025-03', other: 3.35, h17: 4.75, diff: 42 },
  { month: '2025-04', other: 3.63, h17: 5.54, diff: 53 },
  { month: '2025-05', other: 3.70, h17: 5.30, diff: 43 },
  { month: '2025-06', other: 3.70, h17: 5.50, diff: 49 },
  { month: '2025-07', other: 3.79, h17: 5.67, diff: 50 },
  { month: '2025-08', other: 3.73, h17: 5.30, diff: 42 },
  { month: '2025-09', other: 3.85, h17: 5.95, diff: 54 },
  { month: '2025-10', other: 4.00, h17: 5.83, diff: 46 },
  { month: '2025-11', other: 4.10, h17: 6.00, diff: 46 },
  { month: '2025-12', other: 4.35, h17: 6.21, diff: 43 },
  { month: '2026-01', other: 4.80, h17: 7.62, diff: 59 },
  { month: '2026-02', other: 4.86, h17: 6.00, diff: 23 },
  { month: '2026-03', other: 4.80, h17: 6.45, diff: 34 }
];

// Insight 16 - Size mix shift
const sizeMixData = [
  { month: '2024-10', small: 22, med: 11, large: 33, lux: 33 },
  { month: '2024-11', small: 18, med: 38, large: 32, lux: 11 },
  { month: '2024-12', small: 14, med: 0, large: 86, lux: 0 },
  { month: '2025-01', small: 12, med: 38, large: 40, lux: 9 },
  { month: '2025-02', small: 6, med: 48, large: 32, lux: 14 },
  { month: '2025-03', small: 17, med: 22, large: 44, lux: 17 },
  { month: '2025-04', small: 9, med: 61, large: 24, lux: 7 },
  { month: '2025-05', small: 11, med: 54, large: 28, lux: 7 },
  { month: '2025-06', small: 12, med: 55, large: 30, lux: 3 },
  { month: '2025-07', small: 20, med: 33, large: 40, lux: 6 },
  { month: '2025-08', small: 14, med: 45, large: 32, lux: 9 },
  { month: '2025-09', small: 18, med: 42, large: 29, lux: 11 },
  { month: '2025-10', small: 9, med: 51, large: 37, lux: 3 },
  { month: '2025-11', small: 13, med: 44, large: 31, lux: 13 },
  { month: '2025-12', small: 18, med: 31, large: 36, lux: 16 },
  { month: '2026-01', small: 12, med: 33, large: 32, lux: 23 },
  { month: '2026-02', small: 19, med: 24, large: 27, lux: 30 },
  { month: '2026-03', small: 16, med: 38, large: 30, lux: 16 }
];

// ─── COMPONENTS ─────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon }) => (
  <div style={{
    background: `linear-gradient(135deg, ${C.card} 0%, ${C.cardHover} 100%)`,
    border: `1px solid ${C.border}`, borderRadius: 16, padding: '22px 18px',
    display: 'flex', flexDirection: 'column', gap: 5, position: 'relative', overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 26, opacity: 0.12 }}>{icon}</div>
    <span style={{ color: C.textDim, fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'monospace' }}>{label}</span>
    <span style={{ color: C.gold, fontSize: 28, fontWeight: 700, fontFamily: "'DM Serif Display', Georgia, serif", lineHeight: 1 }}>{value}</span>
    {sub && <span style={{ color: C.textMid, fontSize: 12 }}>{sub}</span>}
  </div>
);

const ChartCard = ({ title, subtitle, children, span = 1 }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`,
    borderRadius: 16, padding: 24, gridColumn: `span ${span}`,
    display: 'flex', flexDirection: 'column', gap: 14
  }}>
    <div>
      <h3 style={{ color: C.text, fontSize: 16, fontWeight: 600, margin: 0, fontFamily: "'DM Serif Display', Georgia, serif" }}>{title}</h3>
      {subtitle && <p style={{ color: C.textDim, fontSize: 11, margin: '3px 0 0', fontFamily: 'monospace' }}>{subtitle}</p>}
    </div>
    {children}
  </div>
);

const TT = ({ active, payload, label, formatter }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1A2028ee', border: `1px solid ${C.border}`, borderRadius: 10, padding: '10px 14px', backdropFilter: 'blur(12px)', maxWidth: 260 }}>
      {label && <div style={{ color: C.textDim, fontSize: 10, marginBottom: 5, fontFamily: 'monospace' }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.gold, fontSize: 12, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
        </div>
      ))}
    </div>
  );
};

const DataTable = ({ headers, rows, highlight }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{ color: C.gold, fontWeight: 600, padding: '8px 10px', borderBottom: `1px solid ${C.border}`, textAlign: i === 0 ? 'left' : 'right', fontFamily: 'monospace', fontSize: 11 }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ background: highlight === ri ? `${C.gold}10` : 'transparent' }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ color: highlight === ri && ci === 0 ? C.gold : C.textMid, fontWeight: highlight === ri ? 600 : 400, padding: '7px 10px', borderBottom: `1px solid ${C.border}15`, textAlign: ci === 0 ? 'left' : 'right', fontFamily: ci > 0 ? 'monospace' : 'inherit', fontSize: 12 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TABS = ['Ерөнхий судалгаа', 'Хан-Уул дүүрэг', 'Хороо 17 - Сүүлийн 1 сар', 'Хороо 17 - 2024-2026 онд'];

export default function Dashboard() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #161C24 0%, #1A2535 50%, #1E1A28 100%)`, borderBottom: `1px solid ${C.border}`, padding: '36px 32px 24px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.gold, boxShadow: `0 0 12px ${C.gold}80` }} />
            <span style={{ color: C.goldDim, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', fontFamily: 'monospace' }}>
              Хан-Уул дүүрэг · Үл хөдлөх хөрөнгийн зах зээлийн тайлан
            </span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 700, margin: 0, fontFamily: "'DM Serif Display', Georgia, serif", background: `linear-gradient(135deg, ${C.goldLight} 0%, ${C.gold} 50%, ${C.goldDim} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Хан-Уул 17-р Хороо - Дата шинжилгээ
          </h1>
          <p style={{ color: C.textDim, fontSize: 13, margin: '6px 0 0', fontFamily: 'monospace' }}>
            2024 оны 10 сар – 2026 оны 3 сар · Unegui.mn · Нийт 1,420+ зар
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '16px 32px 0', display: 'flex', gap: 3, borderBottom: `1px solid ${C.border}`, overflowX: 'auto' }}>
        {TABS.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            background: tab === i ? C.card : 'transparent',
            border: `1px solid ${tab === i ? C.border : 'transparent'}`,
            borderBottom: tab === i ? `2px solid ${C.gold}` : '2px solid transparent',
            borderRadius: '10px 10px 0 0', padding: '9px 18px', whiteSpace: 'nowrap',
            color: tab === i ? C.gold : C.textDim, fontSize: 12,
            fontWeight: tab === i ? 600 : 400, cursor: 'pointer', fontFamily: 'monospace'
          }}>{t}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '24px 32px 60px' }}>

        {/* ════ TAB 0: ЕРӨНХИЙ СУДАЛГАА ════════════════════════ */}
        {tab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Intro Text */}
            <ChartCard title="Хан-Уул дүүргийн тухай" subtitle="Газар зүйн мэдээлэл">
              <p style={{ color: C.textMid, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Хан-Уул дүүрэг нь нийт <span style={{ color: C.gold, fontWeight: 600 }}>48,500 га</span> нутаг дэвсгэртэй бөгөөд үүнээс 21.1% нь ой мод, гол горхи бүхий ногоон бүс, 67.6% нь хөдөө аж ахуйн газар, 11.3% нь хот суурин газарт харъяалагддаг. Хан-Уул нь нийт <span style={{ color: C.gold, fontWeight: 600 }}>21 хороотой</span>.
              </p>
            </ChartCard>

            {/* KPI Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              <StatCard icon="👨‍👩‍👧‍👦" label="Нийт өрх" value="73,537" sub="Хан-Уул дүүрэг" />
              <StatCard icon="👤" label="Хүн ам" value="249,172" sub="2023 оны байдлаар" />
              <StatCard icon="📈" label="Хүн амын өсөлт" value="+65.6%" sub="2019-2024 он" />
              <StatCard icon="🏠" label="Өрхийн өсөлт" value="+64.5%" sub="2019-2024 он" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Age Demographics */}
              <ChartCard title="Хүн ам зүй" subtitle="Насны бүлгээр (эзлэх хувь)">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ageData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis type="number" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 60]} />
                    <YAxis type="category" dataKey="group" tick={{ fill: C.textMid, fontSize: 12 }} width={80} axisLine={{ stroke: C.border }} />
                    <Tooltip content={<TT />} />
                    <Bar dataKey="pct" name="Хувь" fill={C.blue} radius={[0, 6, 6, 0]} barSize={22} />
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ color: C.textDim, fontSize: 11, padding: '4px 10px', background: `${C.blue}15`, borderRadius: 6 }}>54% эмэгтэй</span>
                  <span style={{ color: C.textDim, fontSize: 11, padding: '4px 10px', background: `${C.blue}15`, borderRadius: 6 }}>37% хүүхэд</span>
                </div>
              </ChartCard>

              {/* Migration */}
              <ChartCard title="Ирсэн хөдөлгөөн" subtitle="Хамгийн их бүртгэгдсэн 5 хороо (эзлэх хувь)">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={migrationData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis type="number" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 20]} />
                    <YAxis type="category" dataKey="khoroo" tick={{ fill: C.textMid, fontSize: 12 }} width={85} axisLine={{ stroke: C.border }} />
                    <Tooltip content={<TT />} />
                    <Bar dataKey="pct" name="Хувь" radius={[0, 6, 6, 0]} barSize={22}>
                      {migrationData.map((d, i) => (
                        <Cell key={i} fill={d.khoroo.includes('17') ? C.gold : C.blue} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Khoroo Population Distribution */}
            <ChartCard title="Хүн ам зүй, хороогоор" subtitle="Хороо тус бүрийн эзлэх хувь (#13–#25)">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={[
                  { khoroo: '#13', pct: 2 }, { khoroo: '#14', pct: 2 }, { khoroo: '#15', pct: 7 },
                  { khoroo: '#16', pct: 4 }, { khoroo: '#17', pct: 6 }, { khoroo: '#18', pct: 5 },
                  { khoroo: '#19', pct: 6 }, { khoroo: '#20', pct: 4 }, { khoroo: '#21', pct: 5 },
                  { khoroo: '#22', pct: 3 }, { khoroo: '#23', pct: 3 }, { khoroo: '#24', pct: 7 },
                  { khoroo: '#25', pct: 3 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="khoroo" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 9]} unit="%" />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="pct" name="Эзлэх хувь" radius={[6, 6, 0, 0]} barSize={30}>
                    {[2,2,7,4,6,5,6,4,5,3,3,7,3].map((v, i) => (
                      <Cell key={i} fill={i === 4 ? C.gold : C.blue} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                Хороо 17 нь Хан-Уул дүүргийн нийт хүн амын <span style={{ color: C.gold, fontWeight: 600 }}>6%</span>-ийг эзэлдэг.
              </p>
            </ChartCard>

            {/* Infrastructure Needs */}
            <ChartCard title="Иргэдэд хүртээмжгүй байгаа үндсэн үйлчилгээ болон дэд бүтэц" subtitle="Эзлэх хувиар">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={infraData} margin={{ bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="need" tick={{ fill: C.textDim, fontSize: 10, angle: -35, textAnchor: 'end' }} axisLine={{ stroke: C.border }} height={60} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="pct" name="Хувь" fill={C.blue} radius={[6, 6, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
              <p style={{ color: C.textDim, fontSize: 10, margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                Эх сурвалж: International Organization for Migration (IOM), Aug 29 2023. DTM Монгол Улс – Улаанбаатар: "Хүн ам зүй, шилжилт хөдөлгөөн ба хэрэгцээ шаардлага" Түргэвчилсэн судалгаа 3 (2022 оны 9 дүгээр сараас 2023 оны 2 дугаар сар) – Багануур дүүрэг. IOM, Mongolia.
              </p>
            </ChartCard>
          </div>
        )}

        {/* ════ TAB 1: ХАН-УУЛ ДҮҮРЭГ ════════════════════════ */}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <StatCard icon="📋" label="Сүүлийн 1 сарын нийт зарын тоо" value="3,543" sub="Хан-Уул дүүрэг · Unegui.mn" />

            {/* Insight 2 - Price per sqm ranking */}
            <ChartCard title="Диаграмм №2 · м² үнээрээ хамгийн өндөр хороо, хотхон" subtitle="Дундаж ба медиан м² үнэ (сая₮) · Орон сууц, оффис">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={priceBySqmNeighborhood} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis type="number" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 12]} />
                  <YAxis type="category" dataKey="name" tick={{ fill: C.textMid, fontSize: 11 }} width={130} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Bar dataKey="avg" name="Дундаж" fill={C.gold} radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="med" name="Медиан" fill={C.green} radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
              <DataTable
                headers={['Хороо / Хотхон', 'Дундаж (сая₮/м²)', 'Медиан (сая₮/м²)', 'Зарын тоо']}
                rows={priceBySqmNeighborhood.map(d => [d.name, d.avg.toFixed(2), d.med.toFixed(2), d.count])}
                highlight={7}
              />
            </ChartCard>

            {/* Insight 3 - Average sqm */}
            <ChartCard title="Диаграмм №3 · Дундаж м² хэмжээ" subtitle="Орон сууц, оффис · хороо, хотхоноор">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={avgSqmNeighborhood} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis type="number" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: C.textMid, fontSize: 11 }} width={100} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Bar dataKey="avg" name="Дундаж м²" fill={C.gold} radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="med" name="Медиан м²" fill={C.purple} radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
              <DataTable
                headers={['Хороо / Хотхон', 'Дундаж (м²)', 'Медиан (м²)', 'Зарын тоо']}
                rows={avgSqmNeighborhood.map(d => [d.name, d.avg.toFixed(2), d.med.toFixed(2), d.count])}
                highlight={7}
              />
            </ChartCard>
          </div>
        )}

        {/* ════ TAB 2: ХОРОО 17 — ЗАХ ЗЭЭЛ ═══════════════════ */}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Insight 4 - Property Type */}
              <ChartCard title="№4 · Үл хөдлөхийн төрлөөр ангилал">
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ width: 160, height: 160 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={typeData} cx="50%" cy="50%" innerRadius={40} outerRadius={68} dataKey="value" stroke={C.bg} strokeWidth={3}>
                          {typeData.map((d, i) => <Cell key={i} fill={d.color} />)}
                        </Pie>
                        <Tooltip content={<TT />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {typeData.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 8, background: `${d.color}10`, border: `1px solid ${d.color}25` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                          <span style={{ color: C.text, fontSize: 13 }}>{d.name}</span>
                        </div>
                        <span style={{ color: d.color, fontWeight: 700, fontSize: 15 }}>{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ChartCard>

              {/* Insight 5 - Payment Terms */}
              <ChartCard title="№5 · Төлбөрийн нөхцөл">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', flex: 1 }}>
                  {paymentData.map((d, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ color: C.text, fontSize: 13 }}>{d.term}</span>
                        <span style={{ color: C.gold, fontWeight: 700, fontSize: 13, fontFamily: 'monospace' }}>{d.count} ({d.pct}%)</span>
                      </div>
                      <div style={{ height: 8, background: C.bg, borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${d.pct}%`, height: '100%', background: `linear-gradient(90deg, ${C.gold}, ${C.gold}88)`, borderRadius: 4 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>

            {/* Insight 6 - Floor vs Price */}
            <ChartCard title="№6 · дундаж м² үнэ - хэдэн давхарт байрлаж байгаагаар" subtitle="Зард бүртгэгдсэн давхар бүрээр">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={floorPriceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="floor" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} label={{ value: 'Давхар', position: 'bottom', fill: C.textDim, fontSize: 11 }} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 12]} />
                  <Tooltip content={<TT />} />
                  <Bar dataKey="price" name="м² дундаж үнэ (сая ₮)" radius={[6, 6, 0, 0]} barSize={28}>
                    {floorPriceData.map((d, i) => (
                      <Cell key={i} fill={d.price >= 9 ? C.accent : d.price >= 7 ? C.gold : C.goldDim} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Insight 7 - Sell vs Rent */}
            <ChartCard title="№7 · Зарах / түрээслэх">
              <div style={{ display: 'flex', gap: 16 }}>
                {[{ label: 'Зарах', value: 115, pct: 93 }, { label: 'Бөглөөгүй', value: 8, pct: 7 }].map((d, i) => (
                  <div key={i} style={{ flex: 1, padding: '16px 20px', background: i === 0 ? `${C.gold}10` : C.bg, border: `1px solid ${i === 0 ? C.gold + '30' : C.border}`, borderRadius: 12, textAlign: 'center' }}>
                    <div style={{ color: i === 0 ? C.gold : C.textDim, fontSize: 28, fontWeight: 700, fontFamily: 'monospace' }}>{d.value}</div>
                    <div style={{ color: C.textDim, fontSize: 12, marginTop: 4 }}>{d.label} ({d.pct}%)</div>
                  </div>
                ))}
              </div>
            </ChartCard>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Insight 8 - Window Count */}
              <ChartCard title="№8 · Цонхны тоогоор м² дундаж үнэ (сая ₮)">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={windowData.filter(d => d.count !== '0')}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="count" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} label={{ value: 'Цонхны тоо', position: 'bottom', fill: C.textDim, fontSize: 10 }} />
                    <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 10]} />
                    <Tooltip content={<TT />} />
                    <Bar dataKey="price" name="м² үнэ (сая₮)" fill={C.blue} radius={[6, 6, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
                <DataTable
                  headers={['Цонхны тоо', 'м² дундаж үнэ (сая ₮)', 'Зарын тоо']}
                  rows={windowData.map(d => [d.count, d.price.toFixed(2), d.n])}
                />
              </ChartCard>

              {/* Insight 9 - Balcony */}
              <ChartCard title="№9 · Тагтны тоогоор м² дундаж үнэ (сая ₮)">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={balconyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="count" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} label={{ value: 'Тагтны тоо', position: 'bottom', fill: C.textDim, fontSize: 10 }} />
                    <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 10]} />
                    <Tooltip content={<TT />} />
                    <Bar dataKey="price" name="м² үнэ (сая₮)" fill={C.green} radius={[6, 6, 0, 0]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
                <DataTable
                  headers={['Тагтны тоо', 'м² дундаж үнэ (сая ₮)', 'Зарын тоо']}
                  rows={balconyData.map(d => [d.count, d.price.toFixed(2), d.n])}
                />
              </ChartCard>
            </div>

            {/* Insight 10 - Building Age */}
            <ChartCard title="№10 · Баригдсан он ба м² дундаж үнэ (сая ₮)" subtitle="Ашиглалтад орсон оноор">
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={buildingAgeData}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.gold} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={C.gold} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="year" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 10]} />
                  <Tooltip content={<TT />} />
                  <Area type="monotone" dataKey="price" name="м² дундаж үнэ (сая₮)" stroke={C.gold} fill="url(#g1)" strokeWidth={2.5} dot={{ fill: C.gold, r: 4 }} activeDot={{ fill: C.accent, r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Insight 11 - Size Category */}
            <ChartCard title="№11 · Хэмжээний ангилалаар дундаж үнэ" subtitle="Орон сууц">
              <ResponsiveContainer width="100%" height={260}>
                <ComposedChart data={sizeCatData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="cat" tick={{ fill: C.textDim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                  <YAxis yAxisId="l" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} label={{ value: 'сая₮/м²', angle: -90, position: 'insideLeft', fill: C.textDim, fontSize: 10 }} />
                  <YAxis yAxisId="r" orientation="right" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} label={{ value: 'Нийт үнэ (сая₮)', angle: 90, position: 'insideRight', fill: C.textDim, fontSize: 10 }} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Bar yAxisId="l" dataKey="ppsqm" name="м² дундаж үнэ (сая ₮)" fill={C.gold} radius={[6, 6, 0, 0]} barSize={36} />
                  <Line yAxisId="r" type="monotone" dataKey="price" name="Нийт дундаж үнэ" stroke={C.green} strokeWidth={2.5} dot={{ fill: C.green, r: 5 }} />
                </ComposedChart>
              </ResponsiveContainer>
              <DataTable
                headers={['Хэмжээ', 'м² дундаж үнэ (сая ₮)', 'Нийт дундаж үнэ (сая ₮)']}
                rows={sizeCatData.map(d => [d.cat, d.ppsqm.toFixed(2), d.price.toFixed(2)])}
              />
            </ChartCard>

            {/* Insight 12 - Correlation Heatmap */}
            <ChartCard title="№12 · Үнэд хамгийн их нөлөөлдөг хүчин зүйлс" subtitle="Корреляцийн хамаарлын матриц · Орон сууц">
              {(() => {
                const labels = ['Тагт', 'Баригдсан он', 'Талбай (м²)', 'Давхар', 'Нийт давхар', 'Цонхны тоо', 'м² үнэ'];
                const matrix = [
                  [1, -0.24, 0.37, 0.12, -0.26, 0.37, -0.0025],
                  [-0.24, 1, 0.083, 0.18, 0.6, -0.086, 0.5],
                  [0.37, 0.083, 1, 0.26, -0.031, 0.63, 0.37],
                  [0.12, 0.18, 0.26, 1, 0.46, 0.12, 0.33],
                  [-0.26, 0.6, -0.031, 0.46, 1, -0.09, 0.44],
                  [0.37, -0.086, 0.63, 0.12, -0.09, 1, 0.14],
                  [-0.0025, 0.5, 0.37, 0.33, 0.44, 0.14, 1]
                ];
                const getColor = (v) => {
                  if (v >= 0.8) return '#5B0A0A';
                  if (v >= 0.5) return '#8B2020';
                  if (v >= 0.3) return '#A84040';
                  if (v >= 0.1) return '#C0707060';
                  if (v >= -0.1) return '#3A3A4A50';
                  if (v >= -0.3) return '#4A6A9060';
                  return '#0D1B3E';
                };
                const sz = 56;
                return (
                  <div style={{ overflowX: 'auto' }}>
                    <div style={{ display: 'inline-block' }}>
                      {/* Header row */}
                      <div style={{ display: 'flex', marginLeft: 110 }}>
                        {labels.map((l, i) => (
                          <div key={i} style={{ width: sz, textAlign: 'center', color: C.textDim, fontSize: 9, fontFamily: 'monospace', transform: 'rotate(-40deg)', transformOrigin: 'bottom left', whiteSpace: 'nowrap', height: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>{l}</div>
                        ))}
                      </div>
                      {/* Matrix rows */}
                      {matrix.map((row, ri) => (
                        <div key={ri} style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ width: 110, textAlign: 'right', paddingRight: 10, color: ri === 6 ? C.gold : C.textMid, fontSize: 11, fontWeight: ri === 6 ? 600 : 400 }}>{labels[ri]}</div>
                          {row.map((val, ci) => (
                            <div key={ci} style={{
                              width: sz, height: sz, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: getColor(val), borderRadius: 4, margin: 1,
                              color: (val >= 0.5 || val <= -0.3) ? '#E8E4DE' : (val >= 0.3 ? '#f0d0d0' : C.textMid),
                              fontSize: 10, fontWeight: Math.abs(val) >= 0.4 ? 700 : 400, fontFamily: 'monospace',
                              border: (ri === 6 || ci === 6) ? `1px solid ${C.gold}40` : '1px solid transparent'
                            }}>
                              {val.toFixed(2)}
                            </div>
                          ))}
                        </div>
                      ))}
                      {/* Legend */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, marginLeft: 110, flexWrap: 'wrap' }}>
                        <span style={{ color: C.textDim, fontSize: 10 }}>Сөрөг</span>
                        {['#0D1B3E', '#4A6A9060', '#3A3A4A50', '#C0707060', '#A84040', '#8B2020', '#5B0A0A'].map((c, i) => (
                          <div key={i} style={{ width: 24, height: 10, background: c, borderRadius: 2 }} />
                        ))}
                        <span style={{ color: C.textDim, fontSize: 10 }}>Эерэг</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 4 }}>
                {[
                  { label: 'Баригдсан он → м² үнэ', val: '0.50', desc: 'Хамгийн хүчтэй' },
                  { label: 'Нийт давхар → м² үнэ', val: '0.44', desc: 'Өндөр барилга = үнэтэй' },
                  { label: 'Талбай → м² үнэ', val: '0.37', desc: 'Том = м² нь дээшлэгддэг' }
                ].map((d, i) => (
                  <div key={i} style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}20`, borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
                    <div style={{ color: C.gold, fontWeight: 700, fontSize: 18 }}>{d.val}</div>
                    <div style={{ color: C.text, fontSize: 11, fontWeight: 500, marginTop: 2 }}>{d.label}</div>
                    <div style={{ color: C.textDim, fontSize: 10 }}>{d.desc}</div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        )}

        {/* ════ TAB 3: ХОРОО 17 — ЦАГ ХУГАЦАА ════════════════ */}
        {tab === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Insight 13 - Monthly Price Trend */}
            <ChartCard title="№13 · Сар бүрийн м² үнэ" subtitle="Медиан ба дундаж (сая₮/м²) · 2024.10 – 2026.03">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyPriceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" tick={{ fill: C.textDim, fontSize: 9, angle: -30, textAnchor: 'end' }} axisLine={{ stroke: C.border }} height={50} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[2, 9]} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Line type="monotone" dataKey="med" name="Медиан м² үнэ (сая ₮)" stroke={C.gold} strokeWidth={2.5} dot={{ fill: C.gold, r: 4 }} />
                  <Line type="monotone" dataKey="avg" name="Дундаж м² үнэ (сая ₮)" stroke={C.green} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: C.green, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
              <DataTable
                headers={['Он-сар', 'Медиан (сая₮/м²)', 'Дундаж (сая₮/м²)', 'Зарын тоо']}
                rows={monthlyPriceData.map(d => [d.month, d.med.toFixed(2), d.avg.toFixed(2), d.count])}
              />
            </ChartCard>

            {/* Insight 14 - Listing Count */}
            <ChartCard title="№14 · Зарын тоо сараар" subtitle="Үл хөдлөхийн төрлөөр ангилсан">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={listingCountData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" tick={{ fill: C.textDim, fontSize: 9, angle: -30, textAnchor: 'end' }} axisLine={{ stroke: C.border }} height={50} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Bar dataKey="apartment" name="Орон сууц" fill={C.gold} stackId="a" barSize={20} />
                  <Bar dataKey="land" name="Газар" fill={C.green} stackId="a" />
                  <Bar dataKey="office" name="Оффис" fill={C.purple} stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Insight 15 - H17 vs Others */}
            <ChartCard title="№15 · Хороо 17 vs Бусад Хан-Уул" subtitle="Медиан м² үнэ (сая₮) харьцуулалт">
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={comparisonData}>
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.gold} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={C.gold} stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.blue} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={C.blue} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" tick={{ fill: C.textDim, fontSize: 9, angle: -30, textAnchor: 'end' }} axisLine={{ stroke: C.border }} height={50} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[2, 9]} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Area type="monotone" dataKey="h17" name="Хороо 17" stroke={C.gold} fill="url(#g2)" strokeWidth={2.5} dot={{ fill: C.gold, r: 3 }} />
                  <Area type="monotone" dataKey="other" name="Бусад Хан-Уул" stroke={C.blue} fill="url(#g3)" strokeWidth={2} dot={{ fill: C.blue, r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
              {/* Premium badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Дундаж ялгаа', value: '+48%' },
                  { label: 'Хамгийн их ялгаа', value: '+68% (2024-11)' },
                  { label: 'Хамгийн бага ялгаа', value: '+23% (2026-02)' }
                ].map((d, i) => (
                  <div key={i} style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}20`, borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
                    <div style={{ color: C.gold, fontWeight: 700, fontSize: 16 }}>{d.value}</div>
                    <div style={{ color: C.textDim, fontSize: 10 }}>{d.label}</div>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Insight 16 - Size Mix Shift */}
            <ChartCard title="№16 · Жижиг – Том байрны харьцааны өөрчлөлт" subtitle="Хэмжээний ангилалын эзлэх хувийн өөрчлөлт сараар">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={sizeMixData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" tick={{ fill: C.textDim, fontSize: 9, angle: -30, textAnchor: 'end' }} axisLine={{ stroke: C.border }} height={50} />
                  <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} domain={[0, 100]} />
                  <Tooltip content={<TT />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: C.textDim }} />
                  <Area type="monotone" dataKey="small" name="Жижиг (<90м²)" stackId="1" stroke={C.blue} fill={C.blue} fillOpacity={0.6} />
                  <Area type="monotone" dataKey="med" name="Дунд (90-140м²)" stackId="1" stroke={C.gold} fill={C.gold} fillOpacity={0.5} />
                  <Area type="monotone" dataKey="large" name="Том (140-200м²)" stackId="1" stroke={C.green} fill={C.green} fillOpacity={0.5} />
                  <Area type="monotone" dataKey="lux" name="Тансаг (200м²+)" stackId="1" stroke={C.purple} fill={C.purple} fillOpacity={0.5} />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { label: 'Жижиг (<90м²)', color: C.blue, latest: '16%' },
                  { label: 'Дунд (90-140м²)', color: C.gold, latest: '38%' },
                  { label: 'Том (140-200м²)', color: C.green, latest: '30%' },
                  { label: 'Тансаг (200м²+)', color: C.purple, latest: '16%' }
                ].map((d, i) => (
                  <div key={i} style={{ background: `${d.color}10`, border: `1px solid ${d.color}25`, borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                    <div style={{ color: d.color, fontWeight: 700, fontSize: 16 }}>{d.latest}</div>
                    <div style={{ color: C.textDim, fontSize: 10 }}>{d.label}</div>
                    <div style={{ color: C.textDim, fontSize: 9 }}>2026-03 байдлаар</div>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Key Insights Summary */}
            <ChartCard title="Гол дүгнэлт" subtitle="Цаг хугацааны шинжилгээний үр дүн">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {[
                  { icon: '📈', title: 'Медиан үнэ тогтвортой өссөн', desc: '2024.10-д 3.19 сая₮/м²-ээс 2026.03-д 6.45 сая₮/м² хүртэл +102% өсөлттэй' },
                  { icon: '🏆', title: 'Хороо 17 дунджаас дээгүүр', desc: 'Бусад Хан-Уул хороодоос дунджаар +48% илүү үнэтэй, premium бүс' },
                  { icon: '📊', title: 'Дунд хэмжээ давамгайлсан', desc: '90-140м² хэмжээтэй орон сууц дунджаар 38-51% эзэлдэг' },
                  { icon: '🏗️', title: 'Нийлүүлэлт хэлбэлзэлтэй', desc: 'Зарын тоо сараас сард 26-179 хооронд хэлбэлздэг, тогтвортой бус' }
                ].map((d, i) => (
                  <div key={i} style={{ padding: '18px', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12 }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{d.icon}</div>
                    <div style={{ color: C.gold, fontWeight: 600, fontSize: 13, marginBottom: 5 }}>{d.title}</div>
                    <div style={{ color: C.textDim, fontSize: 12, lineHeight: 1.5 }}>{d.desc}</div>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '20px 32px', textAlign: 'center' }}>
        <p style={{ color: C.textDim, fontSize: 11, fontFamily: 'monospace', margin: 0 }}>
          Эх сурвалж: Unegui.mn · IOM Mongolia (2023) · 2024.10 – 2026.03 оны тоон мэдээлэл
        </p>
      </div>
    </div>
  );
}
