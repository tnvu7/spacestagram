export default async function getData(query) {
    console.log("api call");
    try{
        const res = await fetch(`https://api.nasa.gov/planetary/apod?count=${query}&api_key=BTVw6zDPvF2RRpsep6rLcoovbceMSaxvwmLZlYh3`)
        const data = await res.json();
        return data;
    } catch(err){
        console.log("Error: " + err);
    }
}