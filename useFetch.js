/* 
Source: https://dev.to/shaedrizwan/building-custom-hooks-in-react-to-fetch-data-4ig6
Example usage

export function Home(){
    const {data,loading,error} = useFetch('https://localhost:4000')

        if(error){
           console.log(error)
        }

    return(
        {loading && <div>Loading...</div>}
        {data && <div>{data.map(item => <div>{item}</div>)}</div>}
    )
}

*/

import { useEffect, useState } from "react"
import axios from "axios"


export default function useFetch(url){

    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios.get(url)
                    setData(response.data)
                }catch(err){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, error, loading }

}