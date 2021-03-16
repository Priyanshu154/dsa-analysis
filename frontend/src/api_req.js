import axios from 'axios'

function api_req( type, url_name, data_value ){
    let verdict
    let data
    const type_of_req = {
        method: type,
        url: url_name,
        data: data_value
    }
    data = (axios( type_of_req).then(
       (res) =>{
            return res.data
       }
    ).catch(
        (error)=>{
            console.log(error)
        }
    ))
    return data
}

async function req( type, url_name, data_value ){
    let ans2 = await api_req( type, 
    url_name, data_value).then(
        (res)=>{
            if(res === undefined)   return res

            if(res.result !== undefined)    return res.result
            else                            return res
        }
    ).catch(
        (err)=>{
            console.log(err)
        }
    )
    return ans2;
    
}
export default req;