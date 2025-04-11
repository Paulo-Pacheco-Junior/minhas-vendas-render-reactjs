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
  installationDate: string;
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
  const [employeeIdArray, setEmployeeIdArray] = useState<string[]>([]);

  const [agentRole, setAgentRole] = useState("all");

  const [scrollState, setScrollState] = useState(0);

  const [filteredSales, setFilteredSales] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");

  const token = JSON.parse(localStorage.getItem("@token") || "[]");

  useEffect(() => {
    async function handleGetSales() {
      const response = await api.get("/sales", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;

      for (const sale of data) {
        if (sale.userId === "fb778f32-9ab6-48e0-b81d-c33bcc309ac5") {
          const array = JSON.parse(sale.observation);
          setEmployeeIdArray(array?.observation);
          break;
        }
      }

      setSales(data);
    }
    handleGetSales();
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value === "all" ? "all" : Number(e.target.value));
  };

  useEffect(() => {
    const salesFiltered = sales.filter((sale) => {
      if (user.role === "seller") {
        const intallationDate = new Date(sale.installationDate);

        if (selectedDay === "all") {
          return intallationDate.getMonth() === selectedMonth;
        }
        return (
          intallationDate.getMonth() === selectedMonth &&
          intallationDate.getDate() === selectedDay
        );
      } else {
        const saleDate = new Date(sale.saleDate);

        if (selectedDay === "all") {
          return saleDate.getMonth() === selectedMonth;
        }
        return (
          saleDate.getMonth() === selectedMonth &&
          saleDate.getDate() === selectedDay
        );
      }
    });

    setFilteredSales(salesFiltered);
  }, [sales, selectedMonth, selectedDay]);

  function handleRoleAll() {
    setAgentRole("all");
  }

  function handleRoleActive() {
    setAgentRole("active");
  }

  function handleRoleReceptive() {
    setAgentRole("receptive");
  }

  const getSalesCount = (
    role: string,
    selectedMonth: number,
    selectedDay: number | "all"
  ) => {
    let count = 0;

    const allowedEmployeeIdsAll = employeeIdArray;

    const allowedEmployeeIdsActive = [
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
    ];

    const allowedEmployeeIdsReceptive = [
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
    ];

    const filteredSalesByMonthAndDay = sales.filter((sale) => {
      const saleDate = new Date(sale.saleDate);

      if (selectedDay === "all") {
        return saleDate.getMonth() === selectedMonth;
      }

      return (
        saleDate.getMonth() === selectedMonth &&
        saleDate.getDate() === selectedDay
      );
    });

    if (role === "all") {
      count = filteredSalesByMonthAndDay.filter((sale) =>
        allowedEmployeeIdsAll.includes(sale.user.employeeId.toUpperCase())
      ).length;
    }

    if (role === "active") {
      count = filteredSalesByMonthAndDay.filter((sale) =>
        allowedEmployeeIdsActive.includes(sale.user.employeeId.toUpperCase())
      ).length;
    }

    if (role === "receptive") {
      count = filteredSalesByMonthAndDay.filter((sale) =>
        allowedEmployeeIdsReceptive.includes(sale.user.employeeId.toUpperCase())
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
            <span>{getSalesCount(agentRole, selectedMonth, selectedDay)}</span>
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

      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value={0}>Janeiro</option>
        <option value={1}>Fevereiro</option>
        <option value={2}>Março</option>
        <option value={3}>Abril</option>
        <option value={4}>Maio</option>
        <option value={5}>Junho</option>
        <option value={6}>Julho</option>
        <option value={7}>Agosto</option>
        <option value={8}>Setembro</option>
        <option value={9}>Outubro</option>
        <option value={10}>Novembro</option>
        <option value={11}>Dezembro</option>
      </select>

      <select
        value={selectedDay}
        onChange={handleDayChange}
        style={{ marginLeft: "0.2rem" }}
      >
        <option value={"all"}>Todos</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
        <option value={13}>13</option>
        <option value={14}>14</option>
        <option value={15}>15</option>
        <option value={16}>16</option>
        <option value={17}>17</option>
        <option value={18}>18</option>
        <option value={19}>19</option>
        <option value={20}>20</option>
        <option value={21}>21</option>
        <option value={22}>22</option>
        <option value={23}>23</option>
        <option value={24}>24</option>
        <option value={25}>25</option>
        <option value={26}>26</option>
        <option value={27}>27</option>
        <option value={28}>28</option>
        <option value={29}>29</option>
        <option value={30}>30</option>
        <option value={31}>31</option>
      </select>
      <main>
        <ul>
          {agentRole === "all" &&
          (sales.length === 0 ||
            (user.role === "seller" &&
              !sales.some((sale) => sale.userId === user.id))) ? (
            <p>Nenhuma venda encontrada.</p>
          ) : (
            filteredSales.map((sale) => {
              const isEmployeeAllowed = employeeIdArray.includes(
                sale.user.employeeId
              );

              const isSellerRole =
                user.role === "seller" && sale.userId === user.id;

              if (
                (user.role === "supervisor" && isEmployeeAllowed) ||
                isSellerRole
              ) {
                return <SaleItem key={sale.id} sale={sale} />;
              }
              return null;
            })
          )}

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
