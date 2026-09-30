export default function handler(req,res){
res.setHeader('Access-Control-Allow-Origin','*');
const live=[
{home:"Portugal",away:"Gibraltar",league:"EUROPE - Elite Club Friendlies",time:"28:19 H1",hot:true,homeScore:0,awayScore:0,market:"Portugal @ 0.75",odds:{"1":"1.72","X":"3.20","2":"4.50"},markets:30},
{home:"Eastleigh",away:"Truro",league:"ENGLAND - National League",time:"6:15 H1",hot:false,homeScore:0,awayScore:0,market:"Under 1.25, Over 0.75",odds:{"1":"1.01","X":"19.00","2":"8.75"},markets:18},
{home:"Arsenal Tula U19",away:"Strogino U19",league:"RUSSIA - U19",time:"15:36 H1",hot:true,homeScore:0,awayScore:1,market:"Arsenal Tula @ 2.25",odds:{"1":"1.55","X":"3.60","2":"5.00"},markets:22}
];
res.status(200).json({live});
}
