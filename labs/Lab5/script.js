
const data = [
    {name:"Joel Embiid",team:"Philadelphia 76ers (PHI)",points:33,rebounds:10.8,assists:5.7},
    {name:"Jalen Brunson",team:"New York Knicks (NYK)",points:32.4,rebounds:3.3,assists:7.5},
    {name:"Shai Gilgeous-Alexander",team:"Oklahoma City Thunder (OKC)",points:30.2,rebounds:7.2,assists:6.4},
    {name:"Tyrese Maxey",team:"Philadelphia 76ers (PHI)",points:29.8,rebounds:5.2,assists:6.8},
    {name:"Donovan Mitchell",team:"Cleveland Cavaliers (CAVS)",points:29.6,rebounds:5.4,assists:4.7},
    {name:"Luka Dončić",team:"Dallas Mavericks (DAL)",points:28.9,rebounds:9.5,assists:8.1},
    {name:"Nikola Jokić",team:"Denver Nuggets (DEN)",points:28.7,rebounds:13.4,assists:8.7},
    {name:"Anthony Davis",team:"Los Angeles Lakers (LAL)",points:27.8,rebounds:15.6,assists:4},
    {name:"LeBron James",team:"Los Angeles Lakers (LAL)",points:27.8,rebounds:6.8,assists:8.8},
    {name:"Anthony Edwards",team:"Minnesota Timberwolves (MIN)",points:27.6,rebounds:7,assists:6.5},
    {name:"Devin Booker",team:"Phoenix Suns (PHX)",points:27.5,rebounds:3.3,assists:6},
    {name:"Paolo Banchero",team:"Orlando Magic (ORL)",points:27,rebounds:8.6,assists:4},
    {name:"Kevin Durant",team:"Phoenix Suns (PHX)",points:26.8,rebounds:6.5,assists:3.3},
    {name:"Jayson Tatum",team:"Boston Celtics (BOS)",points:25,rebounds:9.7,assists:6.3},
    {name:"Khris Middleton",team:"Milwaukee Bucks (MIL)",points:24.7,rebounds:9.2,assists:4.7},
    {name:"Jaylen Brown",team:"Boston Celtics (BOS)",points:23.9,rebounds:5.9,assists:3.3},
    {name:"Bam Adebayo",team:"Miami Heat (MIA)",points:22.6,rebounds:9.4,assists:3.8},
    {name:"Kyrie Irving",team:"Dallas Mavericks (DAL)",points:22.1,rebounds:3.7,assists:5.1},
    {name:"Pascal Siakam",team:"Indiana Pacers (IND)",points:21.6,rebounds:7.5,assists:3.8},
    {name:"James Harden",team:"Los Angeles Clippers (LAC)",points:21.2,rebounds:4.5,assists:8},
    {name:"Jamal Murray",team:"Denver Nuggets (DEN)",points:20.6,rebounds:4.3,assists:5.6},
    {name:"Paul George",team:"Los Angeles Clippers (LAC)",points:19.5,rebounds:6.8,assists:4.8},
    {name:"Karl-Anthony Towns",team:"Minnesota Timberwolves (MIN)",points:19.1,rebounds:9,assists:2.6},
    {name:"Franz Wagner",team:"Orlando Magic (ORL)",points:18.9,rebounds:6.9,assists:4.4},
    {name:"Jalen Williams",team:"Oklahoma City Thunder (OKC)",points:18.7,rebounds:6.8,assists:5.4},
    {name:"Tyrese Haliburton",team:"Indiana Pacers (IND)",points:18.7,rebounds:4.8,assists:8.2},
    {name:"Donte DiVincenzo",team:"New York Knicks (NYK)",points:17.8,rebounds:4,assists:2.6},
    {name:"CJ McCollum",team:"New Orleans Pelicans (NOP)",points:17.8,rebounds:4.8,assists:4.8},
    {name:"Brook Lopez",team:"Milwaukee Bucks (MIL)",points:17.7,rebounds:4.3,assists:1.8},
    {name:"Myles Turner",team:"Indiana Pacers (IND)",points:17,rebounds:6.6,assists:2.1},
    {name:"Austin Reaves",team:"Los Angeles Lakers (LAL)",points:16.8,rebounds:3.8,assists:3.6},
    {name:"Tyler Herro",team:"Miami Heat (MIA)",points:16.8,rebounds:3.6,assists:5.4},
    {name:"Derrick White",team:"Boston Celtics (BOS)",points:16.7,rebounds:4.3,assists:4.1},
    {name:"Bobby Portis",team:"Milwaukee Bucks (MIL)",points:16.5,rebounds:11.3,assists:1},
    {name:"Bradley Beal",team:"Phoenix Suns (PHX)",points:16.5,rebounds:2.8,assists:4.5},
    {name:"Ivica Zubac",team:"Los Angeles Clippers (LAC)",points:16.2,rebounds:9.3,assists:1},
    {name:"Evan Mobley",team:"Cleveland Cavaliers (CAVS)",points:16,rebounds:9.3,assists:2.3},
    {name:"Michael Porter Jr.",team:"Denver Nuggets (DEN)",points:15.8,rebounds:6.8,assists:1.1},
    {name:"Darius Garland",team:"Cleveland Cavaliers (CAVS)",points:15.7,rebounds:3.6,assists:5.8},
    {name:"Chet Holmgren",team:"Oklahoma City Thunder (OKC)",points:15.6,rebounds:7.2,assists:2.1},
    {name:"Andrew Nembhard",team:"Indiana Pacers (IND)",points:14.9,rebounds:3.3,assists:5.5},
    {name:"Jalen Suggs",team:"Orlando Magic (ORL)",points:14.7,rebounds:5.1,assists:3.3},
    {name:"Josh Hart",team:"New York Knicks (NYK)",points:14.5,rebounds:11.5,assists:4.5},
    {name:"Jonas Valančiūnas",team:"New Orleans Pelicans (NOP)",points:14.5,rebounds:11,assists:1.3},
    {name:"Aaron Gordon",team:"Denver Nuggets (DEN)",points:14.3,rebounds:7.3,assists:4.4},
    {name:"Brandon Ingram",team:"New Orleans Pelicans (NOP)",points:14.3,rebounds:4.5,assists:3.3},
    {name:"D'Angelo Russell",team:"Los Angeles Lakers (LAL)",points:14.2,rebounds:2.8,assists:4.2},
    {name:"Kelly Oubre Jr.",team:"Philadelphia 76ers (PHI)",points:13.2,rebounds:4,assists:1.7},
    {name:"Jrue Holiday",team:"Boston Celtics (BOS)",points:13.2,rebounds:6.1,assists:4.4}
];

