"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const tiposEstampaIniciais = [
  { id: 1, nome: "Sublimação" },
  { id: 2, nome: "DTF" },
  { id: 3, nome: "Silk" },
  { id: 4, nome: "Vinil" },
]

export default function TiposEstampaPage() {
  const [tiposEstampa, setTiposEstampa] = useState(tiposEstampaIniciais)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<any>(null)
  const [formData, setFormData] = useState({ nome: "" })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingType) {
      setTiposEstampa(tiposEstampa.map((t) => (t.id === editingType.id ? { ...t, nome: formData.nome } : t)))
      toast({
        title: "Tipo de estampa atualizado",
        description: "O tipo de estampa foi atualizado com sucesso.",
      })
    } else {
      const newType = {
        id: Date.now(),
        nome: formData.nome,
      }
      setTiposEstampa([...tiposEstampa, newType])
      toast({
        title: "Tipo de estampa cadastrado",
        description: "O tipo de estampa foi cadastrado com sucesso.",
      })
    }

    setFormData({ nome: "" })
    setEditingType(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (type: any) => {
    setEditingType(type)
    setFormData({ nome: type.nome })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setTiposEstampa(tiposEstampa.filter((t) => t.id !== id))
    toast({
      title: "Tipo de estampa excluído",
      description: "O tipo de estampa foi excluído com sucesso.",
      variant: "destructive",
    })
  }

  const openNewDialog = () => {
    setEditingType(null)
    setFormData({ nome: "" })
    setIsDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tipos de Estampa</h1>
          <p className="text-muted-foreground">Gerencie os tipos de estampa disponíveis</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Tipo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingType ? "Editar Tipo de Estampa" : "Novo Tipo de Estampa"}</DialogTitle>
              <DialogDescription>
                {editingType
                  ? "Edite as informações do tipo de estampa."
                  : "Adicione um novo tipo de estampa ao sistema."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="nome">Nome do Tipo</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ nome: e.target.value })}
                    placeholder="Ex: Sublimação"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingType ? "Atualizar" : "Cadastrar"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tipos de Estampa Cadastrados</CardTitle>
          <CardDescription>Lista de todos os tipos de estampa disponíveis</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Tipo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiposEstampa.map((tipo) => (
                <TableRow key={tipo.id}>
                  <TableCell className="font-medium">{tipo.nome}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(tipo)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(tipo.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
