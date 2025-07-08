"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Scissors, Calculator } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const produtos = [
  { id: 1, nome: "Camiseta Básica" },
  { id: 2, nome: "Moletom" },
  { id: 3, nome: "Vestido" },
  { id: 4, nome: "Regata" },
]

const costurasIniciais = [
  {
    id: 1,
    data: "2024-01-08",
    produto: "Camiseta Básica",
    quantidade: 120,
    costureiras: 6,
    mediaPorCostureira: 20,
  },
  {
    id: 2,
    data: "2024-01-08",
    produto: "Moletom",
    quantidade: 80,
    costureiras: 4,
    mediaPorCostureira: 20,
  },
  {
    id: 3,
    data: "2024-01-07",
    produto: "Vestido",
    quantidade: 60,
    costureiras: 3,
    mediaPorCostureira: 20,
  },
]

export default function CosturasPage() {
  const [costuras, setCosturas] = useState(costurasIniciais)
  const [formData, setFormData] = useState({
    data: new Date(),
    produto: "",
    quantidade: "",
    costureiras: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const quantidade = Number.parseInt(formData.quantidade)
    const numCostureiras = Number.parseInt(formData.costureiras)
    const mediaPorCostureira = Math.round((quantidade / numCostureiras) * 10) / 10

    const newCostura = {
      id: Date.now(),
      data: format(formData.data, "yyyy-MM-dd"),
      produto: formData.produto,
      quantidade,
      costureiras: numCostureiras,
      mediaPorCostureira,
    }

    setCosturas([newCostura, ...costuras])
    setFormData({
      data: new Date(),
      produto: "",
      quantidade: "",
      costureiras: "",
    })

    toast({
      title: "Costura registrada",
      description: `Registrado: ${quantidade} peças por ${numCostureiras} costureiras (média: ${mediaPorCostureira} peças/costureira).`,
    })
  }

  const totalPecasHoje = costuras
    .filter((costura) => costura.data === format(new Date(), "yyyy-MM-dd"))
    .reduce((total, costura) => total + costura.quantidade, 0)

  const totalCostureirasHoje = costuras
    .filter((costura) => costura.data === format(new Date(), "yyyy-MM-dd"))
    .reduce((total, costura) => total + costura.costureiras, 0)

  const mediaGeralHoje = totalCostureirasHoje > 0 ? Math.round((totalPecasHoje / totalCostureirasHoje) * 10) / 10 : 0

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Registro de Costuras</h1>
        <p className="text-muted-foreground">
          Registre a produção diária de costuras com cálculo automático de produtividade
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nova Costura</CardTitle>
            <CardDescription>Registre a produção de costura do dia</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !formData.data && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.data ? format(formData.data, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.data}
                      onSelect={(date) => date && setFormData({ ...formData, data: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="produto">Produto</Label>
                <Select
                  value={formData.produto}
                  onValueChange={(value) => setFormData({ ...formData, produto: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {produtos.map((produto) => (
                      <SelectItem key={produto.id} value={produto.nome}>
                        {produto.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantidade">Quantidade de Peças</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  placeholder="Ex: 120"
                  required
                  min="1"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="costureiras">Número de Costureiras</Label>
                <Input
                  id="costureiras"
                  type="number"
                  value={formData.costureiras}
                  onChange={(e) => setFormData({ ...formData, costureiras: e.target.value })}
                  placeholder="Ex: 6"
                  required
                  min="1"
                />
              </div>

              {formData.quantidade && formData.costureiras && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Calculator className="h-4 w-4" />
                    Cálculo Automático
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Média:{" "}
                    {Math.round((Number.parseInt(formData.quantidade) / Number.parseInt(formData.costureiras)) * 10) /
                      10}{" "}
                    peças por costureira
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Registrar Costura
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-blue-500" />
              Produtividade Hoje
            </CardTitle>
            <CardDescription>Resumo da produção de hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalPecasHoje}</div>
                <p className="text-sm text-muted-foreground">Peças Costuradas</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{totalCostureirasHoje}</div>
                <p className="text-sm text-muted-foreground">Costureiras</p>
              </div>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary">{mediaGeralHoje}</div>
              <p className="text-sm text-muted-foreground">Média de peças por costureira</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Costuras</CardTitle>
          <CardDescription>Registro da produção de costuras</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead className="text-right">Costureiras</TableHead>
                <TableHead className="text-right">Média/Costureira</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costuras.map((costura) => (
                <TableRow key={costura.id}>
                  <TableCell>{format(new Date(costura.data), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{costura.produto}</TableCell>
                  <TableCell className="text-right font-medium">{costura.quantidade}</TableCell>
                  <TableCell className="text-right">{costura.costureiras}</TableCell>
                  <TableCell className="text-right font-medium text-blue-600">{costura.mediaPorCostureira}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
