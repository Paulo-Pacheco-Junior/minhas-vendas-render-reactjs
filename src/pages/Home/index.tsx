import { Container, ScrollBtn, NewSaleBtn } from "./styles";
import api from "../../services/api";
import { useContext, useEffect, useState } from "react";
import { SaleItem } from "../../components/SaleItem";
import { Header } from "../../components/Header";
import { UserContext } from "../../contexts/UserContext";
import { ImportantLinks } from "../../components/ImportantLinks";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";
import { SalesFilters } from "../../components/SalesFilters";
import { SalesSummary } from "../../components/SalesSummary";
import { EmployeeIdManager } from "../../components/EmployeeIdManager";

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
  status: string;
}

export function Home() {
  const { user } = useContext(UserContext);

  const [sales, setSales] = useState<Sale[]>([]);
  const [filteredSales, setFilteredSales] = useState<any[]>([]);

  const [employeeIdArray, setEmployeeIdArray] = useState<string[]>([]);

  const [employeeIdInput, setEmployeeIdInput] = useState("");
  const [employeeIdFilterInput, setEmployeeIdFilterInput] = useState("");

  const [scrollState, setScrollState] = useState(0);

  const [selectedDay, setSelectedDay] = useState<number | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedStatus, setSelectedStatus] = useState<string | "all">("all");
  const [selectedCustomer, setSelectedCustomer] = useState<string | "all">(
    "all"
  );

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
  }, [sales]);

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

  const onDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(e.target.value === "all" ? "all" : Number(e.target.value));
  };

  const onMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));
  };

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(
      e.target.value === "all" ? "all" : String(e.target.value)
    );
  };

  const onCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomer(
      e.target.value === "all" ? "all" : String(e.target.value)
    );
  };

  const getSalesCountSupervisor = (
    selectedMonth: number,
    selectedDay: number | "all"
  ) => {
    const filteredSalesByMonthAndDay = sales.filter((sale) => {
      const saleDate = new Date(sale.saleDate);

      const isEmployeeAllowed = employeeIdArray.includes(sale.user.employeeId);

      if (!isEmployeeAllowed) return false;

      if (selectedDay === "all") {
        return saleDate.getMonth() === selectedMonth;
      }

      return (
        saleDate.getMonth() === selectedMonth &&
        saleDate.getDate() === selectedDay
      );
    });

    const salesFilteredInProgress = filteredSalesByMonthAndDay.filter(
      (sale) => sale.status === "Em_aprovisionamento"
    ).length;

    const salesFilteredPending = filteredSalesByMonthAndDay.filter((sale) =>
      [
        "Com_pendencia",
        "Aguardando_pagamento",
        "Pendencia_tecnica",
        "Draft",
        "Sem_slot",
      ].includes(sale.status)
    ).length;

    const salesFilteredInstalled = filteredSalesByMonthAndDay.filter(
      (sale) => sale.status === "Instalada"
    ).length;

    const salesFilteredCanceled = filteredSalesByMonthAndDay.filter(
      (sale) => sale.status === "Cancelada"
    ).length;

    const salesTotal = filteredSalesByMonthAndDay.length;

    return {
      inProgress: salesFilteredInProgress,
      pending: salesFilteredPending,
      installed: salesFilteredInstalled,
      canceled: salesFilteredCanceled,
      total: salesTotal,
    };
  };

  const { inProgress, pending, installed, canceled, total } =
    getSalesCountSupervisor(selectedMonth, selectedDay);

  const getSalesCountSeller = (
    selectedMonth: number,
    selectedDay: number | "all"
  ) => {
    const filteredSalesByMonthAndDay = sales.filter((sale) => {
      const installationDate = new Date(sale.installationDate);

      if (selectedDay === "all") {
        return installationDate.getMonth() === selectedMonth;
      }

      return (
        installationDate.getMonth() === selectedMonth &&
        installationDate.getDate() === selectedDay
      );
    });

    const salesFilteredInProgress = filteredSalesByMonthAndDay.filter(
      (sale) => sale.status === "Em_aprovisionamento"
    ).length;

    const salesFilteredPending = filteredSalesByMonthAndDay.filter((sale) =>
      [
        "Com_pendencia",
        "Aguardando_pagamento",
        "Pendencia_tecnica",
        "Draft",
        "Sem_slot",
      ].includes(sale.status)
    ).length;

    const salesFilteredInstalled = filteredSalesByMonthAndDay.filter(
      (sale) => sale.status === "Instalada"
    ).length;

    const salesFilteredCanceled = filteredSalesByMonthAndDay.filter(
      (sale) => sale.status === "Cancelada"
    ).length;

    const salesTotal = filteredSalesByMonthAndDay.length;

    return {
      installationInProgress: salesFilteredInProgress,
      installationPending: salesFilteredPending,
      installationInstalled: salesFilteredInstalled,
      installationCanceled: salesFilteredCanceled,
      installationTotal: salesTotal,
    };
  };

  const {
    installationInProgress,
    installationPending,
    installationInstalled,
    installationCanceled,
    installationTotal,
  } = getSalesCountSeller(selectedMonth, selectedDay);

  async function handleAddEmployeeId() {
    if (
      !employeeIdArray.includes(employeeIdInput.toUpperCase()) &&
      employeeIdInput.trim().toUpperCase() !== ""
    ) {
      const newArray = [employeeIdInput.toUpperCase(), ...employeeIdArray];
      const jsonFormatted = `{"observation": ${JSON.stringify(newArray)}}`;

      await api.put(`/sales/${1}`, {
        userId: user.id,
        cpfCnpj: "-",
        region: "-",
        ticket: "-",
        callerIdPhone: "-",
        phone: "-",
        saleDate: new Date().toISOString(),
        internetPlanSpeed: "-",
        paymentMethod: "-",
        internetType: "-",
        installationDate: new Date().toISOString(),
        installationShift: "-",
        customerName: "-",
        serviceOrder: "-",
        extension: "-",
        status: "Em_aprovisionamento",
        observation: jsonFormatted,
      });
    }

    setEmployeeIdInput("");
  }

  async function handleDeleteEmployeeId() {
    if (
      employeeIdArray.includes(employeeIdFilterInput.toUpperCase()) &&
      employeeIdFilterInput.trim().toUpperCase() !== ""
    ) {
      const newArray = employeeIdArray.filter(
        (item) => item !== employeeIdFilterInput.toUpperCase()
      );

      const jsonFormatted = `{"observation": ${JSON.stringify(newArray)}}`;

      await api.put(`/sales/${1}`, {
        userId: user.id,
        cpfCnpj: "-",
        region: "-",
        ticket: "-",
        callerIdPhone: "-",
        phone: "-",
        saleDate: new Date().toISOString(),
        internetPlanSpeed: "-",
        paymentMethod: "-",
        internetType: "-",
        installationDate: new Date().toISOString(),
        installationShift: "-",
        customerName: "-",
        serviceOrder: "-",
        extension: "-",
        status: "Em_aprovisionamento",
        observation: jsonFormatted,
      });

      setEmployeeIdFilterInput("");
    }
    setEmployeeIdFilterInput("");
  }

  const pendingStatuses = [
    "Com_pendencia",
    "Aguardando_pagamento",
    "Pendencia_tecnica",
    "Draft",
    "Sem_slot",
  ];

  // useEffect(() => {
  //   const salesFiltered = sales.filter((sale) => {
  //     if (user.role === "seller") {
  //       const installationDate = new Date(sale.installationDate);

  //       if (selectedDay === "all") {
  //         return installationDate.getMonth() === selectedMonth;
  //       }
  //       return (
  //         installationDate.getMonth() === selectedMonth &&
  //         installationDate.getDate() === selectedDay
  //       );
  //     } else {
  //       const saleDate = new Date(sale.saleDate);

  //       if (selectedDay === "all") {
  //         return saleDate.getMonth() === selectedMonth;
  //       }
  //       return (
  //         saleDate.getMonth() === selectedMonth &&
  //         saleDate.getDate() === selectedDay
  //       );
  //     }
  //   });

  //   setFilteredSales(salesFiltered);
  // }, [sales, selectedDay, selectedMonth]);

  useEffect(() => {
    const salesFiltered = sales.filter((sale) => {
      const cpfCnpjClean = sale.cpfCnpj?.trim().replace(/\D/g, "");

      const isCustomerHome =
        selectedCustomer === "home" ? cpfCnpjClean?.length === 11 : true;

      const isCustomerBusiness =
        selectedCustomer === "business" ? cpfCnpjClean?.length === 14 : true;

      if (!(isCustomerHome && isCustomerBusiness)) return false;

      if (user.role === "seller") {
        const installationDate = new Date(sale.installationDate);

        if (selectedDay === "all") {
          return (
            installationDate.getMonth() === selectedMonth &&
            isCustomerHome &&
            isCustomerBusiness
          );
        }

        return (
          installationDate.getMonth() === selectedMonth &&
          installationDate.getDate() === selectedDay &&
          isCustomerHome &&
          isCustomerBusiness
        );
      } else {
        const saleDate = new Date(sale.saleDate);

        if (selectedDay === "all") {
          return (
            saleDate.getMonth() === selectedMonth &&
            isCustomerHome &&
            isCustomerBusiness
          );
        }

        return (
          saleDate.getMonth() === selectedMonth &&
          saleDate.getDate() === selectedDay &&
          isCustomerHome &&
          isCustomerBusiness
        );
      }
    });

    setFilteredSales(salesFiltered);
  }, [sales, selectedDay, selectedMonth, selectedCustomer]);

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

      {user.role === "seller" && (
        <SalesSummary
          inProgress={installationInProgress}
          installed={installationInstalled}
          pending={installationPending}
          canceled={installationCanceled}
          total={installationTotal}
        />
      )}

      {user.role === "supervisor" && (
        <SalesSummary
          inProgress={inProgress}
          installed={installed}
          pending={pending}
          canceled={canceled}
          total={total}
        />
      )}

      <SalesFilters
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedStatus={selectedStatus}
        selectedCustomer={selectedCustomer}
        onMonthChange={onMonthChange}
        onDayChange={onDayChange}
        onStatusChange={onStatusChange}
        onCustomerChange={onCustomerChange}
      />

      <main>
        <ul>
          {(user.role === "supervisor" && sales.length === 0) ||
          (user.role === "seller" &&
            !sales.some((sale) => sale.userId === user.id)) ? (
            <p>Nenhuma venda encontrada.</p>
          ) : (
            filteredSales
              .filter((sale) => {
                if (selectedStatus === "all") {
                  return sale;
                } else if (selectedStatus === "inProgress") {
                  return sale.status === "Em_aprovisionamento";
                } else if (selectedStatus === "installed") {
                  return sale.status === "Instalada";
                } else if (selectedStatus === "pending") {
                  return pendingStatuses.includes(sale.status);
                } else if (selectedStatus === "canceled") {
                  return sale.status === "Cancelada";
                }
                return "all";
              })
              .map((sale) => {
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
        </ul>
      </main>
      {user.role === "supervisor" && (
        <EmployeeIdManager
          handleAddEmployeeId={handleAddEmployeeId}
          handleDeleteEmployeeId={handleDeleteEmployeeId}
          employeeIdInput={employeeIdInput}
          setEmployeeIdInput={setEmployeeIdInput}
          employeeIdFilterInput={employeeIdFilterInput}
          setEmployeeIdFilterInput={setEmployeeIdFilterInput}
        />
      )}
    </Container>
  );
}
