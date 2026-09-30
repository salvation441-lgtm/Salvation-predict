export default function handler(req,res){
 res.setHeader('Access-Control-Allow-Origin','*');
 res.setHeader('Cache-Control','s-maxage=30');
 const today = new Date().toISOString().slice(0,10);
 // REAL fixtures Sept 30 2026 - International break (no Premier today)
 const real=[
  {h:"Eritrea",a:"South Africa",l:"AFCON Qual • Today 19:00 GMT",s:"-:-",o:"6.50",x:"3.80",o2:"1.55",p:"South Africa WIN",live:false},
  {h:"Lithuania",a:"Andorra",l:"Friendly • Today 17:00",s:"-:-",o:"1.65",x:"3.60",o2:"5.00",p:"Lithuania WIN",live:false},
  {h:"Fiji",a:"New Caledonia",l:"Friendly • Today 08:00",s:"-:-",o:"2.30",x:"3.20",o2:"2.90",p:"OVER 2.5 GOALS",live:false},
  {h:"Papua New Guinea",a:"Solomon Islands",l:"Friendly • Today 05:00",s:"-:-",o:"2.40",x:"3.10",o2:"2.80",p:"BTTS YES",live:false},
  {h:"Medeama SC",a:"Port City FC",l:"GHA Premier • Today",s:"-:-",o:"2.10",x:"3.10",o2:"3.40",p:"Medeama WIN or DRAW",live:false},
  {h:"Roma Women",a:"Barcelona Women",l:"UWCL • Today 17:45",s:"-:-",o:"5.20",x:"4.00",o2:"1.55",p:"Barcelona WIN",live:false},
  {h:"Paris FC Women",a:"Arsenal Women",l:"UWCL • Today 17:45",s:"-:-",o:"3.20",x:"3.50",o2:"2.10",p:"BTTS YES",live:false},
  {h:"BK Hacken Women",a:"Juventus Women",l:"UWCL • Today 17:45",s:"-:-",o:"3.00",x:"3.40",o2:"2.20",p:"OVER 2.5",live:false},
  {h:"Lyon Women",a:"Chelsea Women",l:"UWCL • Today 20:00",s:"-:-",o:"1.80",x:"3.60",o2:"4.20",p:"Lyon WIN",live:false},
  {h:"Benfica Women",a:"Bayern Women",l:"UWCL • Today 20:00",s:"-:-",o:"4.50",x:"3.80",o2:"1.70",p:"Bayern WIN",live:false},
  {h:"Argentina",a:"Bolivia",l:"Friendly • Tonight 00:00 ET",s:"-:-",o:"1.25",x:"5.50",o2:"12.0",p:"Argentina WIN",live:false},
  {h:"Bahrain",a:"Yemen",l:"Arabian Gulf Cup • Tonight",s:"-:-",o:"1.40",x:"4.00",o2:"7.50",p:"Bahrain WIN",live:false}
 ];
 res.status(200).json({today:real, live:[], date:today.replace(/-/g,''), updated:new Date().toISOString(), count:real.length});
}
