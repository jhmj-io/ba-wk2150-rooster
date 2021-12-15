// coachcalender-compute

const beschikbaarheid = [
    {"name": "Sander",    "aanbod": { "1": { "3": true}, "3": { "3": true}, "5": { "3": true}, "7": { "3": true} } },
    {"name": "Alexander", "aanbod": { "1": { "3": true}, "4": { "3": true}, "6": { "3": true} } },
    {"name": "Nick",      "aanbod": { "2": { "1": true, "2": true, "3": true}, "5": { "1": true, "2": true, "3": true} } },
    {"name": "Sam",       "aanbod": { "3": { "1": true, "2": true, "3": true}, "5": { "1": true, "2": true, "3": true} } },
    {"name": "Daniel",    "aanbod": { "2": { "1": true, "2": true}, "4": { "1": true, "2": true} } },
    {"name": "Henok",     "aanbod": { "2": { "2": true, "3": true}, "3": { "2": true, "3": true} } },
]

const behoefte = {
    "1" : {"1": 2, "2": 2, "3": 1},
    "2" : {"1": 2, "2": 2, "3": 1},
    "3" : {"1": 2, "2": 2, "3": 1},
    "4" : {"1": 0, "2": 0, "3": 2},
    "5" : {"1": 2, "2": 2, "3": 0},
    "6" : {"1": 2, "2": 2, "3": 0},
    "7" : {"1": 2, "2": 2, "3": 0},
}

const sessionsbitaacademy = {
    '11': { demand: 1, deployed: 0, coaches: [ 'Sander'] },
    '12': { demand: 1, deployed: 0, coaches: [ 'Sander' ] },
    '13': { demand: 1, deployed: 0, coaches: [ 'Alexander' ] },
    '21': { demand: 1, deployed: 0, coaches: [ 'Daniel' ] },
    '22': { demand: 1, deployed: 0, coaches: [ 'Daniel' ] },
    '23': { demand: 1, deployed: 0, coaches: [ 'Nick' ] },
    '31': { demand: 1, deployed: 0, coaches: [ 'Henok' ] },
    '32': { demand: 1, deployed: 0, coaches: [ 'Henok' ] },
    '33': { demand: 1, deployed: 0, coaches: [ 'Sam' ] },
    '41': { demand: 1, deployed: 0, coaches: [ 'Daniel' ]  },
    '42': { demand: 1, deployed: 0, coaches: [ 'Daniel' ] },
    '43': { demand: 1, deployed: 0, coaches: [ 'Alexander' ] },
    '51': { demand: 1, deployed: 0, coaches: [ 'Sander' ] },
    '52': { demand: 1, deployed: 0, coaches: [ 'Sander' ] },
    '53': { demand: 0, deployed: 0 },
    '61': { demand: 1, deployed: 0, coaches: [ 'Alexander' ] },
    '62': { demand: 1, deployed: 0, coaches: [ 'Alexander' ] },
    '63': { demand: 0, deployed: 0 },
    '71': { demand: 1, deployed: 0, coaches: [ 'Sander' ] },
    '72': { demand: 1, deployed: 0, coaches: [ 'Sander' ] },
    '73': { demand: 0, deployed: 0 }
}

const languages = ["nl-NL","en-US","de-DE"]



let dow, dvd, resources, sessions, sessionsxcoaches, deploymentmax, sortorder, language

sortorder = "name"
language  = "nl-NL"


function compute_init() {

    dowlanguage()

    // delen van de dag - 4.5 uur
    dvd = {
        "1": {name: "ochtend",start:  "9:00", end:"13:30", uren: 4.5},
        "2": {name: "middag", start: "13:00", end:"17:30", uren: 4.5},
        //"3": {name: "avond",  start: "17:30", end:"21:00", uren: 4.5}
        "3": {name: "avond",  start: "19:00", end:"21:00", uren: 2}
    }
    

    // geschikte datastructuur voor beschikbaarheid + inplannen coaches
    resources = beschikbaarheid.map(c=>{

        c.sessies = new Array(7) // [1,2,3,4,5,6,7] 7 dagen vd week
            .fill(1)
            .map((x,i)=>i+1)
            .reduce((aa,d)=>{
                d = new Array(3) // [1,2,3] ochtend, middag, avond
                    .fill(1)
                    .map((x,i)=>i+1)
                    .reduce((a,s)=>{
                        const preferred = (c.aanbod[d] && c.aanbod[d][s]) ? 1 : 0
                        a[d+""+s] = { preferred, deployed:0 }
                        return a
                    },{})

            return { ...aa, ...d }

        },{})

        return c
    })


    if (sessions) Object.keys(sessions).forEach(s=>sessions[s].deployed=0 ) // fix

    // demand
    sessions = Object.keys(behoefte).reduce((a,d)=>{
        const daysessions = Object.keys(behoefte[d]).reduce((aa,s)=>{
            aa[d+""+s] = {demand: behoefte[d][s], preferred: 0, deployed:0 }
            return aa
        },{})
        return {...a, ...daysessions }
    },{})


    sessions = Object.keys(sessions).reduce((a,s)=>{
        preferred = resources.reduce((aa,r)=>{
            //console.log("r >>>", r.name, r.sessies)
            aa = aa + r.sessies[s].preferred
            return aa
        },0)
        a[s]={...sessions[s], preferred}
        return a
    },{})


    sessionsxcoaches = Object.keys(sessions).reduce((a,s)=>{
        a += sessions[s].demand * dvd[s.substr(1,1)].uren
        return a
    },0)

    deploymentmax = Math.ceil( sessionsxcoaches / resources.length );

}

