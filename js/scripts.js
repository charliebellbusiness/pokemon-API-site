// JQuery function to make sure no code is run until the HTML is fully loaded

$(function () {
    //When the page loads, the pokemon info card should be hidden by default
    $("#pokemonInfoCard").hide();

    //Set up the event handler for when the search button is clicked
    $("#search").click(function() {
        //Get value of input from searchbar
        let nameOrID = $("#pokemonInput").val().toLowerCase();

        //Remove old info
        $("#pokemonInformationList").html("");

        getPokemonInfo(nameOrID);
    });

    function determineBackgroundColor(type) {
        switch (type) {
            case "bug":
                return "#A6B51D";
            case "dark":
                return "#4D392C";
            case "dragon":
                return "#735CDB";
            case "electric":
                return "#FCBB17";
            case "fairy":
                return "#EFA8EF";
            case "fighting":
                return "#7E321B";
            case "fire":
                return "#EA3E0D";
            case "flying":
                return "#9DAEF7";
            case "ghost":
                return "#5F5FB2";
            case "grass":
                return "#72C235";
            case "ground":
                return "#D1B055";
            case "ice":
                return "#6DD3F5";
            case "normal":
                return "#B8B1A6";
            case "poison":
                return "#924593";
            case "psychic":
                return "#EA457E";
            case "rock":
                return "#A68E44";
            case "steel":
                return "#B3B3C2";
            case "water":
                return "#2079D2";
            default:
                return "#000";
        }
    }

    //Function to retrieve information about a Pokemon from the API
    function getPokemonInfo(nameOrID) {
        //We need a way to asynchronously handle making the API call and doing stuff when we get a response since we don't know how long it will take to get a response

        //If we try to use synchronous code it would cause problems if the API hasn't responded in time

        $.ajax({ //Ansynchronous function start
            //URL to which request is made
            url: "https://pokeapi.co/api/v2/pokemon/" + nameOrID,
            type: "GET",
            //If the request succeeds, this function will pass
            success: function(result) {
                //This pulls the pokemon's name from JSON result
                let name = result.name;

                //Get sprite link
                let spriteLink = result.sprites.front_default;

                //Get ID
                let ID = result.id;
                
                //Get weight
                let weight = result.weight;
                //Get types
                let types = result.types;

                $("#pokemonName").html(name.toUpperCase());
                $("#pokemonImage").attr("src", spriteLink);

                $("#pokemonInformationList").append("<li class='list-group-item'>ID: " + ID + "</li>");
                $("#pokemon")

                $("#pokemonInformationList").append("<li class='list-group-item'>Weight: " + weight + "</li>");
                $("#pokemon")

                for (type of types) {
                    //for each type create new list item, configure list item, and append to pokemon information list

                    let li = document.createElement("li");
                    li.classList.add("list-group-item");
                    li.classList.add("text-capitalize");
                    li.innerHTML = type.type.name;
                    li.style.backgroundColor = determineBackgroundColor(type.type.name);

                    $("#pokemonInformationList").append(li);
                }


                //Make card reappear when information is ready to be displayed
                $("#pokemonInfoCard").show();
            },
           //If request fails, this function will pass 
            error: function(error) {
                console.log(error);
            }
        });
    }

}); 


