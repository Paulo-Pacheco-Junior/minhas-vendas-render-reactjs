import { EmployeeIdInputs } from "./styles";

interface EmployeeIdManagerProps {
  handleAddEmployeeId: () => void;
  handleDeleteEmployeeId: () => void;
  employeeIdInput: string;
  setEmployeeIdInput: React.Dispatch<React.SetStateAction<string>>;
  employeeIdFilterInput: string;
  setEmployeeIdFilterInput: React.Dispatch<React.SetStateAction<string>>;
}

export function EmployeeIdManager({
  handleAddEmployeeId,
  handleDeleteEmployeeId,
  employeeIdInput,
  employeeIdFilterInput,
  setEmployeeIdInput,
  setEmployeeIdFilterInput,
}: EmployeeIdManagerProps) {
  return (
    <EmployeeIdInputs>
      <div>
        <input
          value={employeeIdInput}
          placeholder="Digite a BC"
          onChange={(e) => setEmployeeIdInput(e.target.value)}
        />
        <button type="button" onClick={handleAddEmployeeId}>
          Adicionar BC
        </button>
      </div>
      <div>
        <input
          value={employeeIdFilterInput}
          placeholder="Digite a BC"
          onChange={(e) => setEmployeeIdFilterInput(e.target.value)}
        />
        <button
          type="button"
          onClick={handleDeleteEmployeeId}
          style={{ backgroundColor: "#c62828", color: "#daddcc" }}
        >
          Excluir BC
        </button>
      </div>
    </EmployeeIdInputs>
  );
}
