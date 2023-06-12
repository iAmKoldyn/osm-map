export const layers = [
    {
        name: "Basic Map",
        attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        checked: true
    },
    {
        name: "Topo Map",
        attribution: 'Map data: &amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &amp;copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        checked: false
    },
    {
        name: "OPNVKarte",
        attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        url: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
        checked: false
    },
    {
        name: "HOT Map",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
        url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        checked: false
    },
]