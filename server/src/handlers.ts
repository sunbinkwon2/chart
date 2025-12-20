import { LinePoint, ScatterPoint } from './types';
import { db } from './db';

export async function handleLine(data: LinePoint[]) {
  // 예시: 평균 계산
  const avg =
    data.reduce((sum, p) => sum + p.y, 0) / data.length;

  await db.query(
    'INSERT INTO chart_logs(type, result) VALUES($1, $2)',
    ['LINE', avg]
  );

  return { average: avg };
}

export async function handleScatter(data: ScatterPoint[]) {
  const count = data.length;

  await db.query(
    'INSERT INTO chart_logs(type, result) VALUES($1, $2)',
    ['SCATTER', count]
  );

  return { count };
}
