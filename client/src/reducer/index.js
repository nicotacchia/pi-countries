const initialState = {
  countries :  [],
  allcountries : [],
  population: [],
  activities: [],
  activity: [],
  details: [],
  allActivities: []
}

function rootReducer (state= initialState, action){
switch(action.type){
    
  case "GET_COUNTRIES":

        return{
            ...state,
            countries: action.payload,
            allcountries: action.payload,
            allActivities: action.payload,
        
           
        }
      
     
        
        case "FILTER_BY_CONTINENTS":
        const allcountries = state.allcountries;
        const countriesFiltered = action.payload === "All" ? allcountries : allcountries.filter(e => e.continents[0] === action.payload) 
        return {
          ...state,
          countries: countriesFiltered
      }
      case "FILTER_BY_POPULATION":
        const sortCountries = action.payload === "Min" ?
        state.countries.sort(function (a, b){
          if(a.name > b.name){
            return 1
          }
          if(b.name > a.name){
            return -1
          }
          return 0;
        }) :
        state.countries.sort(function (a,b){
          if(a.name > b.name){
            return -1;
          }
          if(b.name > a.name){
            return 1;
          }
          return 0;
        })
        return {
          ...state,
          population: sortCountries
        }

      case "GET_NAME_COUNTRY":
        return {
          ...state,
          countries: action.payload
        }

        case "GET_DETAILS":
          return {
            ...state,
            details: action.payload
          }

        case "GET_ACTIVITY":
            return {
                ...state,
                activity: action.payload
            }

        case "BY_ACTIVITY":
            const allActivities = state.allActivities;
            const activityFilter = action.payload === 'All' ? allActivities.filter(e => e.activities.length > 0) :
                allActivities.filter(c => c.activities.find((element) => element.name.toLowerCase() === action.payload))
            return {
                ...state,
                activity: activityFilter
            }

        /* 
       case "GET_ACTIVITIES":
        return {
          ...state,
          activities: action.payload
        } 

        case "POST_ACTIVITIES":
          return {
            ...state
          } */
        

        default:
          return state;
}
}

export default rootReducer;


