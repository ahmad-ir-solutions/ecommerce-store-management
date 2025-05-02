import { Header } from "@/components/shared/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomSelect } from "@/components/shared/custom-select";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CsvOrderFormValues } from "../core/_modals";
import { csvOrderFormSchema } from "../core/_schema";

export function OrdersCsvPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
const channel = [
  { value: "channel1", label: "channel 1" },
  { value: "channel2", label: "channel 2" },
  { value: "channel3", label: "channel 3" },
]

  const form = useForm<CsvOrderFormValues>({
    resolver: zodResolver(csvOrderFormSchema),
    defaultValues: {
      channel: "",
      files: null,
    },
  })

  const selectedChannel = form.watch("channel");

  const uploadMutation = useMutation({
    mutationFn: async (data: CsvOrderFormValues) => {
      // Mock API call
      console.log("Uploading data:", data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  })

  const onSubmit = (data: CsvOrderFormValues) => {
    uploadMutation.mutate(data)
    console.log("Form submitted:", data);
    form.reset()
    setSelectedFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      form.setValue("files", e.target.files)
    }
  }

  return (
    <div>
      <Header title="CSV" />
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium text-[#11263C]">Upload Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#ECF6FF] w-full p-3 px-20 rounded-lg text-[#11263C] font-medium">
              Select Channel To Import To
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-[1fr_1fr] items-center ml-34 mt-7">
                  <div className="space-y-2">
                  {selectedChannel && (
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
                  )}
                  </div>
                  <FormField
                    control={form.control}
                    name="channel"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_1fr] items-center gap-4 space-y-0">
                        <FormControl>
                          <CustomSelect
                            defaultValue={field.value}
                            placeholder="Please Select"
                            options={channel.map((channel) => ({
                              id: channel.value,
                              label: channel.label,
                              value: channel.value,
                            }))}
                            onChange={field.onChange}
                            className="border-gray-200 bg-white w-48"
                          />
                        </FormControl>
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                {selectedChannel && (
                  <>
                  <p className="text-sm text-gray-400 ml-34">Allowed file types xls, xlsx, csv</p>
                  {selectedFile && <p className="text-sm ml-34">Selected file: {selectedFile.name}</p>}
                  <div className="flex justify-end mt-4">
                    <Button type="submit" variant="primary" size="lg" className="rounded-xl">
                      Upload
                    </Button>
                  </div>
                  </>
                )}
              
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default OrdersCsvPage;