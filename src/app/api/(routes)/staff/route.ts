import { NextRequest } from "next/server";

const GET = async(request: NextRequest) => {
    const {searchParams} = new URL(request.url);
    
}
const POST = async(request: NextRequest) => {
    const {package_id, request_post_id, destination_id, transported_date} = await request.json();
   


}
export {GET, POST}