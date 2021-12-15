// coachcalender-html.js


function html_calender(c, e){

    // left
    const divL = document.createElement("div")
    e.append(divL)

    // sheet heaader + row titles
    const div1 = document.createElement("div")
    div1.innerHTML = `${c.name} ${c.deploymenthours}uur ${Math.ceil(100 * c.deploymentpreferred/c.deploymentcount)}% `
    divL.append(div1)

    const div2 = document.createElement("div") // horizontal row fancy
    divL.append(div2)

    Object.values(dow).forEach(dag=>{

        // --- kolom 2
        const div1 = document.createElement("div")
        divL.append(div1)

        const div11 = document.createElement("div")
        div1.append(div11)
        div11.innerHTML = dag

    })

    // data: column header + row date
    Object.entries(dvd).forEach(d=>{

        const divR = document.createElement("div")
        e.append(divR)
    
        // header 
        const div1 = document.createElement("div")
        div1.innerHTML = `${d[1].name} ${d[1].start}-${d[1].end}`
        divR.append(div1)

        const div2 = document.createElement("div") // horizontal row fancy
        divR.append(div2)
    
        // rows
        Object.keys(dow).forEach(y=>{

            const data = c.sessies[y+""+d[0]]

            // --- kolom dvd
            const div1 = document.createElement("div")
            divR.append(div1)
    
            const div11 = document.createElement("div")
            div1.append(div11)

            if (data.demand) {
                // sessions - summary
                if (data.coaches) div11.innerHTML = data.demand + ": "+ data.coaches.join(", ")
            }
            else {
                
                if(data.deployed && data.preferred) div11.classList.add("preferred")
                else if (data.deployed) div11.classList.add("deployed")
                div11.innerHTML = data.deployed || "&nbsp;"
            }
    

        })
        

    })

}

// html resources
function html_resources(){

    //console.log("resources", resources)

    resources.forEach( r => {

        const caldiv = document.createElement("div")
        caldiv.classList.add("calender");
        window.resources.append(caldiv)

        html_calender(r, caldiv)

    });

}


// html sessions
function html_sessions(){

    const caldiv = document.createElement("div")
    caldiv.classList.add("calender");
    window.resources.append(caldiv)

    const plansuccess = Object.keys(resources)
        .reduce((a,r)=>{
            a += resources[r].deploymentpreferred/resources[r].deploymentcount            
            return a
        },0)

    const caldata = {
        name: "BitAcademy",
        deploymenthours: sessionsxcoaches,
        deploymentpreferred: plansuccess,
        deploymentcount: Object.keys(resources).length,
        sessies: sessions

    }

    html_calender(caldata, caldiv)

}


function bodyonload(){

    window.resources.innerHTML=""
    window.sortorder.innerHTML = "Volgorde " + ((sortorder==="name") ? "uren" : "naam")
    window.language.innerHTML  = languages[ languages.indexOf(language)+1 ] || languages[0] 

    html_sessions()

    html_resources()

}


// user clickable 

function refresh(){

    compute_init()

    sessions = makeplan(sessions)

    resources = resourcesstatisticsS( resources )

    resourcessort( sortorder )

    bodyonload()

}

function readsessions(){

    compute_init()

    sessions = readplan(sessionsbitaacademy)

    resources = resourcesstatisticsS( resources )

    resourcessort( sortorder )

    bodyonload()

}

function resourcesort(){

    sortorder = (sortorder==="name") ? "hours" : "name"
    
    resourcessort( sortorder )

    bodyonload()

}

function refreshlanguage(){

    language = languages[ languages.indexOf(language)+1 ] || languages[0] 
    
    dowlanguage()

    bodyonload()

}




