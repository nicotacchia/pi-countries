import axios from "axios";

 //const url = 'http://localhost:3001/countries'; 

export function getCountries(){
    return async  function(dispatch){
        var json = await axios.get ('http://localhost:3001/countries');
        return dispatch({
            type: "GET_COUNTRIES",
            payload: json.data
        })
    }}

export function getCountriesByName(payload){
    return async function(dispatch){
        try {
            var json = await axios.get ('http://localhost:3001/countries?name=' + payload)
        return dispatch({
            type: "GET_NAME_COUNTRY",
            payload: json.data
        })
        } catch (error) {
            console.log(error)
        }
    }
}
        
export function getCountriesDetails(id){
    return async function(dispatch){
        try {
            console.log(id)
            var detail = await axios.get ('http://localhost:3001/countries/'+ id) 
            return dispatch({
                type: "GET_DETAILS",
                payload: detail.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


    export function postActivity(payload) {
        
        return async function () {
            try { console.log("soy payload",payload);
                const res = await axios.post('http://localhost:3001/activities', payload)
                return res;
            } catch (error) {
                console.log(error)
            }
        }
    }

   export function getActivity() {
        return async function (dispatch) {
            try {
                const res = await axios.get(`http://localhost:3001/activities`);
                return dispatch({
                    type: "GET_ACTIVITY",
                    payload: res.data
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
     


export function filterCountriesByContinents(payload){
    return {
        type: "FILTER_BY_CONTINENTS",
        payload
    }}

    export function filterPopulation(payload){
        return{
            type: "FILTER_BY_POPULATION",
            payload
        }
    }

    /* export const deleteActivity =   (id) => { 
        return function(dispatch) {
        fetch(URL, {method: "DELETE").then(res => res.json()).catch(error => console.log(error))
 */

    export function byActivity(payload) {
        return {
            type:"BY_ACTIVITY",
            payload
        }
    }
