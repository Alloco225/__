const fs = require('fs');
// Process input
let $client_count = 0;

// Distinct list of ingredients
const $ingredients = []
// 
const $clients = []

const $result = []

var data_set = 'a_an_example';
// data_set = 'b_basic';
// data_set = 'c_coarse';
// data_set = 'd_difficult';


const file = `./${data_set}.in.txt`;

function solve(){
    console.log(">> Solving");
    try {
        console.log(">> Ingredienst \n\n");
        console.log($ingredients);
    // $ingredients.push(new Ingredient('cheese'))
    // $ingredients.push(new Ingredient('peppers'))
    fs.readFile(file, (err, data)=>{
            if(err){
                console.log(">> errr", err)
                return;
            }
            var data = data.toString();
            // console.log(data);
            const data_lines = data.split('\n');
            
            console.log("lignes:", data_lines);
            $client_count = data_lines[0];
            console.log("Nb clients:", $client_count);
            
            const clients_data = data_lines.slice(1);
            // console.log("Données clients", clients_data);
            // Préferences clients
            const client_preferences = [];
            // Trouver la paire de préferences clients
            for(let i = 0; i < clients_data.length -1; i+=2){
                client_preferences.push([clients_data[i], clients_data[i+1]])
            }

            console.log("preferences clients", client_preferences);

            // trouver like/dislike de chaque client


            // Pour chaque préférence client
            client_preferences.forEach((preference, index)=>{
                let like_array = preference[0].split(' ');
                let dislike_array = preference[1].split(' ');

                // console.log(">> likes", like_array)
                // console.log(">> dislikes",dislike_array)
                // Ingredients aimés
                let likes_count = like_array[0]
                let liked_ingredients = like_array.slice(1);
                // Ingredients disliked
                let dislikes_count = dislike_array[0]
                let disliked_ingredients = dislike_array.slice(1);
                console.log("client ", index)
                console.log(">> liked ingredients", likes_count, liked_ingredients)
                console.log(">> disliked ingredients", dislikes_count, disliked_ingredients)
                $clients.push(new Client(liked_ingredients, disliked_ingredients))
                // Récupérer les noms des ingredients
                // $ingredients.push(...liked_ingredients, ...disliked_ingredients);

                sortIngredients(liked_ingredients, disliked_ingredients)
            })

            // Afficher la liste des ingredients
            console.log("\n\n\n!!!! INGREDIENTS :");
            console.log($ingredients);
            console.log("\n\n\n!!!! CLIENTS :");
            console.log($clients);
            
            $ingredients.forEach((ing)=>{
                console.log(ing.name, ing.score())
                // Score test case
                // if(ing.score() > 0){
                if(ing.score() > 0){
                    $result.push(ing.name);
                }
            })

            $result.unshift($result.length);

            console.log("\n\n\n!!!! RESULTATS :\n\n\n");
            console.log($result);

            console.log("\n\n\n!!!! EXPECTED CLIENTS :\n\n\n");
            $coming_clients = 0;
            $clients.forEach(client => {
                if(client.isComing($result.slice(1))){
                    $coming_clients ++;
                }
            });
            console.log($coming_clients + "/" + $client_count, (($coming_clients * 100) / $client_count) + "%");

            // Create data_set file
            var output_file = './'+data_set+'.out.txt';
            var data = $result.join(' ');

            console.log("Writing to file");
            fs.writeFile(output_file, data, (errWriting)=>{
                if(errWriting){
                    console.log("xx Error occured writing file", errWriting);
                }
                console.log("Output generated");
            })
        })


    } catch (error) {
        console.log("xx error", error)
    }
}


solve();


// cont potential clients

function countPotentialClients(){

}

// 
function sortIngredients(liked_ingredients, disliked_ingredients){
    console.log(">>> sortIngredients");
    // Sort liked Ingredients
    liked_ingredients.forEach((name_ingredient) => {
        // Créer l'ingredient s'il n'existe pas
        var exists = $ingredients.find((ing) =>{
            console.log('find', name_ingredient);
            return ing.name == name_ingredient
        });
        var index = $ingredients.indexOf(exists);
        // Si l'ingredient existe
        if(index != -1){
            $ingredients[index].like();
        }else {
            let new_ingredient = new Ingredient(name_ingredient);
            new_ingredient.like();
            $ingredients.push(new_ingredient);
        }
        console.log(">>> liked", index);
    })
    // Sort disliked Ingredients
    disliked_ingredients.forEach((name_ingredient) => {
        // Créer l'ingredient s'il n'existe pas
        var exists = $ingredients.find((ing) =>{
            console.log('find', name_ingredient);
            return ing.name == name_ingredient
        });
        var index = $ingredients.indexOf(exists);
        // Si l'ingredient existe
        if(index != -1){
            $ingredients[index].dislike();
        }else {
            let new_ingredient = new Ingredient(name_ingredient);
            new_ingredient.dislike();
            $ingredients.push(new_ingredient);
        }
        console.log(">>> disliked", index);
    })
}

// Envoyer le résultat


function Ingredient(name){
    this.name = name;
    this.liked = 0;
    this.disliked = 0;



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

        if(liked_ingredients_present == this.likes.length && disliked_ingredients_present == 0){
            return true;
        }
        return false;
    };


}