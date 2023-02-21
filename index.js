let form = document.querySelector('.forma');
let search = document.querySelector('.search');
let flag = document.querySelector('.flag');
let ena = document.querySelector('.ena');
let mosaxleoba = document.querySelector('.mosaxleoba');
let dedaqalaqi = document.querySelector('.dedaqalaqi')
let button = document.querySelector('.button')
let saxeli = document.querySelector('.saxeli')
let border = document.querySelector('.border')
let tempElement = document.querySelector('.temp')
let descElement = document.querySelector('.temperature-description')
let capTemp = document.querySelector('.captemp')
let foto = document.querySelector('.foto')
let time = document.querySelector('.time')
let valuta = document.querySelector('.valuta')
let border2 = document.querySelector('.border2')
let ena2 = document.querySelector('.ena2')
let front1 = document.querySelector('.pirveli')
let front2 = document.querySelector('.meore')
let front3 = document.querySelector('.mesame')
let front4 = document.querySelector('.meotxe')
let front5 = document.querySelector('.mexute')
let icon1 = document.querySelector('.gogsadze')
let icon2 = document.querySelector('.globusa')
let body = document.querySelector('body')
let dasax = document.querySelector('.dasax')
let ulu = document.querySelector('.ulu')
let yvela = document.querySelector('.yvela')
let chamo = document.querySelector('.chamo')
//listis damalva gamochena

ulu.addEventListener('click', (e)=>{
    e.preventDefault();
    dasax.style.display === 'inline' ? dasax.style.display = 'none' : dasax.style.display = 'inline'
})




///////////////////////////////////////////////


let clear2 = () => {
    search.value = ''
}


let clear = ()=>{
        ena.textContent=''
        flag.src=''
        mosaxleoba.textContent=''
        dedaqalaqi.textContent=''
        capTemp.textContent=''
        saxeli.textContent=''
        border.textContent=''
        border2.textContent ='' 
        tempElement.textContent = ''
        descElement.textContent = ''
        foto.src = ''
        latitude ='' 
        longitude ='' 
        // valuta =''
        time.textContent = ''
}

///////////////////////////////////////////////////

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + ' Millions' : Math.sign(num)*Math.abs(num)
}

const key = '4c7394aedbb69e22d6dd88cd3488fd72'
let latitude 
let longitude
let fuli
const KELVIN = 273;



form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    dzieba();
})


let likebi = []
let curentCountry = ''

 const liked = () => {
   if(likebi.length <5){ likebi.push(curentCountry)
    front1.textContent = likebi[0]
    front2.textContent = likebi[1]
    front3.textContent = likebi[2]
    front4.textContent = likebi[3]
    front5.textContent = likebi[4]}
    // likebi.forEach(t => {
    //     dasax.appendChild(document.createElement("li").appendChild(document.createTextNode(t))) 
        

    // }); 
 }

console.log(likebi);

 const unliked = () => {
    
    likebi.splice(likebi.indexOf(`${saxeli.textContent}`),1)
    console.log(`${saxeli.textContent}`);
    console.log(likebi);
    front1.textContent = likebi[0]
    front2.textContent = likebi[1]
    front3.textContent = likebi[2]
    front4.textContent = likebi[3]
    front5.textContent = likebi[4]
   
 }

 icon2.addEventListener('click',(e)=>{
    e.preventDefault();
    unliked()
    icon2.style.display = 'none'
    icon1.style.display = 'inline-block'
 })

 icon1.addEventListener('click',(e)=>{
    e.preventDefault();
    liked()
    
    icon1.style.display = 'none'
    icon2.style.display = 'inline-block'
 })
 

const icons =()=>{
    if (likebi.indexOf(`${curentCountry}`)==-1){
        icon1.style.display = 'inline-block'
        icon2.style.display = 'none'
    } else {
        icon2.style.display = 'inline-block'
        icon1.style.display = 'none'
    }
   
}



///listis click



dasax.addEventListener('click', (e)=>{
    e.preventDefault();
    search.value=e.target.textContent
    dzieba()
})



let sia = []

