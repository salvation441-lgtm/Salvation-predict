export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 const games=[
  {time:"15:36 H1",league:"International Youth U21",home:"Portugal",away:"Gibraltar",homeScore:0,awayScore:0,market:"Next Goal",hot:false,odds:{"1":"1.01","X":"19.00","2":"8.75"},markets:"+129"},
  {time:"31:28 H1",league:"England National League",home:"Eastleigh FC",away:"Southend United",homeScore:0,awayScore:1,market:"1X2",hot:true,odds:{"1":"8.75","X":"4.90","2":"1.33"},markets:"+173"},
  {time:"68' LIVE",league:"Premier League LIVE",home:"Arsenal",away:"Chelsea",homeScore:2,awayScore:1,market:"Next Goal",hot:true,odds:{"1":"1.45","X":"4.20","2":"6.50"},markets:"+200"}
 ];
 return res.status(200).json({success:true,live:games,liveCount:3});
}
