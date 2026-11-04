const map = L.map('map',{zoomControl:true,minZoom:3,maxZoom:18}).setView([31.8,35.5],5);
const baseLayers={
  osm:L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
  topo:L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',{maxZoom:17,attribution:'&copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'})
};
baseLayers.osm.addTo(map);
L.control.scale({metric:true,imperial:false,maxWidth:140,position:'bottomright'}).addTo(map);

const layers={hydro:L.layerGroup().addTo(map),relief:L.layerGroup(),vegetation:L.layerGroup(),polities:L.layerGroup().addTo(map),cities:L.layerGroup().addTo(map),routes:L.layerGroup().addTo(map)};
let currentYear=-1000, measuring=false, measurePoints=[], measureLayer=L.layerGroup().addTo(map), timelineTimer=null;
const $=id=>document.getElementById(id);

function yearLabel(y){
  if(y<0)return `${Math.abs(y)} av. J.-C.`;
  if(y===0)return 'Transition conventionnelle';
  return `${y} apr. J.-C.`;
}
function setYear(y){currentYear=Number(y);$('timeline').value=currentYear;$('dateLabel').textContent=yearLabel(currentYear);renderHistorical();}
function activeTestament(period){return period==='old'? $('oldTestament').checked : period==='new'? $('newTestament').checked : ($('oldTestament').checked||$('newTestament').checked);}
function clearLayer(layer){layer.clearLayers();}
function showDialog(html){$('dialogContent').innerHTML=html;$('infoDialog').showModal();}
function addNatural(){
  clearLayer(layers.hydro);clearLayer(layers.vegetation);
  ATLAS_DATA.natural.rivers.forEach(r=>L.polyline(r.coords,{color:'#548fa3',weight:2.3,opacity:.85}).bindTooltip(r.name).addTo(layers.hydro));
  ATLAS_DATA.natural.vegetation.forEach(v=>L.polygon(v.coords,{color:v.color,weight:1,fillColor:v.color,fillOpacity:v.fillOpacity,dashArray:'4 4'}).bindTooltip(v.name).addTo(layers.vegetation));
}
function renderHistorical(){
  Object.values({polities:layers.polities,cities:layers.cities,routes:layers.routes}).forEach(clearLayer);
  if($('polities').checked){
    ATLAS_DATA.polities.filter(p=>currentYear>=p.from&&currentYear<=p.to).forEach(p=>{
      const poly=L.polygon(p.coords,{color:p.color,weight:1.5,fillColor:p.color,fillOpacity:.23});
      poly.bindTooltip(p.name,{sticky:true});
      poly.on('click',()=>showDialog(`<div class="meta">Territoire · ${yearLabel(currentYear)}</div><h2>${p.name}</h2><p>${p.description}</p><p><strong>Période indicative :</strong> ${yearLabel(p.from)} à ${yearLabel(p.to)}.</p><p class="source-note">Emprise schématique ; les frontières et zones de contrôle ont varié.</p>`));
      poly.addTo(layers.polities);
    });
  }
  if($('cities').checked){
    ATLAS_DATA.cities.filter(c=>currentYear>=c.from&&currentYear<=c.to&&activeTestament(c.period)).forEach(c=>{
      const marker=L.circleMarker(c.coords,{radius:6,weight:1.5,color:'#fffdf5',fillColor:'#9b5145',fillOpacity:1});
      marker.bindTooltip(c.name);
      marker.on('click',()=>showDialog(`<div class="meta">Lieu biblique · ${yearLabel(currentYear)}</div><h2>${c.name}</h2><p>${c.description}</p><p><strong>Autres noms :</strong> ${c.aliases.join(' · ')}</p><p><strong>Références :</strong> ${c.refs}</p>`));
      marker.addTo(layers.cities);
    });
  }
  if($('routes').checked){
    ATLAS_DATA.routes.filter(r=>currentYear>=r.from&&currentYear<=r.to&&activeTestament(r.period)).forEach(r=>{
      const line=L.polyline(r.coords,{color:r.color,weight:4,opacity:.9,dashArray:'8 5'});
      line.bindTooltip(r.name);
      line.on('click',()=>showDialog(`<div class="meta">Itinéraire · ${yearLabel(currentYear)}</div><h2>${r.name}</h2><p>${r.description}</p><p><strong>Références :</strong> ${r.refs}</p>`));
      line.addTo(layers.routes);
    });
  }
}
function toggleLayer(id,enabled){if(enabled){layers[id].addTo(map)}else{map.removeLayer(layers[id])}}
function refreshLayerVisibility(){
  ['hydro','relief','vegetation','polities','cities','routes'].forEach(id=>toggleLayer(id,$(id).checked));
  $('vegetationLegend').classList.toggle('hidden',!$('vegetation').checked);
}
addNatural();renderHistorical();
['hydro','relief','vegetation','polities','cities','routes'].forEach(id=>$(id).addEventListener('change',()=>{refreshLayerVisibility();renderHistorical();}));
['oldTestament','newTestament'].forEach(id=>$(id).addEventListener('change',renderHistorical));
$('timeline').addEventListener('input',e=>setYear(e.target.value));
$('prevPeriod').onclick=()=>setYear(Math.max(-2000,currentYear-100));
$('nextPeriod').onclick=()=>setYear(Math.min(70,currentYear+100));
$('playTimeline').onclick=()=>{
  if(timelineTimer){clearInterval(timelineTimer);timelineTimer=null;$('playTimeline').textContent='▶ Lecture';return;}
  $('playTimeline').textContent='Ⅱ Pause';
  timelineTimer=setInterval(()=>{if(currentYear>=70){clearInterval(timelineTimer);timelineTimer=null;$('playTimeline').textContent='▶ Lecture';return;}setYear(Math.min(70,currentYear+10));},550);
};
$('basemap').onchange=e=>{Object.values(baseLayers).forEach(l=>map.removeLayer(l));baseLayers[e.target.value].addTo(map);};
$('homeView').onclick=()=>map.setView([31.8,35.5],5);
$('toggleSidebar').onclick=()=>{$('sidebar').classList.toggle('collapsed');setTimeout(()=>map.invalidateSize(),250);};

