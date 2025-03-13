import { useContext } from "react";
import api from "../../services/api";
import { Container, SaleButtons, SaleContent, Agent, Footer } from "./styles";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export function SaleItem({ sale }: any) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  async function handleEditSale(id: string) {
    if (user.employeeId === sale.user.employeeId) {
      navigate(`edit-sale/${id}`);
    }
  }

  async function handleDeleteSale(id: string) {
    if (user.employeeId === sale.user.employeeId) {
      await api.delete(`sales/${id}`);
    }
  }

  const saleDate = sale.saleDate;
  const installationDate = sale.installationDate;

  const formattedSaleDate = saleDate
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date(saleDate))
    : "-";

  const formattedInstallationDate = installationDate
    ? new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date(installationDate))
    : "-";

  return (
    <Container
      style={{
        backgroundColor:
          sale.observation === "Instalada"
            ? "#00433d"
            : sale.observation === "Cancelada"
            ? "#510508"
            : sale.observation === "Com pendência"
            ? "#694f01"
            : sale.observation === "Aguardando pagamento"
            ? "#694f01"
            : sale.observation === "Pendência técnica"
            ? "#694f01"
            : sale.observation === "Draft"
            ? "#694f01"
            : sale.observation === "Sem slot"
            ? "#694f01"
            : sale.observation === "Em aprovisionamento"
            ? "#312E38"
            : "#312E38",
      }}
    >
      <SaleContent>
        <div>
          <p>
            <span>CPF/CNPJ:</span> {sale.cpfCnpj}
          </p>
          <p>
            <span>UF:</span> {sale.region}
          </p>
          <p>
            <span>Ticket:</span> {sale.ticket}
          </p>
          <p>
            <span>N° Binado:</span> {sale.callerIdPhone}
          </p>
          <p>
            <span>N° Contato:</span> {sale.phone}
          </p>
        </div>
        <div>
          <p>
            <span>Data da Venda:</span> {formattedSaleDate}
          </p>
          <p>
            <span>Velocidade:</span> {sale.internetPlanSpeed}
          </p>
          <p>
            <span>Pagamento:</span> {sale.paymentMethod}
          </p>
          <p>
            <span>Tipo:</span> {sale.internetType}
          </p>
          <p>
            <span>Data da Instalação:</span> {formattedInstallationDate}
          </p>
          <p>
            <span>Horário:</span> {sale.installationShift}
          </p>
        </div>
        <div>
          <p>
            <span>Nome do Cliente:</span> {sale.customerName}
          </p>
          <p>
            <span>Os:</span> {sale.serviceOrder}
          </p>
          <p>
            <span>Ramal:</span> {sale.extension}
          </p>
          <p>
            <span>Status:</span>
            {sale.status === "" ? "Em aprovisionamento" : sale.status}
          </p>
          {/* <p>
            <span>Observação:</span> {sale.observation}
          </p> */}
        </div>
      </SaleContent>
      <Footer>
        {user.role === "supervisor" && (
          <Agent>
            <li>{sale.user.name}</li>
            <li>{sale.user.employeeId}</li>
          </Agent>
        )}
        <SaleButtons>
          {user.employeeId === sale.user.employeeId && (
            <button
              onClick={() => handleEditSale(sale.id)}
              style={{
                backgroundColor: "#cdcd69",
                color: "black",
              }}
            >
              Editar
            </button>
          )}
          {user.employeeId === sale.user.employeeId && (
            <button onClick={() => handleDeleteSale(sale.id)}>Excluir</button>
          )}
        </SaleButtons>
      </Footer>
    </Container>
  );
}