// equalize + randomize the resources
function equalize_and_radomize(resources) {

    resources
        .sort((a,b)=>Math.random()-Math.random())
        .map(r=>{
            //r.deploymentcount = Object.keys(r.sessies).reduce((a,s)=>{
            r.deploymenthours = Object.keys(r.sessies).reduce((a,s)=>{
                a += r.sessies[s].deployed * dvd[s.substr(1,1)].uren
                return a
            },0)
            return r
        })

    return resources
}

// plannen van één session = toewijzen coach als demand > deployed
function plan_session(sessions){

    // find session that needs resources
    const session = Object.keys(sessions).find(s=>
        sessions[s].deployed<sessions[s].demand
        )

    // equalize + randomize the resources
    resources = equalize_and_radomize(resources)

    // find resource with prefer
    let resource = Object.values(resources).find(r=>
        r.sessies[session].deployed < r.sessies[session].preferred &&
        r.deploymenthours < deploymentmax
        )
    
    // deployment preferred
    if (resource) {
        resource.sessies[session].deployed = 1
    }
    // find next random resource without prefer -> resource with lowest deployment hours
    else {
        const resourceflt = Object.values(resources).filter(r=>
            r.sessies[session].deployed === 0 &&
            r.deploymenthours < deploymentmax
            )
            .sort((a,b)=>a.deploymenthours-b.deploymenthours)

        if (resourceflt.length) resource = resourceflt[0]

        /*
        resource = Object.values(resources).find(r=>
            r.sessies[session].deployed === 0 &&
            r.deploymenthours < deploymentmax
            )
        */

    }

    if(!resource)  return sessions; // no resources left

    resource.sessies[session].deployed = 1 //* dvd[session.substr(1,1)].uren ; // add deployment to resource
    //resource.sessies[session].uren = 1 * dvd[session.substr(1,1)].uren //* dvd[session.substr(1,1)].uren ; // add deployment to resource
    sessions[session].deployed += 1; // add deployment to session

    if (!sessions[session].coaches)  sessions[session].coaches = []

    sessions[session].coaches.push(resource.name); // add coach name to session

    //console.log("session", session, sessions[session] )//, resource.name, resource.sessies[session] )

    return sessions

}

// recurse until no session left with demand > deployed
function makeplan(sessions) {

    sessions = plan_session(sessions)

    const session = Object.keys(sessions).find(s=>
        sessions[s].deployed < sessions[s].demand 
        )

    if (!session) return sessions
    else return makeplan(sessions)
}



function readplan(sessions){

    const session = Object.keys(sessions).find(s=>sessions[s].demand>0 && sessions[s].deployed===0 )

    if (!session) return sessions

    sessions[session].deployed = sessions[session].demand

    if (sessions[session].demand){
        const resource = resources.find(r=>r.name===sessions[session].coaches[0])
        resource.sessies[session].deployed=1
        resource.deploymenthours = Object.keys(resource.sessies)
            .reduce((a,s)=>{
                a+=resource.sessies[s].deployed * dvd[s.substr(1,1)].uren
                return a
           },0)
    }

    //console.log("s", session, sessions[session].coaches)

    return readplan(sessions)

}

// --- add stats to resources --- //
function resourcesstatisticsS(resources) {

    resources = resources
        .map(r=>{

            r.deploymentcount = Object.keys(r.sessies).reduce((a,s)=>{
                a += r.sessies[s].deployed
                return a
            },0)

            r.deploymenthours = Object.keys(r.sessies).reduce((a,s)=>{
                //a += (r.sessies[s].uren) ? r.sessies[s].uren : 0 ;
                a += r.sessies[s].deployed * dvd[s.substr(1,1)].uren
                return a
            },0)

            r.deploymentpreferred = Object.keys(r.sessies).reduce((a,s)=>{
                if (r.sessies[s].preferred && r.sessies[s].deployed)
                    a += 1
                return a
            },0)

            return r
        })

    return resources
}

function resourcessort(sortorder) {

    if (sortorder==="hours")
        return resources.sort((a,b)=> b.deploymenthours-a.deploymenthours) // sort op deploymenthours

    return resources.sort((a,b)=> (a.name>b.name)? 1:-1) // sort op name

}


function dowlanguage(){

    // dagen van de week - gimmick
    dow = new Array(7)
    .fill(1)
    .reduce((a,x,i)=>{
        a[String(i+1)] = new Date(2021,11,12+i+1).toLocaleDateString(language, { weekday: 'long' }) 
        return a
    },{}
    )
}


// console log resources
function logresource(rs) {

    const r = rs.shift()

    console.log( r.name, r.deploymenthours, r.deploymentcount, r.deploymentpreferred, Math.ceil(100*r.deploymentpreferred/r.deploymentcount)+"%"  )
    //console.log( r.sessies )

    Object.keys(r.sessies)
        .filter(s=>r.sessies[s].preferred || r.sessies[s].deployed)
        .forEach(s=>{
            if (r.sessies[s].deployed)
                console.log(s, dow[s.substr(0,1)], dvd[s.substr(1,1)].name,  r.sessies[s].preferred, r.sessies[s].deployed, dvd[s.substr(1,1)].uren )

        })

    if (rs.length) return logresource(rs)
    else return "fin"

}

// console log resources
function logsessions(rs) {

    Object.keys(rs).forEach(s=>{
        console.log( s, dow[s.substr(0,1)], dvd[s.substr(1,1)].name, sessions[s].demand, sessions[s].coaches||[] )
    })

}

compute_init()

// make plan
sessions = makeplan(sessions)

// read plan bitacademy
//sessions = readplan(sessionsbitaacademy)

resources = resourcesstatisticsS( resources )

//resources = resourcessort( "hours" )
resources = resourcessort( sortorder )

//logresource( Object.assign([],resources) )

//logsessions( Object.assign([],sessions) )


