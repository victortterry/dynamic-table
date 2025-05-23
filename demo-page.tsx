"use client"

import { useState } from "react"
import DynamicTable from "./dynamic-table"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Sample data for the table
const sampleData = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    registrationDate: "2023-01-15T10:30:00Z",
    active: true,
    age: 28,
    tags: ["customer", "premium", "new"],
    visits: 15,
  },
  {
    id: 2,
    name: "Mary Johnson",
    email: "mary@example.com",
    registrationDate: "2022-11-20T14:45:00Z",
    active: true,
    age: 34,
    tags: ["customer", "regular"],
    visits: 42,
  },
  {
    id: 3,
    name: "Charles Rodriguez",
    email: "charles@example.com",
    registrationDate: "2023-03-05T09:15:00Z",
    active: false,
    age: 45,
    tags: ["customer", "inactive"],
    visits: 3,
  },
  {
    id: 4,
    name: "Anna Martinez",
    email: "anna@example.com",
    registrationDate: "2023-02-18T16:20:00Z",
    active: true,
    age: 29,
    tags: ["customer", "premium"],
    visits: 27,
  },
  {
    id: 5,
    name: "Peter Sanders",
    email: "peter@example.com",
    registrationDate: "2022-12-10T11:00:00Z",
    active: true,
    age: 38,
    tags: ["customer", "regular", "promotion"],
    visits: 19,
  },
  {
    id: 6,
    name: "Laura Gomez",
    email: "laura@example.com",
    registrationDate: "2023-04-22T13:40:00Z",
    active: true,
    age: 31,
    tags: ["customer", "new", "referred"],
    visits: 5,
  },
  {
    id: 7,
    name: "Michael Torres",
    email: "michael@example.com",
    registrationDate: "2022-10-05T08:50:00Z",
    active: false,
    age: 42,
    tags: ["customer", "inactive"],
    visits: 0,
  },
  {
    id: 8,
    name: "Sophia Ramirez",
    email: "sophia@example.com",
    registrationDate: "2023-01-30T15:10:00Z",
    active: true,
    age: 27,
    tags: ["customer", "premium", "promotion"],
    visits: 31,
  },
  {
    id: 9,
    name: "James Herrera",
    email: "james@example.com",
    registrationDate: "2022-09-15T10:20:00Z",
    active: true,
    age: 36,
    tags: ["customer", "regular"],
    visits: 22,
  },
  {
    id: 10,
    name: "Elena Castro",
    email: "elena@example.com",
    registrationDate: "2023-05-08T09:30:00Z",
    active: true,
    age: 33,
    tags: ["customer", "new"],
    visits: 8,
  },
  {
    id: 11,
    name: "Robert Diaz",
    email: "robert@example.com",
    registrationDate: "2022-08-20T14:15:00Z",
    active: false,
    age: 47,
    tags: ["customer", "inactive"],
    visits: 1,
  },
  {
    id: 12,
    name: "Carmen Vargas",
    email: "carmen@example.com",
    registrationDate: "2023-02-05T11:45:00Z",
    active: true,
    age: 30,
    tags: ["customer", "premium", "referred"],
    visits: 39,
  },
]

// Custom columns for the table
const customColumns = [
  { key: "id", label: "ID", type: "number", sortable: true },
  { key: "name", label: "Name", type: "string", sortable: true },
  { key: "email", label: "Email", type: "string", sortable: true },
  { key: "registrationDate", label: "Registration Date", type: "date", sortable: true },
  { key: "active", label: "Status", type: "boolean", sortable: true },
  { key: "age", label: "Age", type: "number", sortable: true },
  { key: "tags", label: "Tags", type: "array", sortable: false },
  { key: "visits", label: "Visits", type: "number", sortable: true },
]

export default function DemoPage() {
  const [jsonInput, setJsonInput] = useState("")
  const [tableData, setTableData] = useState(sampleData)
  const [error, setError] = useState("")
  const [useCustomColumns, setUseCustomColumns] = useState(true)

  // Cargar datos JSON personalizados
  const handleLoadJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput)
      if (!Array.isArray(parsedData)) {
        throw new Error("Data must be an array of objects")
      }
      setTableData(parsedData)
      setError("")
    } catch (err) {
      setError("Error parsing JSON: " + (err instanceof Error ? err.message : String(err)))
    }
  }

  // Restablecer datos de ejemplo
  const handleResetData = () => {
    setTableData(sampleData)
    setJsonInput("")
    setError("")
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Table</CardTitle>
          <CardDescription>
            A table that builds dynamically, detects data types, allows sorting, pagination, filtering, and grouping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Button variant={useCustomColumns ? "default" : "outline"} onClick={() => setUseCustomColumns(true)}>
                  Custom Columns
                </Button>
                <Button variant={!useCustomColumns ? "default" : "outline"} onClick={() => setUseCustomColumns(false)}>
                  Auto Detection
                </Button>
              </div>

              <DynamicTable
                data={tableData}
                columns={useCustomColumns ? customColumns : undefined}
                pageSize={5}
                filterable={true}
                groupable={true}
              />
            </TabsContent>

            <TabsContent value="data" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jsonInput">JSON Data (array of objects)</Label>
                <div className="grid gap-4">
                  <textarea
                    id="jsonInput"
                    className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder='[{"id": 1, "nombre": "Ejemplo", "edad": 30}]'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <div className="flex space-x-2">
                    <Button onClick={handleLoadJson}>Load JSON</Button>
                    <Button variant="outline" onClick={handleResetData}>
                      Reset Data
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
