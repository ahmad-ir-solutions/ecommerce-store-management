import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Header } from "@/components/shared/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { CsvFormValues } from "../core/_modals"
import { csvFormSchema } from "../core/_schema"
import { CustomSelect } from "@/components/shared/custom-select"

// Mock data for suppliers and warehouses
const suppliers = [
  { value: "supplier1", label: "Supplier 1" },
  { value: "supplier2", label: "Supplier 2" },
  { value: "supplier3", label: "Supplier 3" },
]

const warehouses = [
  { value: "warehouse1", label: "Warehouse 1" },
  { value: "warehouse2", label: "Warehouse 2" },
  { value: "warehouse3", label: "Warehouse 3" },
]

export function ProductsCsvPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const form = useForm<CsvFormValues>({
    resolver: zodResolver(csvFormSchema),
    defaultValues: {
      poReference: "",
      deliveryCost: "",
      supplier: "",
      warehouse: "",
    },
  })

  const uploadMutation = useMutation({
    mutationFn: async (data: CsvFormValues) => {
      // Mock API call
      console.log("Uploading data:", data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const onSubmit = (data: CsvFormValues) => {
    uploadMutation.mutate(data)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      form.setValue("files", e.target.files)
    }
  }

  return (
    <div>
      <Header title="Products" />

      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Upload Template</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-[150px_1fr] items-center ml-34">
                  <FormField
                    control={form.control}
                    name="poReference"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[150px_1fr] items-center gap-4 space-y-0">
                        <FormLabel className="text-right">PO Reference</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-48 border-gray-200"/>
                        </FormControl>
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-[150px_1fr] items-center ml-34">
                  <FormField
                    control={form.control}
                    name="deliveryCost"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[150px_1fr] items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Delivery Cost</FormLabel>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
                          <FormControl>
                            <Input className="pl-7 w-48 border-gray-200" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-[150px_1fr] items-center ml-34">
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[150px_1fr] items-center gap-4 space-y-0">
                        <div>
                        <FormLabel className="text-right">Supplier</FormLabel>
                        </div>
                        <div>
                        <FormControl>
                          <CustomSelect
                            defaultValue={field.value}
                            placeholder="Please Select"
                            options={suppliers.map((supplier) => ({
                              id: supplier.value,
                              label: supplier.label,
                              value: supplier.value,
                            }))}
                            onChange={field.onChange}
                            className="border-gray-200 bg-white w-48"
                          />
                        </FormControl>
                        </div>
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-[150px_1fr] items-center ml-34">
                  <FormField
                    control={form.control}
                    name="warehouse"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[150px_1fr] items-center gap-4 space-y-0">
                        <div>
                        <FormLabel className="text-right">Warehouse</FormLabel>
                        </div>
                        <div>
                          <FormControl>
                            <CustomSelect
                              defaultValue={field.value}
                              placeholder="Please Select"
                              options={warehouses.map((warehouse) => ({
                                id: warehouse.value,
                                label: warehouse.label,
                                value: warehouse.value,
                              }))}
                              onChange={field.onChange}
                              className="border-gray-200 bg-white w-48"
                            />
                          </FormControl>
                        </div>
                       
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-[150px_1fr] items-center ml-34">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[150px_1fr] items-center gap-4 space-y-0">
                        <FormLabel className="text-right">Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "justify-start text-left font-normal w-48 border-gray-200 shadow-xs",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-white" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-[1fr] items-start mt-4 ml-34">
                  <div className="space-y-2">
                    <div>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".xls,.xlsx,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="file-upload">
                        <Button
                          type="button"
                          variant="primary"
                          size="lg"
                          className="rounded-xl"
                          onClick={() => document.getElementById("file-upload")?.click()}
                        >
                          Select Files
                        </Button>
                      </label>
                    </div>
                    <p className="text-sm text-gray-400">Allowed file types xls, xlsx, csv</p>
                    {selectedFile && <p className="text-sm">Selected file: {selectedFile.name}</p>}
                  </div>
                  <div></div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit" variant="primary" size="lg" className="rounded-xl">
                    Upload
                  </Button>
                  </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductsCsvPage