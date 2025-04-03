import { useContext, useState } from "react";
import api from "../../services/api";
import {
  Container,
  SaleButtons,
  SaleContent,
  Agent,
  Footer,
  Observation,
} from "./styles";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { toDate } from "date-fns-tz";

export function SaleItem({ sale }: any) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [observation, setObservation] = useState(sale.observation);

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

  const transformStatus = (status: string) => {
    return status.replace(/_/g, " ");
  };

  const timeZone = "America/Sao_Paulo";

  async function handleChangeObservation(id: string) {
    await api.put(`/sales/${id}`, {
      userId: user.id,
      cpfCnpj: sale.cpfCnpj,
      region: sale.region,
      ticket: sale.ticket,
      callerIdPhone: sale.callerIdPhone,
      phone: sale.phone,
      saleDate: sale.saleDate ? toDate(sale.saleDate, { timeZone }) : null,
      internetPlanSpeed: sale.internetPlanSpeed,
      paymentMethod: sale.paymentMethod,
      internetType: sale.interntType,
      installationDate: sale.installationDate
        ? toDate(sale.installationDate, { timeZone })
        : null,
      installationShift: sale.installationShift,
      customerName: sale.customerName,
      serviceOrder: sale.serviceOrder,
      extension: sale.extension,
      status: sale.status,
      observation,
    });
    navigate("/");
  }

  return (
    <Container
      style={{
        border:
          sale.status === "Instalada"
            ? "1px solid #0a8d3c"
            : sale.status === "Cancelada"
            ? "1px solid #a80f14"
            : sale.status === "Com_pendencia"
            ? "1px solid #a07d14"
            : sale.status === "Aguardando_pagamento"
            ? "1px solid #a07d14"
            : sale.status === "Pendencia_tecnica"
            ? "1px solid #a07d14"
            : sale.status === "Draft"
            ? "1px solid #a07d14"
            : sale.status === "Sem_slot"
            ? "1px solid #a07d14"
            : sale.status === "Em_aprovisionamento"
            ? "1px solid #312E38"
            : "1px solid #312E38",
        backgroundColor:
          sale.status === "Instalada"
            ? "#2b302c"
            : sale.status === "Cancelada"
            ? "#3f2121"
            : sale.status === "Com_pendencia"
            ? "#30302b"
            : sale.status === "Aguardando_pagamento"
            ? "#30302b"
            : sale.status === "Pendencia_tecnica"
            ? "#30302b"
            : sale.status === "Draft"
            ? "#30302b"
            : sale.status === "Sem_slot"
            ? "#30302b"
            : sale.status === "Em_aprovisionamento"
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
            <span>Status:</span>{" "}
            {transformStatus(sale.status) === ""
              ? "Em aprovisionamento"
              : transformStatus(sale.status)}
          </p>
          <Observation>
            <span>Observação:</span>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            >
              {sale.observation}
            </textarea>
            {user.role === "seller" && (
              <button onClick={() => handleChangeObservation(sale.id)}>
                Salvar
              </button>
            )}
          </Observation>
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
            <button type="submit" onClick={() => handleDeleteSale(sale.id)}>
              Excluir
            </button>
          )}
        </SaleButtons>
      </Footer>
    </Container>
  );
}
