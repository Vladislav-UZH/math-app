export default function () {
  // 1. Статистичні розподіли
  const getAbsoluteFreq = (data: number[]) => {
    const map = new Map<number, number>();
    data.forEach((v) => map.set(v, (map.get(v) || 0) + 1));
    return Array.from(map.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([value, frequency]) => ({ value, frequency }));
  };

  const getRelativeFreq = (data: number[]) => {
    const abs = getAbsoluteFreq(data);
    const n = data.length;
    return abs.map(({ value, frequency }) => ({
      value,
      relFreq: frequency / n,
    }));
  };

  const getCumulativeFreq = (data: number[]) => {
    const abs = getAbsoluteFreq(data);
    let cum = 0;
    return abs.map(({ value, frequency }) => {
      cum += frequency;
      return { value, cumFreq: cum };
    });
  };

  const getCumulativeRelFreq = (data: number[]) => {
    const rel = getRelativeFreq(data);
    let cum = 0;
    return rel.map(({ value, relFreq }) => {
      cum += relFreq;
      return { value, cumRelFreq: cum };
    });
  };

  // 2. Графіки: полігони
  const getPolygonData = (data: number[]) => {
    const abs = getAbsoluteFreq(data);
    return {
      labels: abs.map((r) => r.value.toString()),
      datasets: [
        { label: "Частота", data: abs.map((r) => r.frequency), fill: false },
      ],
    };
  };

  const getRelativePolygonData = (data: number[]) => {
    const rel = getRelativeFreq(data);
    return {
      labels: rel.map((r) => r.value.toString()),
      datasets: [
        {
          label: "Відносна частота",
          data: rel.map((r) => r.relFreq),
          fill: false,
        },
      ],
    };
  };

  // 3. Емпірична функція розподілу
  const getECDF = (data: number[]) => {
    const sortedAll = [...data].sort((a, b) => a - b);
    const N = sortedAll.length;
    const result: { x: number; y: number }[] = [];
    let count = 0;
    for (let i = 0; i < N; i++) {
      count++;
      if (i === N - 1 || sortedAll[i] !== sortedAll[i + 1]) {
        result.push({ x: sortedAll[i], y: count / N });
      }
    }
    return result;
  };

  // 4. Інтервальні розподіли
  const getSturgesBins = (data: number[]) => {
    const n = data.length;
    const k = Math.ceil(Math.log2(n) + 1);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const h = (max - min) / k;
    const bins: { from: number; to: number }[] = [];
    for (let i = 0; i < k; i++) {
      bins.push({
        from: min + i * h,
        to: i === k - 1 ? max : min + (i + 1) * h,
      });
    }
    return bins;
  };
  // Коригувати кількісит інтепвалів
  //Формула Стёрджеса: k = 1 + 3.322 * log10(n)

  const getHistogramData = (data: number[]) => {
    const bins = getSturgesBins(data);
    const freqs = bins.map((b, idx) => {
      if (idx === bins.length - 1) {
        return data.filter((v) => v >= b.from && v <= b.to).length;
      }
      return data.filter((v) => v >= b.from && v < b.to).length;
    });
    return {
      labels: bins.map((b) => `${b.from.toFixed(2)}-${b.to.toFixed(2)}`),
      datasets: [{ label: "Частота", data: freqs }],
    };
  };

  // 5. Числові характеристики
  const getMean = (data: number[]) => {
    if (data.length === 0) return NaN;
    return data.reduce((sum, v) => sum + v, 0) / data.length;
  };

  const getMedian = (data: number[]) => {
    if (data.length === 0) return NaN;
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  const getMode = (data: number[]) => {
    const map = new Map<number, number>();
    data.forEach((v) => map.set(v, (map.get(v) || 0) + 1));
    let maxFreq = 0;
    let modes: number[] = [];
    map.forEach((freq, val) => {
      if (freq > maxFreq) {
        maxFreq = freq;
        modes = [val];
      } else if (freq === maxFreq) {
        modes.push(val);
      }
    });
    return modes;
  };

  const getVariance = (data: number[]) => {
    if (data.length === 0) return NaN;
    const mean = getMean(data);
    return data.reduce((sum, v) => sum + (v - mean) ** 2, 0) / data.length;
  };

  const getStdDev = (data: number[]) => {
    const varValue = getVariance(data);
    return isNaN(varValue) ? NaN : Math.sqrt(varValue);
  };

  return {
    getAbsoluteFreq,
    getRelativeFreq,
    getCumulativeFreq,
    getCumulativeRelFreq,
    getPolygonData,
    getRelativePolygonData,
    getECDF,
    getHistogramData,
    getMean,
    getMedian,
    getMode,
    getVariance,
    getStdDev,
  };
}
