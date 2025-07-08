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
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

// Mock data
const tiposEstampa = [
  { id: 1, nome: "Sublimação" },
  { id: 2, nome: "DTF" },
  { id: 3, nome: "Silk" },
]

const impressoesIniciais = [
  { id: 1, data: "2024-01-08", tipoEstampa: "Sublimação", quantidade: 120 },
  { id: 2, data: "2024-01-08", tipoEstampa: "DTF", quantidade: 85 },
  { id: 3, data: "2024-01-07", tipoEstampa: "Sublimação", quantidade: 150 },
  { id: 4, data: "2024-01-07", tipoEstampa: "Silk", quantidade: 45 },
]

export default function ImpressoesPage() {
  const [impressoes, setImpressoes] = useState(impressoesIniciais)
  const [formData, setFormData] = useState({
    data: new Date(),
    tipoEstampa: "",
    quantidade: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newImpressao = {
      id: Date.now(),
      data: format(formData.data, "yyyy-MM-dd"),
      tipoEstampa: formData.tipoEstampa,
      quantidade: Number.parseInt(formData.quantidade),
    }

    setImpressoes([newImpressao, ...impressoes])
    setFormData({
      data: new Date(),
      tipoEstampa: "",
      quantidade: "",
    })

    toast({
      title: "Impressão registrada",
      description: "O lançamento de impressão foi registrado com sucesso.",
    })
  }

  const totalPorTipo = impressoes.reduce(
    (acc, impressao) => {
      acc[impressao.tipoEstampa] = (acc[impressao.tipoEstampa] || 0) + impressao.quantidade
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Lançamento de Impressões</h1>
        <p className="text-muted-foreground">Registre as impressões diárias por tipo de estampa</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Novo Lançamento</CardTitle>
            <CardDescription>Registre uma nova impressão</CardDescription>
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
                <Label htmlFor="tipoEstampa">Tipo de Estampa</Label>
                <Select
                  value={formData.tipoEstampa}
                  onValueChange={(value) => setFormData({ ...formData, tipoEstampa: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposEstampa.map((tipo) => (
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
                  placeholder="Ex: 120"
                  required
                  min="1"
                />
              </div>

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Registrar Impressão
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo por Tipo</CardTitle>
            <CardDescription>Total de impressões por tipo de estampa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(totalPorTipo).map(([tipo, total]) => (
                <div key={tipo} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">{tipo}</span>
                  <span className="text-2xl font-bold">{total}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Impressões</CardTitle>
          <CardDescription>Últimos lançamentos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Tipo de Estampa</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {impressoes.map((impressao) => (
                <TableRow key={impressao.id}>
                  <TableCell>{format(new Date(impressao.data), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{impressao.tipoEstampa}</TableCell>
                  <TableCell className="text-right font-medium">{impressao.quantidade}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
