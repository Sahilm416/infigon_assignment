import { NextResponse } from "next/server"
import axios from "axios"
export async function POST(request: Request){
  const data = await request.json();

  

  try{
    const res = await axios.post("https://dev.api.infigon.app/auth/signin-with-phone-and-password", {
      phoneNumber : data.phone ,
      password : data.pass
    })
    
    return NextResponse.json((res).data.accessToken)
  }

  catch(e)
  {
    console.log(e)
  }

  
}