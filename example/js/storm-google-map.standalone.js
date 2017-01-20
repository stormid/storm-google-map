/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
 * @version 0.1.2: Fri, 20 Jan 2017 16:42:19 GMT
 * @author stormid
 * @license MIT
 */
!function e(t,i,n){function r(s,a){if(!i[s]){if(!t[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var d=i[s]={exports:{}};t[s][0].call(d.exports,function(e){var i=t[s][1][e];return r(i?i:e)},d,d.exports,e,t,i,n)}return i[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)r(n[s]);return r}({1:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(e){return new Promise(function(t,i){var n=document.createElement("script");n.src=e,n.onload=n.onreadystatechange=function(){this.readyState&&"complete"!==this.readyState||t()},n.onerror=n.onabort=i,document.head.appendChild(n)})},r=i.synchronous=function(e){if(!Array.isArray(e))throw new Error("Must be an array of URLs");return new Promise(function(t,i){var r=function r(){return e.length?void n(e.shift()).then(r).catch(i):t()};r()})};i.default=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(!t)return r(e);if(!Array.isArray(e))throw new Error("Must be an array of URLs");return Promise.all(e.map(function(e){return n(e)}))}},{}],2:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(i,"__esModule",{value:!0});var r=e("storm-load"),o=n(r),s={GMAPI:"http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$",INFOBOX:"https://cdn.rawgit.com/googlemaps/v3-utility-library/a2cdc955fcd20d47db28db645e63f0d2054070c9/1.1.9/src/infobox_packed.js",CLUSTERER:"https://cdn.rawgit.com/googlemaps/v3-utility-library/df501fcbc3e7513d6a94718ab6673de47c202255/1.0.2/src/markerclusterer_compiled.js",SPIDIFIER:"https://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js"},a={key:null,modules:{infobox:!0,clusterer:!0,spidifier:!0},map:{options:{scaleControl:!1,scrollwheel:!1,mapTypeControl:!1,overviewMapControl:!0,panControl:!1,rotateControl:!1,streetViewControl:!0,maxZoom:16,zoomControl:!0,styles:[{stylers:[{visibility:"on"},{saturation:-100,hue:"#000000"}]},{featureType:"road.local",stylers:[{visibility:"simplified"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",stylers:[{visibility:"on"}]},{featureType:"transit",stylers:[{visibility:"on"}]}]},markerIcon:"data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E"},spiderifier:{keepSpiderfied:!0,markersWontMove:!0,markersWontHide:!0},clusterer:{maxZoom:12,gridSize:20},infobox:{template:'<div class="infobox"><div class="infobox-inner" id="infobox"><h1 class="infobox-heading">{{title}}</h1></div></div>',closeIcon:"data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E",urlBase:"/",boxStyle:{width:"250px",opacity:1},pixelOffset:[-115,-10]}},l={init:function(){return this.isReady=!1,this.map=new google.maps.Map(f,this.settings.map.options),this.boundary=new google.maps.LatLngBounds,this.locations=d,this.element=f,this.markers=this.createMarkers(),this.spidifier=!!c.modules.spidifier&&this.initSpidifier(),this.attachMarkers(),this.markerCluster=!!c.modules.clusterer&&new MarkerClusterer(this.map,this.markers,this.settings.clusterer),this.map.fitBounds(this.boundary),this.initListeners(),this},createMarkers:function(){var e=this;return this.locations.map(function(t){var i=new google.maps.LatLng(t.location.lat,t.location.lng);return e.boundary.extend(i),new google.maps.Marker({position:i,clickable:e.settings.modules.infobox,infoBoxData:t,icon:{url:e.settings.map.markerIcon,scaledSize:new google.maps.Size(24,24)},optimized:!1})})},initSpidifier:function(){var e=this,t=new OverlappingMarkerSpiderfier(this.map,this.settings.spiderifier);return this.settings.modules.infobox&&t.addListener("click",function(t){return e.clickMarker.call(t)}),t},attachMarkers:function(){var e=this;this.markers.forEach(function(t){t.setMap(e.map),e.settings.modules.spidifier?e.spidifier.addMarker(t):e.settings.modules.infobox&&google.maps.event.addListener(t,"click",e.clickMarker)})},initListeners:function(){var e=this;google.maps.event.addListenerOnce(this.map,"idle",function(){return e.isReady=!0}),google.maps.event.addListener(this.map,"idle",function(){return e.mapCentre=e.map.getCenter()}),google.maps.event.addDomListener(window,"resize",function(){return e.map.setCenter(e.mapCentre)})},clickMarker:function(){var e=function(e,t){for(var i in t)t.hasOwnProperty(i)&&(e=e.split("{{"+i+"}}").join(t[i]));return e};this.infobox&&this.infobox.close(self.map,this),this.infobox=new InfoBox({content:e(c.infobox.template,this.infoBoxData),disableAutoPan:!1,zIndex:null,maxWidth:0,boxStyle:c.infobox.boxStyle,pixelOffset:new google.maps.Size(c.infobox.pixelOffset[0],c.infobox.pixelOffset[1]),alignBottom:!0,closeBoxMargin:"4px 4px 4px 4px",isHidden:!1,closeBoxURL:c.infobox.closeIcon,infoBoxClearance:new google.maps.Size(1,1),pane:"floatPane",enableEventPropagation:!1}),this.infobox.open(this.map,this),google.maps.event.addListener(this.map,"click",function(){this.infobox.close(this.map)}.bind(this))}},c={},d=[],f=!1,u=function(){return delete window.$__GMAPILoaded__$},p=function(e,t,i){var n=document.querySelector(e),r=s.GMAPI+(i&&i.key?"&key="+i.key:"");if(!n)throw new Error("No DOM element supplied to contain map");return c=Object.assign({},a,i),d=t,f=n,window.$__GMAPILoaded__$=u,(0,o.default)([r]).then(function(){var e=["infobox","clusterer","spidifier"].filter(function(e){return c.modules[e]===!0}).map(function(e){return s[e.toUpperCase()]});return(0,o.default)(e).then(function(){return Object.assign(Object.create(l),{settings:Object.assign({},a,c)}).init()}).catch(function(e){return console.log("Script loading error: "+e.message)})}).catch(function(e){return console.log("Script loading error: "+e.message)})};i.default={init:p}},{"storm-load":1}]},{},[2]);