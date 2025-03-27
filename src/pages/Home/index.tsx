import {
  Container,
  AgentRoleButtons,
  SalesFilter,
  SalesCount,
  ScrollBtn,
  NewSaleBtn,
} from "./styles";
import api from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { SaleItem } from "../../components/SaleItem";
import { Header } from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";
import { ImportantLinks } from "../../components/ImportantLinks";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";

interface User {
  name: string;
  email: string;
  employeeId: string;
}
interface Sale {
  id: string;
  userId: string;
  cpfCnpj: string;
  state: string;
  ticket: string;
  callerIdPhone: string;
  phone: string;
  saleDate: string;
  internetPlanSpeed: string;
  internetType: string;
  installationDay: string;
  installationShift: string;
  serviceOrder: string;
  extension: string;
  employeeId: string;
  observation: string;
  user: User;
}

export function Home() {
  const { user } = useContext(UserContext);

  const [sales, setSales] = useState<Sale[]>([]);
  const [agentRole, setAgentRole] = useState("all");

  const [scrollState, setScrollState] = useState(0);

  const token = JSON.parse(localStorage.getItem("@token") || "[]");

  useEffect(() => {
    async function handleGetSales() {
      const response = await api.get("/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;

      console.log(data);

      if (JSON.stringify(data) !== JSON.stringify(sales)) {
        setSales(data);
      }
    }
    handleGetSales();
  }, [sales]);

  function handleRoleAll() {
    setAgentRole("all");
  }

  function handleRoleActive() {
    setAgentRole("active");
  }

  function handleRoleReceptive() {
    setAgentRole("receptive");
  }

  const getSalesCount = (role: string) => {
    let count = 0;

    if (role === "all") {
      count = sales.filter((sale) =>
        [
          "BC762174",
          "BC763168",
          "BC763169",
          "BC769445",
          "BC769454",
          "BC777180",
          "BC777190",
          "BC777739",
          "BC789568",
          "BC789581",
          "BC789994",
          "BC789995",
          "BC790415",
          "BC792265",
          "BC792302",
          "BC795371",
          "BC794633",
          "BC762199",
          "BC714145",
          "BC762104",
          "BC762175",
          "BC770607",
          "BC770702",
          "BC778472",
          "BC785551",
          "BC792075",
          "BC793865",
          "BC762541",
          "BC788129",
          "BC794166",
        ].includes(sale.user.employeeId.toUpperCase())
      ).length;
    }

    if (role === "active") {
      count = sales.filter((sale) =>
        [
          "BC762174",
          "BC763168",
          "BC763169",
          "BC769445",
          "BC769454",
          "BC777180",
          "BC777190",
          "BC777739",
          "BC789568",
          "BC789581",
          "BC789994",
          "BC789995",
          "BC790415",
          "BC792265",
          "BC792302",
          "BC793865",
          "BC762541",
          "BC788129",
          "BC794166",
        ].includes(sale.user.employeeId.toUpperCase())
      ).length;
    }

    if (role === "receptive") {
      count = sales.filter((sale) =>
        [
          "BC795371",
          "BC794633",
          "BC762199",
          "BC714145",
          "BC762104",
          "BC762175",
          "BC770607",
          "BC770702",
          "BC778472",
          "BC785551",
          "BC792075",
        ].includes(sale.user.employeeId.toUpperCase())
      ).length;
    }
    return count < 10 ? `0${count}` : count.toString();
  };

  function handleScroll() {
    let newScrollState = 0;

    if (scrollState === 0) {
      newScrollState = 30;
    } else if (scrollState === 30) {
      newScrollState = 60;
    } else if (scrollState === 60) {
      newScrollState = 100;
    } else if (scrollState === 100) {
      newScrollState = 0;
    }
    setScrollState(newScrollState);

    const scrollTo =
      (newScrollState / 100) * document.documentElement.scrollHeight;

    window.scrollTo({ top: scrollTo, behavior: "smooth" });
  }

  return (
    <Container>
      <Header />
      <div>
        <ImportantLinks />
      </div>
      {user.role === "supervisor" ? (
        <ScrollBtn onClick={handleScroll}>
          {scrollState === 100 ? (
            <RiArrowUpDoubleFill />
          ) : (
            <RiArrowDownDoubleFill />
          )}
        </ScrollBtn>
      ) : (
        <NewSaleBtn to="/new-sale">+ Nova Venda</NewSaleBtn>
      )}
      {user.role === "supervisor" && (
        <SalesFilter>
          <SalesCount>
            <strong>Total de Vendas: </strong>
            <span>{getSalesCount(agentRole)}</span>
          </SalesCount>
          <AgentRoleButtons style={{ paddingRight: "25rem" }}>
            <button
              className={agentRole === "all" ? "selected" : ""}
              onClick={handleRoleAll}
            >
              Todos
            </button>
            <button
              className={agentRole === "active" ? "selected" : ""}
              onClick={handleRoleActive}
            >
              Ativos
            </button>
            <button
              className={agentRole === "receptive" ? "selected" : ""}
              onClick={handleRoleReceptive}
            >
              Receptivos
            </button>
          </AgentRoleButtons>
        </SalesFilter>
      )}
      <main>
        <ul>
          {agentRole === "all" &&
            (sales.length === 0 ||
            (user.role === "seller" &&
              !sales.some((sale) => sale.userId === user.id)) ? (
              <p>Nenhuma venda encontrada.</p>
            ) : (
              sales.map((sale) => {
                if (
                  (user.role === "supervisor" &&
                    (sale.user.employeeId.toLowerCase() ===
                      "BC762174".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC763168".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC763169".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC769445".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC769454".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC777180".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC777190".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC777739".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC789568".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC789581".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC789994".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC789995".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC790415".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC792265".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC792302".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC795371".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC794633".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC762199".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC714145".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC762104".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC762175".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC770607".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC770702".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC778472".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC785551".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC792075".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC793865".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC762541".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC788129".toLowerCase() ||
                      sale.user.employeeId.toLowerCase() ===
                        "BC794166".toLowerCase())) ||
                  (user.role === "seller" && sale.userId === user.id)
                ) {
                  return <SaleItem key={sale.id} sale={sale} />;
                }
                return null;
              })
            ))}

          {agentRole === "active" &&
            sales.map((sale) => {
              if (
                user.role === "supervisor" &&
                (sale.user.employeeId.toLowerCase() ===
                  "BC762174".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC763168".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC763169".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC769445".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC769454".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC777180".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC777190".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC777739".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC789568".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC789581".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC789994".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC789995".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC790415".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC792265".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC792302".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC793865".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC762541".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC788129".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC794166".toLowerCase())
              ) {
                return <SaleItem key={sale.id} sale={sale} />;
              }
              return null;
            })}

          {agentRole === "receptive" &&
            sales.map((sale) => {
              if (
                user.role === "supervisor" &&
                (sale.user.employeeId.toLowerCase() ===
                  "BC795371".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC794633".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC762199".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC714145".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC762104".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC762175".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC770607".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC770702".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC778472".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC785551".toLowerCase() ||
                  sale.user.employeeId.toLowerCase() ===
                    "BC792075".toLowerCase())
              ) {
                return <SaleItem key={sale.id} sale={sale} />;
              }
              return null;
            })}
        </ul>
      </main>
      {user.role === "supervisor" && (
        <AgentRoleButtons style={{ marginBottom: "3rem" }}>
          <button
            className={agentRole === "all" ? "selected" : ""}
            onClick={handleRoleAll}
          >
            Todos
          </button>
          <button
            className={agentRole === "active" ? "selected" : ""}
            onClick={handleRoleActive}
          >
            Ativos
          </button>
          <button
            className={agentRole === "receptive" ? "selected" : ""}
            onClick={handleRoleReceptive}
          >
            Receptivos
          </button>
        </AgentRoleButtons>
      )}
    </Container>
  );
}
