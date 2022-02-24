const fs = require('fs');
// Process input
let $client_count = 0;

// Distinct list of ingredients
const $ingredients = []
const $clients = []
// [length_of_ingredients, ...ingredient_names]
let $result = []


let data_set = 'a_an_example';
data_set = 'b_basic';
data_set = 'c_coarse';
// data_set = 'd_difficult';
// data_set = 'e_elaborate';


const file = `./${data_set}.in.txt`;


// Find ingredients that have likes >= 0
function compute_for_most_liked_ingredients(){
    console.log(">> Processing...", data_set);
    try {
    // $ingredients.push(new Ingredient('cheese'))
    // $ingredients.push(new Ingredient('peppers'))
    fs.readFile(file, (err, data)=>{
            if(err){
                console.log(">> An error occured while reading file", err)
                return;
            }
            var data = data.toString();
            const data_lines = data.split('\n');

            $client_count = data_lines[0];
            
            const clients_data = data_lines.slice(1);
            const client_preferences = [];
            // Find client preference pairs
            for(let i = 0; i < clients_data.length -1; i+=2){
                client_preferences.push([clients_data[i], clients_data[i+1]])
            }

            // Dissociate each like/dislike array from client preference
            client_preferences.forEach((preference, index)=>{
                let like_array = preference[0].split(' ');
                let dislike_array = preference[1].split(' ');
                //
                let liked_ingredients = like_array.slice(1);
                let disliked_ingredients = dislike_array.slice(1);
                // 
                $clients.push(new Client(liked_ingredients, disliked_ingredients))
                // Sort and save ingredients
                sortIngredients(liked_ingredients, disliked_ingredients)
            })

            // Afficher la liste des ingredients
            $ingredients.forEach((ing)=>{
                // console.log(ing.name, ing.score())
                // Score test case
                if(ing.score() > 0){
                    $result.push(ing.name);
                }
            })

            $result.unshift($result.length);

            $coming_clients = 0;
            $clients.forEach(client => {
                if(client.isComing($result.slice(1))){
                    $coming_clients ++;
                }
            });
            // Number and Percentage of clients coming
            console.log("Clients coming :  " + $coming_clients + "/" + $client_count, (($coming_clients * 100) / $client_count).toFixed(0) + "%");
            // console.log($result);

            // Create data_set file
            var output_file = './'+data_set+'.out.txt';
            var data = $result.join(' ');

            // console.log("Writing to file");
            fs.writeFile(output_file, data, (errWriting)=>{
                if(errWriting){
                    console.log("xx Error occured writing file", errWriting);
                    return;
                }
                console.log("Ingredients", data);
                console.log("\n\n");
            })
        })
    } catch (error) {
        console.log("An error occured", error)
    }
}

function generate_clients_list(){

}

// Find clients that have less dislikes
function compute_for_more_introverted_clients(){

}


function main(){
    compute_for_most_liked_ingredients();
    compute_for_more_introverted_clients();
}

main();


/**
 * sortIngredients
 * @params liked_ingredients, disliked_ingredients
 * adds ingredients and like / dislikes them
 * 
 */
function sortIngredients(liked_ingredients, disliked_ingredients){
    // console.log(">>> sortIngredients");

    // Manage liked Ingredients
    liked_ingredients.forEach((name_ingredient) => {
        // Check if ingredient exists
        var exists = $ingredients.find((ing) =>{
            return ing.name == name_ingredient
        });
        var index = $ingredients.indexOf(exists);
        // If ingredient exists
        if(index != -1){
            // increase like count
            $ingredients[index].like();
        }else {
        // If ingredient does not exist
            let new_ingredient = new Ingredient(name_ingredient);
            // increase like count
            new_ingredient.like();
            // Add it to global ingredients
            $ingredients.push(new_ingredient);
        }
    })
    // Manage disliked Ingredients
    disliked_ingredients.forEach((name_ingredient) => {
        // Check if ingredient exists
        var exists = $ingredients.find((ing) =>{
            return ing.name == name_ingredient
        });
        var index = $ingredients.indexOf(exists);
        // If ingredient exists
        if(index != -1){
            // increase dislike count
            $ingredients[index].dislike();
        }else {
        // If ingredient does not exist
            let new_ingredient = new Ingredient(name_ingredient);
            // increase dislike count
            new_ingredient.dislike();
            // Add it to global ingredients
            $ingredients.push(new_ingredient);
        }
    })
    
}


function Ingredient(name){
    this.name = name;
    this.liked = 0;
    this.disliked = 0;
    //
    this.score = () => {return this.liked - this.disliked}
    this.like = () => this.liked++
    this.dislike = () => this.disliked++
}


function Client(likes, dislikes){
    this.likes = likes
    this.dislikes = dislikes

    this.isComing = (menu)=>{
        let liked_ingredients_present = 0;
        let disliked_ingredients_present = 0;
        //
        menu.forEach((menu_ingredient)=>{
            this.likes.forEach((liked_ingredient)=>{
                if(menu_ingredient == liked_ingredient ){
                    liked_ingredients_present++;
                }
            })
            this.dislikes.forEach((disliked_ingredient)=>{
                if(menu_ingredient == disliked_ingredient ){
                    disliked_ingredients_present++;
                }
            })
        })
        //
        if(liked_ingredients_present == this.likes.length && disliked_ingredients_present == 0){
            return true;
        }
        return false;
    };
}