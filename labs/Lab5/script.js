// Lab 5: sample data from the assignment screenshot (replace with your completed Lab 5 data if different).
const data = [
  {name:'Joel Embiid',team:'PHI',points:33,rebounds:10.8,assists:5.7},
  {name:'Jalen Brunson',team:'NYK',points:32.4,rebounds:3.3,assists:7.5},
  {name:'Shai Gilgeous-Alexander',team:'OKC',points:30.2,rebounds:7.2,assists:6.4},
  {name:'Tyrese Maxey',team:'PHI',points:29.8,rebounds:5.2,assists:6.8},
  {name:'Donovan Mitchell',team:'CLE',points:29.6,rebounds:5.4,assists:4.7}
];
const tableBody = document.getElementById('player-rows');
const searchInput = document.getElementById('search');
const teamFilter = document.getElementById('team-filter');
const darkModeButton = document.getElementById('dark-mode-toggle');
let sortKey = null;
let ascending = true;
function displayPlayers(players){
  tableBody.replaceChildren();
  players.forEach(player=>{
    const tr=document.createElement('tr');
    ['name','team','points','rebounds','assists'].forEach(key=>{
      const td=document.createElement('td');td.textContent=player[key];tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}
function applyFilters(){
  const text=searchInput.value.trim().toLowerCase();
  const team=teamFilter.value;
  const players=data.filter(p=>p.name.toLowerCase().includes(text)&&(team==='all'||p.team===team));
  if(sortKey){players.sort((a,b)=>{
    const comparison=typeof a[sortKey]==='number'?a[sortKey]-b[sortKey]:String(a[sortKey]).localeCompare(String(b[sortKey]));
    return ascending?comparison:-comparison;
  });}
  displayPlayers(players);
}
[...new Set(data.map(p=>p.team))].sort().forEach(team=>{
  const option=document.createElement('option');option.value=team;option.textContent=team;teamFilter.appendChild(option);
});
searchInput.addEventListener('input',applyFilters);
teamFilter.addEventListener('change',applyFilters);
darkModeButton.addEventListener('click',()=>document.body.classList.toggle('dark-mode'));
tableBody.addEventListener('mouseover',event=>{const row=event.target.closest('tr');if(row&&tableBody.contains(row))row.classList.add('highlight-row');});
tableBody.addEventListener('mouseout',event=>{const row=event.target.closest('tr');if(row&&!row.contains(event.relatedTarget))row.classList.remove('highlight-row');});
document.querySelectorAll('#player-stats th').forEach(th=>{
  const sort=()=>{const key=th.dataset.key;if(sortKey===key){ascending=!ascending;}else{sortKey=key;ascending=true;}applyFilters();};
  th.addEventListener('click',sort);
  th.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();sort();}});
});
applyFilters();
