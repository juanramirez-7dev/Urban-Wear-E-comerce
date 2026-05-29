
import { useMemo } from "react"
import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import {
  IconChartBar,
  IconPackage,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useAuth } from "../../hooks/useAuth"
import { orderService } from "../../services/orderService"
import type { StatisticsResponse } from "../../types/statisticTypes"

const MONTH_LABELS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value)

const getMonthName = (month: number) => MONTH_LABELS[month - 1] ?? `Mes ${month}`

export default function AdminDashboard() {
  const { token } = useAuth()

  const {
    data,
    isLoading,
    isError,
    error
  } = useQuery<StatisticsResponse, Error>({
    queryKey: ["admin-statistics"],
    queryFn: () => orderService.getStatistics(token ?? ""),
    enabled: Boolean(token),
  })


  const pedidosPorMes = useMemo(() => {
    const pedidosMap = new Map<number, number>()

    for (const item of data?.pedidosPorMes ?? []) {
      pedidosMap.set(item.mes, item.cantidadPedidos)
    }

    return Array.from({ length: 12 }, (_, index) => {
      const month = index + 1
      return {
        mes: month,
        label: getMonthName(month),
        cantidadPedidos: pedidosMap.get(month) ?? 0
      }
    })
  }, [data?.pedidosPorMes])

  const chartData = useMemo(
    () =>
      pedidosPorMes.map((item) => ({
        nombre: item.label,
        ventas: item.cantidadPedidos,
      })),
    [pedidosPorMes]
  )

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-background p-margin-mobile md:p-margin-desktop">
        <div className="absolute inset-0 -z-10 bg-background" />
        <p className="font-body-md text-secondary">Cargando estadisticas...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-background p-margin-mobile md:p-margin-desktop">
        <p className="font-body-md text-error">
          {error?.message ?? "No pudimos cargar el panel de administración."}
        </p>
      </section>
    )
  }

  const statistics = data ?? {
    cantidadPedidos: 0,
    totalGenerado: 0,
    clientesRegistrados: 0,
    totalPorProductos: 0,
    pedidosPorMes: [],
    topProductosMasVendidos: []
  }


  return (
    <section className="relative min-h-screen overflow-hidden bg-background p-margin-mobile md:p-margin-desktop">
      <div className="absolute inset-0 -z-10 bg-background" />

      <header className="mb-stack-lg">
        <div className="max-w-4xl">
          <p className="font-label-sm text-secondary uppercase tracking-widest">
            Panel de administración
          </p>
          <h1 className="mt-2 font-display-lg text-display-lg text-primary uppercase">
            Resumen general
          </h1>
          <p className="mt-2 max-w-3xl font-body-md text-secondary">
            Vista general de pedidos, ingresos, clientes, productos y rendimiento de ventas.
          </p>
        </div>
      </header>

      <section className="grid gap-gutter md:grid-cols-2 xl:grid-cols-4 mb-stack-lg">
        <article className="group relative overflow-hidden border border-outline-variant bg-surface-container-lowest p-6 transition-colors duration-300 hover:bg-primary hover:text-on-primary">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-label-sm uppercase tracking-widest text-secondary transition-colors duration-300 group-hover:text-on-primary/70">
                Cantidad de pedidos
              </p>
              <p className="mt-3 font-display-lg text-headline-md text-primary transition-colors duration-300 group-hover:text-on-primary">
                {statistics.cantidadPedidos}
              </p>
            </div>
            <IconShoppingCart className="size-6 shrink-0 text-secondary transition-colors duration-300 group-hover:text-on-primary/80" />
          </div>
          <p className="mt-6 font-body-md text-secondary transition-colors duration-300 group-hover:text-on-primary/80">
            Seguimiento del volumen total de pedidos.
          </p>
        </article>
        <article className="group border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:bg-primary hover:text-on-primary">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-label-sm text-secondary uppercase tracking-widest transition-colors duration-300 group-hover:text-on-primary/70">
                Total generado
              </p>
              <p className="mt-3 font-display-lg text-headline-md text-primary transition-colors duration-300 group-hover:text-on-primary">
                {formatCurrency(statistics.totalGenerado)}
              </p>
            </div>
            <IconChartBar className="size-6 shrink-0 text-secondary transition-colors duration-300 group-hover:text-on-primary/80" />
          </div>
          <p className="mt-6 font-body-md text-secondary transition-colors duration-300 group-hover:text-on-primary/80">
            Ingresos acumulados del panel administrativo.
          </p>
        </article>
        <article className="group border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:bg-primary hover:text-on-primary">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-label-sm text-secondary uppercase tracking-widest transition-colors duration-300 group-hover:text-on-primary/70">
                Clientes registrados
              </p>
              <p className="mt-3 font-display-lg text-headline-md text-primary transition-colors duration-300 group-hover:text-on-primary">
                {statistics.clientesRegistrados}
              </p>
            </div>
            <IconUsers className="size-6 shrink-0 text-secondary transition-colors duration-300 group-hover:text-on-primary/80" />
          </div>
          <p className="mt-6 font-body-md text-secondary transition-colors duration-300 group-hover:text-on-primary/80">
            Usuarios activos dentro de la plataforma.
          </p>
        </article>
        <article className="group border border-outline-variant bg-surface-container-lowest p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:bg-primary hover:text-on-primary">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-label-sm text-secondary uppercase tracking-widest transition-colors duration-300 group-hover:text-on-primary/70">
                Total de productos
              </p>
              <p className="mt-3 font-display-lg text-headline-md text-primary transition-colors duration-300 group-hover:text-on-primary">
                {statistics.totalPorProductos}
              </p>
            </div>
            <IconPackage className="size-6 shrink-0 text-secondary transition-colors duration-300 group-hover:text-on-primary/80" />
          </div>
          <p className="mt-6 font-body-md text-secondary transition-colors duration-300 group-hover:text-on-primary/80">
            Catálogo disponible para venta y gestión.
          </p>
        </article>
      </section>

      <div className="grid gap-gutter xl:grid-cols-3 items-start">
        <section className="min-w-0 xl:col-span-2 border border-outline-variant bg-surface-container-lowest p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label-sm text-secondary uppercase tracking-widest">
                Año 2026
              </p>
              <h2 className="mt-2 font-headline-sm text-primary uppercase tracking-tight">
                Pedidos por mes
              </h2>
            </div>
            <p className="font-body-md text-secondary">
              Cantidad de pedidos en cada mes del año.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-outline-variant bg-background p-4">
            <div className="h-72 w-full sm:h-80 lg:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 16, left: 0, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cfc4c5" />
                  <XAxis
                    dataKey="nombre"
                    tickLine={false}
                    axisLine={{ stroke: "#cfc4c5" }}
                    minTickGap={8}
                    tick={{ fill: "#625e56", fontSize: 11 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={{ stroke: "#cfc4c5" }}
                    tick={{ fill: "#625e56", fontSize: 11 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                    formatter={(value) => [value ?? 0, "Pedidos"]}
                    labelFormatter={(label) => `Mes: ${label}`}
                    contentStyle={{
                      border: "1px solid #cfc4c5",
                      borderRadius: 8,
                      background: "#ffffff",
                      color: "#191c1e",
                    }}
                  />
                  <Bar
                    dataKey="ventas"
                    fill="#000000"
                    radius={[6, 6, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="min-w-0 border border-outline-variant bg-surface-container-lowest p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-label-sm text-secondary uppercase tracking-widest">
                Top ventas
              </p>
              <h2 className="mt-2 font-headline-sm text-primary uppercase tracking-tight">
                Productos destacados
              </h2>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {statistics.topProductosMasVendidos.length === 0 ? (
              <p className="font-body-md text-secondary">
                No hay productos destacados para mostrar.
              </p>
            ) : (
              statistics.topProductosMasVendidos.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col gap-4 border-b border-outline-variant pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                >
                  <div className="h-16 w-16 overflow-hidden border border-outline-variant bg-surface-container-low shrink-0">
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-label-md text-primary">{product.nombre}</p>
                    <p className="mt-1 font-body-md text-secondary">
                      {formatCurrency(product.precio)}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-label-md text-primary">
                      {product.cantidadVendida}
                    </p>
                    <p className="font-label-sm text-secondary uppercase tracking-widest">
                      vendidos
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>

          <Link
            to="/admin/inventory"
            className="mt-8 inline-flex w-full items-center justify-center border border-primary bg-primary px-4 py-3 font-label-sm text-label-sm uppercase tracking-widest text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary"
          >
            Ver inventario
          </Link>
        </section>
      </div>
    </section>
  )
}