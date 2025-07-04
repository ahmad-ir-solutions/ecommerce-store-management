import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Header } from "@/components/shared/header"
import { useGetPickwave, useUpdatePickwave } from "../core/hooks/usePickwave"

interface TrackingItem {
  orderId: string
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
  const [trackingItems, setTrackingItems] = useState<TrackingItem[]>([])

  const { data: pickwaveData } = useGetPickwave(pickwaveId)
  const { mutate: updatePickwave } = useUpdatePickwave()

  // Fetch and map API data
  useEffect(() => {
    if (pickwaveData?.orders) {
      setTrackingItems(
        pickwaveData.orders.map((order: any) => ({
          orderId: order._id,
          orderNumber: order.channelOrderNumber,
          channelOrderId: order.channelOrderNumber,
          shippingName: order.customerDetails.shippingAddress?.firstName + " " + order.customerDetails.shippingAddress?.lastName,
          shippingPostCode: order.customerDetails.shippingAddress?.postalCode,
          trackingNumber: order.shippingAndHandling?.trackingNumber || "",
          carrierName: order.shippingAndHandling?.carrierName || "",
        }))
      )
    }
  }, [pickwaveData])

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

  const handleUpdate = () => {
    updatePickwave({
      id: pickwaveId,
      data: {
        trackingNumber: "TRK123456789",
        carrierName: "DHL",
      },
    })
  }

  const handleCancel = () => {
    // Optionally, refetch or reset
    // if (pickwaveData?.orders) {
    //   setTrackingItems(
    //     pickwaveData.orders.map((order: any) => ({
    //       orderId: order._id,
    //       orderNumber: order.channelOrderNumber,
    //       channelOrderId: order.channelOrderNumber,
    //       shippingName: order.customerDetails.shippingAddress?.firstName + " " + order.customerDetails.shippingAddress?.lastName,
    //       shippingPostCode: order.customerDetails.shippingAddress?.postalCode,
    //       trackingNumber: order.shippingAndHandling?.trackingNumber || "",
    //       carrierName: order.shippingAndHandling?.carrierName || "",
    //     }))
    //   )
    // }
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
                  <TableHead className="p-3 rounded-tl-lg rounded-bl-lg">Channel Order ID</TableHead>
                  <TableHead className="p-3">Channel Order ID</TableHead>
                  <TableHead className="p-3">Shipping Name</TableHead>
                  <TableHead className="p-3">Post Code</TableHead>
                  <TableHead className="p-3">Tracking Number</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Carrier Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trackingItems.map((item, index) => (
                  <TableRow key={item.orderId} className="text-[#11263C] text-sm border-b border-gray-200">
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
          <Button variant="primary" onClick={handleUpdate} className="rounded-lg">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UpdateTrackingNumberPage;