import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Header } from "@/components/shared/header"

interface TrackingItem {
  orderNumber: string
  channelOrderId: string
  shippingName: string
  shippingPostCode: string
  trackingNumber: string
  carrierName: string
}

export function UpdateTrackingNumberPage() {
  const params = useParams()
  const pickwaveId = params.trackingId as string
  const [trackingItems, setTrackingItems] = useState<TrackingItem[]>([
    {
      orderNumber: "19943068",
      channelOrderId: "576733195736878439",
      shippingName: "OLAGOLD ONAFUWA",
      shippingPostCode: "SE28 8PA",
      trackingNumber: "",
      carrierName: "",
    },
    {
      orderNumber: "19943068",
      channelOrderId: "576733195736878439",
      shippingName: "OLAGOLD ONAFUWA",
      shippingPostCode: "SE28 8PA",
      trackingNumber: "",
      carrierName: "",
    },
    {
      orderNumber: "19943068",
      channelOrderId: "576733195736878439",
      shippingName: "OLAGOLD ONAFUWA",
      shippingPostCode: "SE28 8PA",
      trackingNumber: "",
      carrierName: "",
    },
  ])

  // Simulate fetching data based on ID
  useEffect(() => {
    // In a real application, you would fetch the data from an API
    console.log(`Fetching tracking details for pickwave ID: ${pickwaveId}`)
    // For now, we're using the default state values
  }, [pickwaveId])

  const handleTrackingNumberChange = (index: number, value: string) => {
    const updatedItems = [...trackingItems]
    updatedItems[index].trackingNumber = value
    setTrackingItems(updatedItems)
  }

  const handleCarrierNameChange = (index: number, value: string) => {
    const updatedItems = [...trackingItems]
    updatedItems[index].carrierName = value
    setTrackingItems(updatedItems)
  }

  const handleSave = () => {
    // Handle save logic
    console.log("Saving tracking numbers:", trackingItems)
  }

  const handleCancel = () => {
    // Handle cancel logic
    console.log("Operation cancelled")
  }

  return (
    <div>
      <Header title="Tracking Number" />
      <div className="mt-6">
        <Card className="bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Update Tracking Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Order Number</TableHead>
                  <TableHead className="p-3">Channel Order ID</TableHead>
                  <TableHead className="p-3">Shipping Name</TableHead>
                  <TableHead className="p-3">Post Code</TableHead>
                  <TableHead className="p-3">Tracking Number</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Carrier Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trackingItems.map((item, index) => (
                  <TableRow key={index} className="text-[#11263C] text-sm border-b border-gray-200">
                    <TableCell className="p-3 text-start">{item.orderNumber}</TableCell>
                    <TableCell className="p-3 text-start">{item.channelOrderId}</TableCell>
                    <TableCell className="p-3 text-start">{item.shippingName}</TableCell>
                    <TableCell className="p-3 text-start">{item.shippingPostCode}</TableCell>
                    <TableCell className="p-3 text-start">
                      <Input
                        value={item.trackingNumber}
                        onChange={(e) => handleTrackingNumberChange(index, e.target.value)}
                        className="w-full bg-white border-gray-300 rounded-md col-span-2 h-8"
                      />
                    </TableCell>
                    <TableCell className="p-3 text-start">
                      <Input
                        value={item.carrierName}
                        onChange={(e) => handleCarrierNameChange(index, e.target.value)}
                        className="w-full bg-white border-gray-300 rounded-md col-span-2 h-8"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="rounded-lg" >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UpdateTrackingNumberPage;