function haversine(a,b){
  const R=6371,toRad=v=>v*Math.PI/180,lat1=toRad(a[0]),lat2=toRad(b[0]),dLat=lat2-lat1,dLon=toRad(b[1]-a[1]);
  const h=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLon/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}
function durationText(hours){
  const days=Math.floor(hours/8),remaining=Math.round(hours-days*8);
  if(days===0)return `${remaining} h environ`;
  return `${days} jour(s) de voyage`+(remaining?` et ${remaining} h`:'');
}
function updateMeasure(){
  if(measurePoints.length<2){$('measureResult').textContent=`${measurePoints.length}/2 point(s) sélectionné(s).`;return;}
  const km=haversine(measurePoints[0],measurePoints[1]);
  const mode=document.querySelector('input[name="travelMode"]:checked').value;
  let text='';
  if(mode==='walk'){const days=km/35;text=`${days.toFixed(1)} journée(s) de marche (base : 35 km/jour).`;}
  if(mode==='horse'){const days=km/70;text=`${days.toFixed(1)} journée(s) à cheval (hypothèse : 70 km/jour, soit deux fois la marche).`;}
  if(mode==='sea'){const hours=km/5.5;text=`${hours<24?hours.toFixed(1)+' heures':(hours/24).toFixed(1)+' jours'} de navigation (hypothèse : 5,5 km/h de vitesse moyenne). Le vent, les escales et les courants peuvent modifier fortement la durée.`;}
  $('measureResult').innerHTML=`<strong>Distance directe :</strong> ${km.toFixed(1)} km<br><strong>Durée indicative :</strong> ${text}<br><small>Calcul à vol d'oiseau ; le relief, les routes antiques, les détours et les conditions de voyage ne sont pas encore pris en compte.</small>`;
}
$('measureBtn').onclick=()=>{measuring=true;measurePoints=[];measureLayer.clearLayers();$('measureResult').textContent='Clique sur le premier point, puis sur le second.';map.getContainer().style.cursor='crosshair';};
$('clearMeasure').onclick=()=>{measuring=false;measurePoints=[];measureLayer.clearLayers();$('measureResult').textContent='Aucun trajet mesuré.';map.getContainer().style.cursor='';};
map.on('click',e=>{
  if(!measuring)return;
  measurePoints.push([e.latlng.lat,e.latlng.lng]);
  L.marker(e.latlng,{icon:L.divIcon({className:'',html:'<div class="measure-pin"></div>',iconSize:[17,17],iconAnchor:[8,8]})}).addTo(measureLayer);
  if(measurePoints.length===2){
    L.polyline(measurePoints,{color:'#263a43',weight:3,dashArray:'5 5'}).addTo(measureLayer);
    measuring=false;map.getContainer().style.cursor='';updateMeasure();
  }else updateMeasure();
});
document.querySelectorAll('input[name="travelMode"]').forEach(r=>r.addEventListener('change',()=>{if(measurePoints.length===2)updateMeasure();}));

const translations={
  fr:{about:'À propos',lang:'Langue'},
  en:{about:'About',lang:'Language'},
  la:{about:'De atlas',lang:'Lingua'}
};
$('language').onchange=e=>{
  const t=translations[e.target.value];
  $('aboutBtn').textContent=t.about;
  document.querySelector('.language-label').textContent=t.lang;
  document.documentElement.lang=e.target.value;
  // Les fiches géographiques restent en français dans cette version.
};
$('aboutBtn').onclick=()=>$('aboutDialog').showModal();
$('closeAbout').onclick=()=>$('aboutDialog').close();
$('closeDialog').onclick=()=>$('infoDialog').close();
$('infoDialog').addEventListener('click',e=>{if(e.target===$('infoDialog'))$('infoDialog').close();});
$('aboutDialog').addEventListener('click',e=>{if(e.target===$('aboutDialog'))$('aboutDialog').close();});
setYear(-1000);