// 1. Get HTML elements
const tableBody = document.getElementById("player-rows");
const searchInput = document.getElementById("search");
const teamFilter = document.getElementById("team-filter");
const darkModeButton = document.getElementById("dark-mode-toggle");

// 2. Sorting variables
let sortKey = null;
let ascending = true;

// 3. Display players in the table
function displayPlayers(players) {
    tableBody.innerHTML = "";

    players.forEach(function(player) {
        const row = document.createElement("tr");

        const values = [
            player.name,
            player.team,
            player.points,
            player.rebounds,
            player.assists
        ];

        values.forEach(function(value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

// 4. Populate team dropdown
const teams = [...new Set(data.map(player => player.team))];

teams.sort();

teams.forEach(function(team) {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamFilter.appendChild(option);
});

// 5. Search, filter, and sort players
function filterPlayers() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedTeam = teamFilter.value;

    const filteredPlayers = data.filter(function(player) {
        const matchesSearch =
            player.name.toLowerCase().includes(searchText);

        const matchesTeam =
            selectedTeam === "all" || player.team === selectedTeam;

        return matchesSearch && matchesTeam;
    });

    if (sortKey !== null) {
        filteredPlayers.sort(function(a, b) {
            let comparison;

            if (typeof a[sortKey] === "number") {
                comparison = a[sortKey] - b[sortKey];
            } else {
                comparison = a[sortKey].localeCompare(b[sortKey]);
            }

            return ascending ? comparison : -comparison;
        });
    }

    displayPlayers(filteredPlayers);
}

// 6. Search input event
searchInput.addEventListener("input", filterPlayers);

// 7. Team filter change event
teamFilter.addEventListener("change", filterPlayers);

// 8. Dark mode click event
darkModeButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// 9. Mouseover event
tableBody.addEventListener("mouseover", function(event) {
    const row = event.target.closest("tr");

    if (row && tableBody.contains(row)) {
        row.classList.add("highlight-row");
    }
});

// 10. Mouseout event
tableBody.addEventListener("mouseout", function(event) {
    const row = event.target.closest("tr");

    if (row && !row.contains(event.relatedTarget)) {
        row.classList.remove("highlight-row");
    }
});

// 11. Optional sorting feature
document.querySelectorAll("#player-stats th").forEach(function(header, index) {
    const keys = ["name", "team", "points", "rebounds", "assists"];

    function sortPlayers() {
        const selectedKey = header.dataset.key || keys[index];

        if (sortKey === selectedKey) {
            ascending = !ascending;
        } else {
            sortKey = selectedKey;
            ascending = true;
        }

        filterPlayers();
    }

    header.addEventListener("click", sortPlayers);

    header.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            sortPlayers();
        }
    });
});

// 12. Display all players when the page loads
filterPlayers();
