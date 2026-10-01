export default async function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Cache-Control','s-maxage=30');
 const KEY=process.env.API_FOOTBALL_KEY;
 const today=new Date().toISOString().slice(0,10);
 try{
  const r=await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}`,{headers:{'x-apisports-key':KEY}});
  const j=await r.json();
  let list=(j.response||[]).slice(0,25).map(f=>{
   let home=f.teams.home.name;
   let away=f.teams.away.name;
   let odd=(1.60+Math.random()*1.5).toFixed(2);
   return {
    f:f.fixture.id,
    h:home,
    a:away,
    s:`${f.goals.home??0}-${f.goals.away??0}`,
    l:f.league.name,
    time:new Date(f.fixture.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
    status:f.fixture.status.short,
    live:['1H','2H','HT','LIVE'].includes(f.fixture.status.short),
    p:Math.random()>0.5?home:away,
    o:odd
   }
  });
  res.json({today:list,count:list.length,date:today,live:list.filter(x=>x.live),plan:`FREE - ${j.results} games`});
 }catch(e){
  res.json({today:[],count:0,date:today,live:[],plan:'Error',error:e.message});
 }
}
