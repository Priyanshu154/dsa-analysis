import req from './api_req'
async function fetch_user( user_handle ){
    let data = await req( 'get','https://codeforces.com/api/user.info?handles='+user_handle)
    if(data === undefined)  return data
    let user = {}
    user['rating'] = data[0].rating
    user['profile_pic'] = data[0].titlePhoto
    return user;
}
function no_of_days( contest_time ){
    let first_contest = 1266580800;
    let diff = ( contest_time - first_contest )
    //y m d h m s
    let contest_date = new Date( 2010,1,19 ,16, 51 ,4 ) //first contest time
    contest_date.setSeconds( contest_date.getSeconds() + diff )  //add seconds 
    let curr_date = new Date();
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    
    return Math.floor((curr_date - contest_date) / _MS_PER_DAY);
}
async function fetch_tags( user_handle, days_before = 60 ){
    let data = await req( 'get','https://codeforces.com/api/user.rating?handle='+user_handle)
    if(data === undefined)  return data
    let contests = []
    console.log( "Contest info: " )
    for( let d of data ){
        // let contestData = await req( 'get', 'https://codeforces.com/api/contest.standings?contestId='+d.contestId+'&from=1&count=1' )
        if( no_of_days( d.ratingUpdateTimeSeconds ) > days_before ) {
            console.log( d.contestId + ' : ' + no_of_days(d.ratingUpdateTimeSeconds))
        }
        else{
            //console.log( d.contestId ) 
            contests.push( d.contestId )   
        }
        //console.log( d.contestId )
    }
    let tags = {}
    for( let contest_id of contests ){
        let data2 = await req( 'get', 
        'https://codeforces.com/api/contest.status?contestId='+contest_id +'&handle='+user_handle )
        //console.log(data2)
        if(data2 === undefined) return data2 
        let problems_solved = new Set()
        for(let prob of data2){
            if(prob.verdict === "OK"){
                problems_solved.add( prob.problem.index )
            }
        }
        console.log(problems_solved)
        for(let prob of data2){
            if ( !(prob.problem.index in problems_solved) ){
                for(let tag of prob.problem.tags){
   
                    if(tags[tag] === undefined) tags[tag] = 0
                    else                        tags[tag] = tags[tag]+1
                
                } 
            }    
        }
    }
    let result = []
    for( let tag in tags ){
        let dict = {}
        if(tag === 'brute force' || tag === '*special' || tag === 'implementation' )    continue;
        dict[ tag+""] = tags[tag] 
        result.push( { tag: tag , freq: tags[tag] } )
    }
    return result;
}
async function fetch_problems( tags_to_fetch , user_rating,delta=100,max_prob_per_tag=20){
    let ans3 = await req( 'post', 'http://localhost:8000/get_problems',
        {
            tags   :  tags_to_fetch,
            maxQue :  max_prob_per_tag,
            rating :  user_rating, 
            range  :  delta,
        } 
    )
    return ans3
}
function filter(tags, max_tags_to_return = 7){
    let arr = []
    let count = max_tags_to_return;
    for (let tag of tags){
        arr.push( tag.tag )
        count--;
        if( count <= 0 ) break;
    } 
    console.log(arr)
   return arr
}
export {fetch_tags,fetch_problems,fetch_user,filter}