"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "recharts"
import { Package, AlertTriangle, Scissors, ShoppingCart, TrendingUp } from "lucide-react"

// Mock data
const productionData = [
  { name: "Seg", impressoes: 120, falhas: 8, costuras: 110, vendas: 95 },
  { name: "Ter", impressoes: 150, falhas: 12, costuras: 140, vendas: 125 },
  { name: "Qua", impressoes: 180, falhas: 15, costuras: 165, vendas: 150 },
  { name: "Qui", impressoes: 160, falhas: 10, costuras: 155, vendas: 140 },
  { name: "Sex", impressoes: 200, falhas: 18, costuras: 185, vendas: 175 },
  { name: "Sáb", impressoes: 90, falhas: 5, costuras: 85, vendas: 80 },
]

const stampTypes = [
  { name: "Sublimação", value: 45, color: "#8884d8" },
  { name: "DTF", value: 35, color: "#82ca9d" },
  { name: "Silk", value: 20, color: "#ffc658" },
]

const failureTypes = [
  { name: "Falha de Estampa", value: 40, color: "#ff7c7c" },
  { name: "Costura Errada", value: 35, color: "#ffb347" },
  { name: "Corte Torto", value: 25, color: "#87ceeb" },
  { name: "Falha de Costura", value: 10, color: "#2f7c14" },
]

export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral da produção e indicadores principais</p>
          </div>
          <Badge variant="outline" className="text-sm">
            Última atualização: Hoje, 14:30
          </Badge>
        </div>

        {/* Cards de Resumo */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impressões Hoje</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% em relação a ontem
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Falhas Hoje</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3% em relação a ontem
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Peças Costuradas</CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">220</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8% em relação a ontem
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 3.450</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% em relação a ontem
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Produção Semanal</CardTitle>
              <CardDescription>Comparativo entre impressões, falhas, costuras e vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="impressoes" fill="#8884d8" name="Impressões" />
                  <Bar dataKey="falhas" fill="#ff7c7c" name="Falhas" />
                  <Bar dataKey="costuras" fill="#82ca9d" name="Costuras" />
                  <Bar dataKey="vendas" fill="#ffc658" name="Vendas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendência de Produção</CardTitle>
              <CardDescription>Evolução diária da produção</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="impressoes" stroke="#8884d8" strokeWidth={2} name="Impressões" />
                  <Line type="monotone" dataKey="costuras" stroke="#82ca9d" strokeWidth={2} name="Costuras" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Estampa</CardTitle>
              <CardDescription>Percentual de produção por tipo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stampTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stampTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Falhas</CardTitle>
              <CardDescription>Distribuição das falhas por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={failureTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {failureTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Indicadores Adicionais */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Taxa de Falhas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">7.3%</div>
              <p className="text-sm text-muted-foreground">18 falhas de 245 impressões</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Produtividade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">18.3</div>
              <p className="text-sm text-muted-foreground">peças por costureira/dia</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pedidos Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">23</div>
              <p className="text-sm text-muted-foreground">5 atrasados, 3 personalizados</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
