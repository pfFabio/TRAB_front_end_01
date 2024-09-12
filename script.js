const url = 'https://pokeapi.co/api/v2/pokemon/'
const urlImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const pokemon = document.getElementById("pokemon")
const habilidades = document.getElementById("habilidades")
var ID = 1


function mudaID(valor){
    ID = Number(ID) + valor
    if(ID > 1022 ){
        ID = 1
    }if(ID < 1){
        ID = 1022
    }
    fetch(url+ID)
    .then(response => response.json())
    .then(data=>{   
        const img = document.createElement('img')
        const divimg = document.createElement('div')
        const divTPs = document.createElement('div')
        const divhabs = document.createElement('div')
        divTPs.style.display = "flex"
        img.src = urlImg + ID + '.png'
        pokemon.innerHTML = data["name"]
        pokemon.appendChild(divimg)
        pokemon.appendChild(divTPs)
        habilidades.innerHTML = '<h3>Habilidades </h3>'
        habilidades.appendChild(divhabs)
        divimg.appendChild(img)

        data["types"].forEach(tipo => {
            let divTP = document.createElement('div')
            divTP.innerHTML = tipo["type"]["name"]  
            divTP.style.textAlign = "center"
            divTP.style.width = '100%'
            divTP.style.backgroundColor = cortipo(tipo["type"]["name"])
            divTPs.appendChild(divTP)
        });

        data["abilities"].forEach(habilidade => {
            let divhab = document.createElement('div') 
            let texto = '- <strong>' + habilidade["ability"]["name"] + "</strong>:<br><div class='efeito'>"
            divhab.style.textAlign = "start"

            fetch(habilidade["ability"]["url"])
            .then(response => response.json())
            .then(info =>{
                info['effect_entries'].forEach(lingua => {
                    if (lingua['language']['name'] == 'en'){
                        divhab.innerHTML = texto + lingua['short_effect']
                    }
                })
            })
            divhabs.style.justifyContent = "space-between"
            divhabs.appendChild(divhab)
        });

        divTPs.style.justifyContent = "space-between"

        document.getElementById("atalho").setAttribute("placeholder", ID)
    })
}

function atalho(event){
    if(event.key == "Enter"){
        ID = document.getElementById("atalho").value        
    }
    mudaID(0)
}

function cortipo(tipo){
    switch(tipo){
        case 'grass': 
            bgc = '#7DDA58'
            break
        case 'fire': 
            bgc = '#E4080A'
            break
        case 'water': 
            bgc = '#5D6DE9'
            break
        case 'ice': 
            bgc = '#98F5F9'
            break
        case 'electric': 
            bgc = '#FFDE59'
            break
        case 'normal': 
            bgc = '#E8E8E8'
            break
        case 'fighting': 
            bgc = '#D20103'
            break
        case 'poison': 
            bgc = '#B86CE9'
            break
        case 'ground': 
            bgc = '#E8BD4F'
            break
        case 'flying': 
            bgc = '#5DE2E7'
            break
        case 'psychic': 
            bgc = '#E95DD4'
            break
        case 'bug': 
            bgc = '#A4AC44'
            break
        case 'rock': 
            bgc = '#D9B231'
            break
        case 'ghost': 
            bgc = '#1D0871'
            break
        case 'dragon': 
            bgc = '#550E98'
            break
        case 'dark': 
            bgc = '#4C2C03'
            break
        case 'steel': 
            bgc = '#CECECE'
            break
        case 'fairy': 
            bgc = '#E070E4'
            break
        default : 
            bgc = 'white'
            break
    }
    return bgc
}

mudaID(0)