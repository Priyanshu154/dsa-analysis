import req from 'api_req'
import {fetch_user, fetch_problems, fetch_tags} from './codeforces_interact'

//async lakhvu ee compulsory che ekle avethi badha functions(react) ma async lakhisu 
async function temp(){
    let url = 'aaiya je bi url ne api req aapvi hoy ee'
    let type = 'get'    // get/post
    let data = {            //data to send in post method (optional)
        key1 : 'value1'
    }
    let api_thi_req = await req( type, url, data) 
    if(api_thi_req === undefined){
        //api thi data aparne nai malyo 
    }
    else{}

    let user = fetch_user( 'priyanshu_15' )
    if(user === undefined){
        //agar user na malyo to
    }else{
        console.log( user['rating']  )
        console.log( user['profile_pic'] )  //url
    }
    //user ma aji kai vastu levi hase to levase codeforces_interact.js ma sej changes karine


    let tags = fetch_tags( 'darshang124'  )
    if(tags === undefined){
        //agar tags na malya to
    }
    else{
        console.log( tags[0].tag + " : " + tags[0].freq )
    }

    //problems ave kaale karis 😅
}
