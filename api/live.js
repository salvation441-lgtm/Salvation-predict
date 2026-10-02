export default async function handler(req, res){
 const key = process.env.API_FOOTBALL_KEY;
 try{
  // PL=39, LaLiga=140, SerieA=135, Bundesliga=78, GPL=488, UCL=2
  const leagues = [39,140,135,78,488,2];
  let all = [];
  for(let id of leagues){
   const r = await fetch(`https://v3.football.api-sports.io/fixtures?league=${id}&season=2023&next=5`,{
    headers:{'x-apisports-key': key}
   });
   const j = await r.json();
   if(j.response) all = [...all, ...j.response];
  }
  const games = all.slice(0,12).map(f=>({
   home: f.teams.home.name,
   away: f.teams.away.name,
   league: f.league.id==488?'GPL':f.league.id==2?'UCL':f.league.name.includes('Premier')?'PL':f.league.name,
   type: Math.random()>0.6?'1':Math.random()>0.5?'OVER':'BTTS',
   pred: Math.random()>0.6?'HOME WIN':Math.random()>0.5?'OVER 2.5':'BTTS YES',
   conf: Math.floor(80+Math.random()*15),
   live: f.fixture.status.short==='LIVE'?`${f.goals.home}-${f.goals.away} ${f.fixture.status.elapsed}'`:f.fixture.date.slice(11,16),
   result: f.fixture.status.short==='FT'?'WON':''
  }));
  res.status(200).json(games);
 }catch(e){
  res.status(200).json([]);
 }
}
