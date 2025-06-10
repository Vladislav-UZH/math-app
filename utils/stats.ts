/** --------- тип таблиці розподілу --------- */
export interface Row {
  x: number | string; // Xi або службова мітка "<a", "≥b"
  n: number; // абсолютна частота
  f: number; // відносна частота
  N: number; // кумулятивна абсолютна
  F: number; // кумулятивна відносна
}

/** базова таблиця */
export function buildTable(values: number[]): Row[] {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const cnt = new Map<number, number>();
  sorted.forEach((v) => cnt.set(v, (cnt.get(v) ?? 0) + 1));

  let cum = 0;
  const rows: Row[] = [];
  for (const [x, ni] of [...cnt.entries()].sort((a, b) => a[0] - b[0])) {
    cum += ni;
    rows.push({ x, n: ni, f: ni / n, N: cum, F: cum / n });
  }
  return rows;
}

/** той самий масив, але з «рамкою» 0 / 1 для F */
export function buildTableWithBounds(values: number[]): Row[] {
  const core = buildTable(values);
  if (!core.length) return core;
  const n = values.length;
  return [
    { x: `<${core[0].x}`, n: 0, f: 0, N: 0, F: 0 },
    ...core,
    { x: `≥${core.at(-1)!.x}`, n: 0, f: 0, N: n, F: 1 },
  ];
}

export function polygonData(rows: Row[]) {
  return {
    labels: rows.map((r) => r.x.toString()),
    abs: rows.map((r) => r.n),
    rel: rows.map((r) => r.f),
  };
}

export interface XY {
  x: number;
  y: number;
}

export function cdfPoints(rows: Row[]): XY[] {
  if (!rows.length) return [];
  const pts: XY[] = [{ x: rows[0].x as number, y: 0 }];
  rows.forEach((r, i) => {
    pts.push({ x: r.x as number, y: r.F });
    if (i === rows.length - 1) pts.push({ x: r.x as number, y: 1 });
  });
  return pts;
}

/* текст вигляду F(x) = { ... } */
export function cdfExpr(rows: Row[]): string {
  const parts = [`0,  x < ${rows[0].x}`];
  rows.forEach((r, i) => {
    const next = rows[i + 1]?.x ?? "∞";
    parts.push(`${r.F.toFixed(3)},  ${r.x} ≤ x < ${next}`);
  });
  parts.push("1,  x ≥ " + rows.at(-1)!.x);
  return `F(x) = { ${parts.join(";\n         ")} }`;
}

export interface IntRow {
  a: number;
  b: number;
  n: number;
  f: number;
  dens: number;
}

/** k – число інтервалів; merge0 – зливати порожні */
export function intervalDist(
  values: number[],
  k: number,
  merge0 = false
): IntRow[] {
  if (!values.length) return [];
  const min = Math.min(...values),
    max = Math.max(...values);
  const h = (max - min) / k;
  const bins = Array.from({ length: k }, (_, i) => ({
    a: min + i * h,
    b: min + (i + 1) * h,
    n: 0,
  }));
  values.forEach((v) => {
    let idx = Math.min(Math.floor((v - min) / h), k - 1);
    bins[idx].n++;
  });

  let rows: IntRow[] = bins.map((r) => ({
    ...r,
    f: r.n / values.length,
    dens: r.n / (values.length * h),
  }));

  if (merge0) {
    rows = rows.reduce<IntRow[]>((acc, r) => {
      if (r.n === 0 && acc.length) acc[acc.length - 1].b = r.b;
      else acc.push(r);
      return acc;
    }, []);
  }
  return rows;
}

/* рекомендоване k за Стерджесом */
export const kSturges = (n: number) => Math.round(1 + 3.322 * Math.log10(n));

/* ---------- числові показники ---------- */
export interface NumStats {
  mean: number;
  median: number;
  modes: number[]; // може бути кілька
  variance: number; // несмещена, / (n‑1)
  stdev: number;
}

export function numericStats(values: number[]): NumStats | null {
  const n = values.length;
  if (!n) return null;

  const sorted = [...values].sort((a, b) => a - b);
  const mean = sorted.reduce((s, v) => s + v, 0) / n;

  // медіана
  const mid = Math.floor(n / 2);
  const median = n % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  // мода(и)
  const freq = new Map<number, number>();
  sorted.forEach((v) => freq.set(v, (freq.get(v) ?? 0) + 1));
  const maxFreq = Math.max(...freq.values());
  const modes = [...freq.entries()]
    .filter(([, f]) => f === maxFreq)
    .map(([v]) => v);

  // дисперсія (n‑1)
  const variance = sorted.reduce((s, v) => s + (v - mean) ** 2, 0) / (n - 1);
  const stdev = Math.sqrt(variance);

  return { mean, median, modes, variance, stdev };
}
