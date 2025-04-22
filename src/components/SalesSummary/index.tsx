import { SalesFilter, SalesCount } from "./styles";

interface SalesSummaryProps {
  inProgress: number;
  installed: number;
  pending: number;
  canceled: number;
  total: number;
}

export function SalesSummary({
  inProgress,
  installed,
  pending,
  canceled,
  total,
}: SalesSummaryProps) {
  return (
    <SalesFilter>
      <SalesCount>
        <p>
          Em aprovisionamento: <span>{inProgress}</span>
        </p>
        <p>
          Instaladas: <span>{installed}</span>
        </p>
        <p>
          Pendentes: <span>{pending}</span>
        </p>
        <p>
          Canceladas: <span>{canceled}</span>
        </p>
        <p>
          Total: <span>{total}</span>
        </p>
      </SalesCount>
    </SalesFilter>
  );
}
