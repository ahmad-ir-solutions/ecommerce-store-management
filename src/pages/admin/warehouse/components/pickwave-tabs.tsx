import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetPickwaves } from "../core/hooks/usePickwave"
import { PickwaveTable } from "./pickwave-table"
import { Loader2 } from "lucide-react"

export function PickwaveTabs() {
    // const [queryParams, setQueryParams] = useState({
    //     limit: 10,
    //     page: 1,
    // })

    const { data: pickwaves, isLoading } = useGetPickwaves({
        limit: 10,
        page: 1,
    });

    const openPickwaves = pickwaves?.filter(pw => pw.status === "pending") || [];
    const completedPickwaves = pickwaves?.filter(pw => pw.status === "completed") || [];

    return (
        <Tabs defaultValue="open" className="bg-white px-3 rounded-2xl mt-4">
            <div className="border-b border-gray-200 w-full px-6 pt-6 pb-0">
                <TabsList className="bg-white border-b border-gray-200 p-0 shadow-none data-[state=active]:shadow-none">
                    <TabsTrigger
                        value="open"
                        className="data-[state=active]:border-b-[#024AFE] data-[state=active]:text-[#024AFE] border-b-2 border-transparent text-gray-600 rounded-none px-4 py-2 shadow-none data-[state=active]:shadow-none"
                    >
                        Open Pickwaves
                    </TabsTrigger>
                    <TabsTrigger
                        value="completed"
                        className="data-[state=active]:border-b-[#024AFE] data-[state=active]:text-[#024AFE] border-b-2 border-transparent text-gray-600 rounded-none px-4 py-2 shadow-none data-[state=active]:shadow-none"
                    >
                        Completed Pickwaves
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="open">
                <div className="py-4">
                    {isLoading ? <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div> : <PickwaveTable data={openPickwaves} />}
                </div>
            </TabsContent>

            <TabsContent value="completed">
                <div className="py-4">
                    {isLoading ? <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div> : <PickwaveTable data={completedPickwaves} />}
                </div>
            </TabsContent>
        </Tabs>
    );
}

