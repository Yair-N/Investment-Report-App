
import { extractPolicyData } from "../../upload/utils/excelReadUtils"

export async function POST(req: Request) {

    try {
        const data = await req.json()
        // const records = extractPolicyData(data)
        if (data.length < 1)
            return Response.error()


        console.log(data, '\n' + data.length + ' records total')
    } catch (error: any) {
        return Response.error()
    }

    return Response.json({ status: 200 })
}