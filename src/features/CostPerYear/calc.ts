export interface CostBreakdown {
  annual: number;
  monthly: number;
  daily: number;
}

export function calculateCosts(amount: number, period: 'day' | 'month' | 'year'): CostBreakdown {
  let annual: number;
  if (period === 'year') {
    annual = amount;
  } else if (period === 'month') {
    annual = amount * 12;
  } else { // 'day'
    annual = amount * 365;
  }
  const monthly = annual / 12;
  const daily = annual / 365;
  return { annual, monthly, daily };
}
