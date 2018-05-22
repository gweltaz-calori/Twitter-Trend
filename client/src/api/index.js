import axios from 'axios'
import * as d3 from "d3"
import { feature } from "topojson-client"

export async function getAllContinents() {
    let response = await axios.get('./static/continents-new.json')
    return response.data
}

export async function getGeojsonContinents() {
    return new Promise((resolve,reject) => {
        d3.json('./static/world-continents-v2.json', (req, world)  => {

            let color = "rgba(255,255,255,0.6)"

            let countries = feature(world, world.objects.continent);

            let asia = {type: "FeatureCollection", name: "Asia", color, id:1, features: countries.features.filter(function(d) { return d.properties.continent=="Asia"; })};
            let africa = {type: "FeatureCollection", name: "Africa", color, id:2, features: countries.features.filter(function(d) { return d.properties.continent=="Africa"; })};
            let europe = {type: "FeatureCollection", name: "Europe", color, id:3, features: countries.features.filter(function(d) { return d.properties.continent=="Europe"; })};
            let america = {type: "FeatureCollection", name: "America", color, id:5, features: countries.features.filter(function(d) { return d.properties.continent=="South America" || d.properties.continent=="North America"; })}
            let oceania = {type: "FeatureCollection", name: "Oceania", color, id:7, features: countries.features.filter(function(d) { return d.properties.continent=="Oceania"; })};

            resolve([asia,africa,europe,america,oceania])

        });
    })


}