let gt = fetch (`https://restcountries.com/v3.1/all`).then(res=>res.json().then(k=>
 k.forEach(el=>sia.push(el.name.common))))



let arr = []
console.log(sia[5]);
chamo.textContent= `${arr[0]}`





  const dzieba = async () => {
    clear()
    curentCountry = ''
   let country = search.value;
   
//    icon1.style.display = 'inline-block'


   // country API
   try {await fetch (`https://restcountries.com/v3.1/name/${country}`).then(res=>res.json()).then(x=>{
        const lang = Object.values(x[0].languages)
        ena.textContent=`Language - ${lang.slice(0,4)}`
        ena2.textContent = `${lang.slice(4,(lang.length-1))}`
        flag.src=`${x[0].flags.png}`
        body.style.backgroundImage =`${x[0].flags.png}`
        mosaxleoba.textContent=`Population - ${kFormatter(x[0].population)} `
        dedaqalaqi.textContent=`Capital City - ${x[0].capital} `
        capTemp.textContent= `Weather in ${x[0].capital}`
        saxeli.textContent=`${x[0].name.common}`
        border.textContent=`Borders - ${x[0].borders.slice(0,6)}`
        border2.textContent = `${x[0].borders.slice(6,(x[0].borders).length-1)}`
        // valuta.textContent=`${Object.keys(x[0].currencies)}`
        // time.textContent=`${x[0].timezones}`
        latitude = x[0].capitalInfo.latlng[0]
        longitude = x[0].capitalInfo.latlng[1]
        console.log(fetch (`https://restcountries.com/v3.1/name/${country}`).then(res=>res.json()));
        fuli = Object.keys(x[0].currencies)
        curentCountry = country
        console.log(x);
        
        console.log(lang);


     
    });
   
    
       
        
     // Weather API   
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`).then(resp=> resp.json())
            
         
    
       .then(function(data){
            tempElement.innerHTML = `${Math.floor(data.main.temp - KELVIN)} &#176 <span>C</span>`
            descElement.innerHTML = data.weather[0].description;


           
            if(descElement.textContent.includes('clouds')){
            foto.src = "img/cloud.png"
            
        }else if(descElement.textContent.includes('clear')){
            foto.src = 'img/clear.png'
        }else if(descElement.textContent.includes('rain')){
            foto.src = 'img/rain.png'
        }else if(descElement.textContent.includes('snow')){
            foto.src = 'img/snow.png'
        }else if(descElement.textContent.includes('mist') || descElement.textContent.includes('fog')){
            foto.src = 'img/mist.png'
        }else if(descElement.textContent.includes('drizzle')){
            foto.src = 'img/rain.png'
        }
           
            
        })
    // Time API
    await   fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${+latitude}&lon=${+longitude}&format=json&apiKey=a05caaaeb5a34711a046ac7c18ea5b5d`).then(response => response.json()).then(y=>{
            time.textContent = new Date().toLocaleString("en-US", { timeZone: `${y.results[0].timezone.name}` });
            
         })
    
    


    // Valute API  
        let url = `https://v6.exchangerate-api.com/v6/ff8830934ea7e474238f33d9/latest/${fuli}`;
     await   fetch(url).then(response => response.json()).then(result =>{
        console.log(result);
            
            valuta.innerText = `1 ${fuli} = ${result.conversion_rates.GEL} lari `;
        }).catch(() =>{
            valuta.innerText = "Something went wrong";
        });
         

     icons()



    
    } 
        catch (error) {
            console.log(error);}
        
       

           
clear2()
// funqciis dasasruli
}





// console.log(fetch (`https://restcountries.com/v3.1/name/${country}`).then(res=>res.json()));

// console.log(fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`).then(resp=> resp.json()))
// console.log(fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${+latitude}&lon=${+longitude}&format=json&apiKey=a05caaaeb5a34711a046ac7c18ea5b5d`).then(response => response.json()));
 


// let test = document.querySelector('.test')

// const months = ['Jan', 'March', '<br></br>', 'April', 'June'];

// test.textContent=`${months}`



