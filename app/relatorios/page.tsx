"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  AreaChart,
} from "recharts"
import { CalendarIcon, Filter, Download } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data para relatórios
const dadosProducao = [
  { periodo: "Sem 1", sublimacao: 450, dtf: 320, silk: 180, falhasSublimacao: 25, falhasDtf: 18, falhasSilk: 12 },
  { periodo: "Sem 2", sublimacao: 520, dtf: 380, silk: 220, falhasSublimacao: 30, falhasDtf: 22, falhasSilk: 15 },
  { periodo: "Sem 3", sublimacao: 480, dtf: 350, silk: 200, falhasSublimacao: 28, falhasDtf: 20, falhasSilk: 14 },
  { periodo: "Sem 4", sublimacao: 600, dtf: 420, silk: 250, falhasSublimacao: 35, falhasDtf: 25, falhasSilk: 18 },
]

const dadosVendas = [
  { produto: "Camiseta", quantidade: 450, valor: 13500 },
  { produto: "Moletom", quantidade: 180, valor: 9000 },
  { produto: "Vestido", quantidade: 120, valor: 7200 },
  { produto: "Regata", quantidade: 200, valor: 5000 },
]

const dadosEnvios = [
  { periodo: "Jan", ate3dias: 45, ate5dias: 25, mais5dias: 8 },
  { periodo: "Fev", ate3dias: 52, ate5dias: 28, mais5dias: 6 },
  { periodo: "Mar", ate3dias: 48, ate5dias: 30, mais5dias: 10 },
  { periodo: "Abr", ate3dias: 55, ate5dias: 22, mais5dias: 5 },
]

const cores = {
  sublimacao: "#8884d8",
  dtf: "#82ca9d",
  silk: "#ffc658",
  falhas: "#ff7c7c",
  vendas: "#00c49f",
  envios: "#0088fe",
}

export default function RelatoriosPage() {
  const [filtros, setFiltros] = useState({
    dataInicio: new Date(2024, 0, 1),
    dataFim: new Date(),
    tipoEstampa: "todos",
    tipoRelatorio: "producao",
  })

  const tiposRelatorio = [
    { value: "producao", label: "Produção vs Falhas" },
    { value: "vendas", label: "Vendas por Produto" },
    { value: "envios", label: "Controle de Envios" },
    { value: "comparativo", label: "Comparativo Geral" },
    { value: "percentuais", label: "Percentuais de Falhas" },
  ]

  const renderGrafico = () => {
    switch (filtros.tipoRelatorio) {
      case "producao":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={dadosProducao}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sublimacao" fill={cores.sublimacao} name="Sublimação" />
              <Bar dataKey="dtf" fill={cores.dtf} name="DTF" />
              <Bar dataKey="silk" fill={cores.silk} name="Silk" />
              <Line type="monotone" dataKey="falhasSublimacao" stroke={cores.falhas} name="Falhas Sublimação" />
              <Line type="monotone" dataKey="falhasDtf" stroke="#ff9999" name="Falhas DTF" />
            </ComposedChart>
          </ResponsiveContainer>
        )

      case "vendas":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dadosVendas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="produto" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill={cores.vendas} name="Quantidade" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "envios":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dadosEnvios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="ate3dias" stackId="1" stroke="#00c49f" fill="#00c49f" name="Até 3 dias" />
              <Area type="monotone" dataKey="ate5dias" stackId="1" stroke="#0088fe" fill="#0088fe" name="Até 5 dias" />
              <Area
                type="monotone"
                dataKey="mais5dias"
                stackId="1"
                stroke="#ff7c7c"
                fill="#ff7c7c"
                name="Mais de 5 dias"
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "comparativo":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dadosProducao}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periodo" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sublimacao" stroke={cores.sublimacao} strokeWidth={3} name="Impressões" />
              <Line type="monotone" dataKey="falhasSublimacao" stroke={cores.falhas} strokeWidth={2} name="Falhas" />
            </LineChart>
          </ResponsiveContainer>
        )

      case "percentuais":
        const dadosPercentuais = [
          { name: "Sublimação", falhas: 5.2, color: cores.sublimacao },
          { name: "DTF", falhas: 6.1, color: cores.dtf },
          { name: "Silk", falhas: 7.8, color: cores.silk },
        ]
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dadosPercentuais}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, falhas }) => `${name}: ${falhas}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="falhas"
              >
                {dadosPercentuais.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Relatórios Analíticos</h1>
        <p className="text-muted-foreground">Análises detalhadas da produção, vendas e controle de qualidade</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>Configure os filtros para personalizar os relatórios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="grid gap-2">
              <Label>Data Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filtros.dataInicio && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filtros.dataInicio ? format(filtros.dataInicio, "dd/MM/yyyy") : <span>Selecione</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filtros.dataInicio}
                    onSelect={(date) => date && setFiltros({ ...filtros, dataInicio: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Data Fim</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !filtros.dataFim && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filtros.dataFim ? format(filtros.dataFim, "dd/MM/yyyy") : <span>Selecione</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filtros.dataFim}
                    onSelect={(date) => date && setFiltros({ ...filtros, dataFim: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label>Tipo de Estampa</Label>
              <Select
                value={filtros.tipoEstampa}
                onValueChange={(value) => setFiltros({ ...filtros, tipoEstampa: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="sublimacao">Sublimação</SelectItem>
                  <SelectItem value="dtf">DTF</SelectItem>
                  <SelectItem value="silk">Silk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Tipo de Relatório</Label>
              <Select
                value={filtros.tipoRelatorio}
                onValueChange={(value) => setFiltros({ ...filtros, tipoRelatorio: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiposRelatorio.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{tiposRelatorio.find((t) => t.value === filtros.tipoRelatorio)?.label}</CardTitle>
              <CardDescription>
                Período: {format(filtros.dataInicio, "dd/MM/yyyy")} até {format(filtros.dataFim, "dd/MM/yyyy")}
              </CardDescription>
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderGrafico()}</CardContent>
      </Card>

      {/* Cards de Indicadores */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Falhas Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">6.2%</div>
            <p className="text-xs text-muted-foreground">93 falhas de 1.500 impressões</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtividade Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18.5</div>
            <p className="text-xs text-muted-foreground">peças por costureira/dia</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Médio Envio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3.2</div>
            <p className="text-xs text-muted-foreground">dias até o envio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Atrasados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">de 156 pedidos totais</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
