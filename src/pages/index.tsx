import Head from "next/head";
import { useEffect } from "react";
import route from "next/router";

export default function BasePage() {
    useEffect(()=>{
        route.push('/home')
    },[])
    return(
        <>
        <Head>
            <title>Tourism - Home</title>
            <link rel="icon" href="/tabicon3.svg" />
            </Head>           
            </>
    )
}