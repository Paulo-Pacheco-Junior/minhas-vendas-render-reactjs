import { Container } from "./styles";

interface SalesFiltersProps {
  selectedMonth: number;
  selectedDay: number | "all";
  selectedStatus: string | "all";
  onMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDayChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SalesFilters({
  selectedMonth,
  selectedDay,
  selectedStatus,
  onMonthChange,
  onDayChange,
  onStatusChange,
}: SalesFiltersProps) {
  return (
    <Container>
      <select value={selectedMonth} onChange={onMonthChange}>
        {[
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ].map((month, i) => (
          <option key={i} value={i}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={selectedDay}
        onChange={onDayChange}
        style={{ marginLeft: "0.5rem" }}
      >
        <option value="all">Todos os dias</option>
        {[...Array(31)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={onStatusChange}
        style={{ marginLeft: "0.5rem" }}
      >
        <option value="all">Todos os status</option>
        <option value="inProgress">Em aprovisionamento</option>
        <option value="installed">Instaladas</option>
        <option value="pending">Pendentes</option>
        <option value="canceled">Canceladas</option>
      </select>
    </Container>
  );
}
