"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Mock data
const tiposEstampa = [
  { id: 1, nome: "Sublimação" },
  { id: 2, nome: "DTF" },
  { id: 3, nome: "Silk" },
]

const produtosIniciais = [
  { id: 1, nome: "Camiseta Básica", tipoEstampa: "Sublimação" },
  { id: 2, nome: "Moletom", tipoEstampa: "DTF" },
  { id: 3, nome: "Vestido", tipoEstampa: "Silk" },
  { id: 4, nome: "Regata", tipoEstampa: "Sublimação" },
]

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState(produtosIniciais)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: "",
    tipoEstampa: "",
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProduct) {
      setProdutos(
        produtos.map((p) =>
          p.id === editingProduct.id ? { ...p, nome: formData.nome, tipoEstampa: formData.tipoEstampa } : p,
        ),
      )
      toast({
        title: "Produto atualizado",
        description: "O produto foi atualizado com sucesso.",
      })
    } else {
      const newProduct = {
        id: Date.now(),
        nome: formData.nome,
        tipoEstampa: formData.tipoEstampa,
      }
      setProdutos([...produtos, newProduct])
      toast({
        title: "Produto cadastrado",
        description: "O produto foi cadastrado com sucesso.",
      })
    }

    setFormData({ nome: "", tipoEstampa: "" })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      nome: product.nome,
      tipoEstampa: product.tipoEstampa,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id))
    toast({
      title: "Produto excluído",
      description: "O produto foi excluído com sucesso.",
      variant: "destructive",
    })
  }

  const openNewDialog = () => {
    setEditingProduct(null)
    setFormData({ nome: "", tipoEstampa: "" })
    setIsDialogOpen(true)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cadastro de Produtos</h1>
            <p className="text-muted-foreground">Gerencie os produtos da sua linha de produção</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Edite as informações do produto." : "Adicione um novo produto ao sistema."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Camiseta Básica"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipoEstampa">Tipo de Estampa</Label>
                    <Select
                      value={formData.tipoEstampa}
                      onValueChange={(value) => setFormData({ ...formData, tipoEstampa: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de estampa" />
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
                </div>
                <DialogFooter>
                  <Button type="submit">{editingProduct ? "Atualizar" : "Cadastrar"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Cadastrados</CardTitle>
            <CardDescription>Lista de todos os produtos cadastrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Produto</TableHead>
                  <TableHead>Tipo de Estampa</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell className="font-medium">{produto.nome}</TableCell>
                    <TableCell>{produto.tipoEstampa}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(produto)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(produto.id)}>
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
    </div>
  )
}
