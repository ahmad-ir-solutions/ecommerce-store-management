import type React from "react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Header } from "@/components/shared/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { CustomSelect } from "@/components/shared/custom-select"
import { Button } from "@/components/ui/button"
import { type CsvOrderFormValues, csvOrderFormSchema } from "../core/_schema"
import { useUploadOrdersCsv } from '../core/hooks/use-orders'
import { useGetAllChannels } from "@/pages/admin/common-api/channels/core/_hooks"
import { IChannel } from "@/pages/admin/common-api/channels/core/_modals"

export function OrdersCsvPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const uploadMutation = useUploadOrdersCsv()
  const { data: channelsData, isLoading, isError } = useGetAllChannels()

  useEffect(() => {
    // The channels data is now fetched by useGetAllChannels hook
    // We might want to handle loading and error states here or in the component's JSX
  }, [channelsData])

  const form = useForm<CsvOrderFormValues>({
    resolver: zodResolver(csvOrderFormSchema),
    defaultValues: {
      channel: "",
      files: null,
    },
  })

  const selectedChannel = form.watch("channel")

  const onSubmit = (data: CsvOrderFormValues) => {
    if (!selectedFile) {
      form.setError("files", { message: "Please select a file" })
      return
    }

    uploadMutation.mutate(
      { file: selectedFile, channelId: data.channel },
      {
        onSuccess: () => {
          form.reset()
          setSelectedFile(null)
        },
      },
    )
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
      form.setValue("files", e.target.files)
      form.clearErrors("files")
    }
  }

  return (
    <div>
      <Header title="CSV Import" />
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium text-[#11263C]">Upload Orders CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-[#ECF6FF] w-full p-3 px-20 rounded-lg text-[#11263C] font-medium">
              Select Channel To Import Orders To
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
                            options={channelsData?.data?.map((channel: IChannel) => ({
                              id: channel.channelId,
                              label: channel.channelName,
                              value: channel.channelId,
                            })) || []}
                            onChange={field.onChange}
                            className="border-gray-200 bg-white w-48"
                          />
                        </FormControl>
                        <FormMessage className="col-start-2 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                {isLoading && <p>Loading channels...</p>}
                {isError && <p>Error loading channels.</p>}
                {selectedChannel && (
                  <>
                    <p className="text-sm text-gray-400 ml-34">Allowed file types: xls, xlsx, csv</p>
                    {selectedFile && <p className="text-sm ml-34">Selected file: {selectedFile.name}</p>}
                    <div className="flex justify-end mt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="rounded-xl"
                        disabled={uploadMutation.isPending}
                      >
                        {uploadMutation.isPending ? "Uploading..." : "Upload"}
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
  )
}

export default OrdersCsvPage
