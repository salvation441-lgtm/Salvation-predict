export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  const {id, h2h} = req.query;
  if(!id) return res.status(400).json({error:'Need id'});
  const KEY = process.env.API_FOOTBALL_KEY;
  const base='https://v3.football.api-sports.io';
  const H={'x-apisports-key':KEY};
  try{
    const [fx, stats, h2hData, standings] = await Promise.all([
      fetch(`${base}/fixtures?id=${id}`,{headers:H}).then(r=>r.json()),
      fetch(`${base}/fixtures/statistics?fixture=${id}`,{headers:H}).then(r=>r.json()).catch(()=>({response:[]})),
      h2h? fetch(`${base}/fixtures/headtohead?h2h=${h2h}`,{headers:H}).then(r=>r.json()).catch(()=>({response:[]})) : Promise.resolve({response:[]}),
      fetch(`${base}/fixtures?id=${id}`,{headers:H}).then(r=>r.json()).then(async d=>{
        const f=d.response?.[0]; if(!f) return {response:[]};
        return await fetch(`${base}/standings?league=${f.league.id}&season=${f.league.season}`,{headers:H}).then(r=>r.json());
      }).catch(()=>({response:[]}))
    ]);
    const fixture = fx.response?.[0] || null;
    res.json({ fixture, statistics: stats.response||[], h2h: h2hData.response?.slice(0,5)||[], standings: standings.response?.[0]?.league?.standings?.[0]?.slice(0,10)||[] });
  }catch(e){ res.status(500).json({error:e.message}) }
              }
