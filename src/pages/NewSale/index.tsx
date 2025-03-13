import { useContext, useState } from "react";
import api from "../../services/api";
import { Container, NewSaleBtn } from "./styles";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { LinkBtn } from "../../components/LinkBtn";
import { toDate } from "date-fns-tz";

export function NewSale() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [cpfCnpj, setCpfCnpj] = useState("");
  const [region, setRegion] = useState("");
  const [ticket, setTicket] = useState("");
  const [callerIdPhone, setCallerIdPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [internetPlanSpeed, setInternetPlanSpeed] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [internetType, setInternetType] = useState("");
  const [installationDate, setInstallationDate] = useState("");
  const [installationShift, setInstallationShift] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [serviceOrder, setServiceOrder] = useState("");
  const [extension, setExtension] = useState("");
  // const [observation, setObservation] = useState("");

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  const handleInternetPlanSpeedChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInternetPlanSpeed(e.target.value);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleInternetTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInternetType(e.target.value);
  };

  const handleInstallationShiftChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setInstallationShift(e.target.value);
  };

  const timeZone = "America/Sao_Paulo";

  async function handleCreateSale(e: any) {
    e.preventDefault();

    await api.post("/sales", {
      userId: user.id,
      cpfCnpj,
      region,
      ticket,
      callerIdPhone,
      phone,
      saleDate: saleDate ? toDate(saleDate, { timeZone }) : null,
      internetPlanSpeed,
      paymentMethod,
      internetType,
      installationDate: installationDate
        ? toDate(installationDate, { timeZone })
        : null,
      installationShift,
      customerName,
      serviceOrder,
      extension,
      // observation,
    });

    navigate("/");
  }

  return (
    <Container>
      <form onSubmit={handleCreateSale}>
        <div>
          <label>
            CPF/CNPJ:
            <input
              type="text"
              placeholder="..."
              value={cpfCnpj}
              onChange={(e) => setCpfCnpj(e.target.value)}
            />
          </label>
          <label>
            UF:
            <select id="region" value={region} onChange={handleRegionChange}>
              <option value="">Selecione...</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </label>
          <label>
            Ticket:
            <input
              type="text"
              placeholder="..."
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
            />
          </label>
          <label>
            N° Binado:
            <input
              type="text"
              placeholder="..."
              value={callerIdPhone}
              onChange={(e) => setCallerIdPhone(e.target.value)}
            />
          </label>
          <label>
            N° Contato:
            <input
              type="text"
              placeholder="..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Data da Venda:
            <input
              type="date"
              placeholder="dd/mm/aa"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
              maxLength={8}
            />
          </label>
          <label>
            Velocidade:
            <select
              id="internetPlanSpeed"
              value={internetPlanSpeed}
              onChange={handleInternetPlanSpeedChange}
            >
              <option value="">Selecione...</option>
              <option value="500 Mb">500 Mb</option>
              <option value="700 Mb">700 Mb</option>
              <option value="1 Giga">1 Giga</option>
              <option value="500 Mb - Fibra X">500 Mb - Fibra X</option>
              <option value="700 Mb - Fibra X">700 Mb - Fibra X</option>
              <option value="1 Giga - Fibra x">1 Giga - Fibra X</option>
            </select>
          </label>
          <label>
            Pagamento:
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="">Selecione...</option>
              <option value="Boleto">Boleto</option>
              <option value="Débito em Conta">Débito em Conta</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
            </select>
          </label>
          <label>
            Legado ou Nova Fibra?:
            <select
              id="internetType"
              value={internetType}
              onChange={handleInternetTypeChange}
            >
              <option value="">Selecione...</option>
              <option value="Legado">Legado</option>
              <option value="Nova Fibra">Nova Fibra</option>
            </select>
          </label>
          <label>
            Data da Instalação:
            <input
              type="date"
              placeholder="dd/mm/aa"
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              maxLength={8}
            />
          </label>
          <label>
            Horário:
            <select
              id="installationShift"
              value={installationShift}
              onChange={handleInstallationShiftChange}
            >
              <option value="">Selecione...</option>
              <option value="8 as 12">8 as 12</option>
              <option value="13 as 18">13 as 18</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Nome do Cliente:
            <input
              type="text"
              placeholder="..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </label>
          <label>
            OS:
            <input
              type="text"
              placeholder="..."
              value={serviceOrder}
              onChange={(e) => setServiceOrder(e.target.value)}
            />
          </label>
          <label>
            Ramal:
            <input
              type="text"
              placeholder="..."
              value={extension}
              onChange={(e) => setExtension(e.target.value)}
            />
          </label>
          {/* <label>
            Observação:
            <textarea
              placeholder="..."
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
            />
          </label> */}
          <div className="buttons">
            <NewSaleBtn type="submit">Criar Venda</NewSaleBtn>
            <LinkBtn title="voltar" to="/" />
          </div>
        </div>
      </form>
    </Container>
  );
}
