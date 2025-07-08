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
import { CalendarIcon, Plus, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Mock data
const produtos = [
  { id: 1, nome: "Camiseta Básica" },
  { id: 2, nome: "Moletom" },
  { id: 3, nome: "Vestido" },
  { id: 4, nome: "Regata" },
]

const tiposFalhasCostura = [
  { id: 1, nome: "Linha Solta" },
  { id: 2, nome: "Costura Torta" },
  { id: 3, nome: "Ponto Falhado" },
]

const falhasIniciais = [
  { id: 1, data: "2024-01-08", produto: "Camiseta Básica", tipoFalha: "Linha Solta", quantidade: 2 },
  { id: 2, data: "2024-01-08", produto: "Moletom", tipoFalha: "Costura Torta", quantidade: 1 },
  { id: 3, data: "2024-01-07", produto: "Vestido", tipoFalha: "Ponto Falhado", quantidade: 3 },
]

export default function FalhasCosturaPage() {
  const [falhas, setFalhas] = useState(falhasIniciais)
  const [formData, setFormData] = useState({
    data: new Date(),
    produto: "",
    tipoFalha: "",
    quantidade: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newFalha = {
      id: Date.now(),
      data: format(formData.data, "yyyy-MM-dd"),
      produto: formData.produto,
      tipoFalha: formData.tipoFalha,
      quantidade: Number.parseInt(formData.quantidade),
    }

    setFalhas([newFalha, ...falhas])
    setFormData({
      data: new Date(),
      produto: "",
      tipoFalha: "",
      quantidade: "",
    })

    toast({
      title: "Falha registrada",
      description: "A falha de costura foi registrada com sucesso.",
    })
  }

  const totalFalhasHoje = falhas
    .filter((falha) => falha.data === format(new Date(), "yyyy-MM-dd"))
    .reduce((total, falha) => total + falha.quantidade, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Registro de Falhas de Costura</h1>
        <p className="text-muted-foreground">Registre as falhas encontradas nas costuras</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nova Falha</CardTitle>
            <CardDescription>Registre uma nova falha de costura</CardDescription>
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
                <Label htmlFor="tipoFalha">Tipo de Falha</Label>
                <Select
                  value={formData.tipoFalha}
                  onValueChange={(value) => setFormData({ ...formData, tipoFalha: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de falha" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposFalhasCostura.map((tipo) => (
                      <SelectItem key={tipo.id} value={tipo.nome}>
                        {tipo.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input
                  id="quantidade"
                  type="number"
                  value={formData.quantidade}
                  onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
                  placeholder="Ex: 5"
                  required
                  min="1"
                />
              </div>

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Registrar Falha
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Total de Falhas Hoje
            </CardTitle>
            <CardDescription>Resumo das falhas registradas hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{totalFalhasHoje}</div>
              <p className="text-muted-foreground">falhas registradas em {format(new Date(), "dd/MM/yyyy")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Falhas</CardTitle>
          <CardDescription>Últimas falhas de costura registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Tipo de Falha</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {falhas.map((falha) => (
                <TableRow key={falha.id}>
                  <TableCell>{format(new Date(falha.data), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{falha.produto}</TableCell>
                  <TableCell>{falha.tipoFalha}</TableCell>
                  <TableCell className="text-right font-medium text-red-600">{falha.quantidade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}