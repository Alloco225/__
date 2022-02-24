const fs = require("fs");

// Distinct list of ingredients
let $ingredients = [];
let $clients = [];


// Find how many ppl some ingredient combination bring then try to find how to max it out
function compute_for_menu_formula(data_set) {
    console.log(":: compute_for_menu_formula :", data_set);

    // format_input(data_set);

    let file = `./${data_set}.in.txt`;
    console.log("::> Formatting :", data_set);

    try {
        fs.readFile(file, (err, data) => {
            if (err) {
                console.log(">> An error occured while reading file", err);
                return;
            }
            var data = data.toString();
            const data_lines = data.split("\n");

            $client_count = data_lines[0];

            const clients_data = data_lines.slice(1);
            const client_preferences = [];
            // Find client preference pairs
            for (let i = 0; i < clients_data.length - 1; i += 2) {
                client_preferences.push([clients_data[i], clients_data[i + 1]]);
            }

            // Dissociate each like/dislike array from client preference
            client_preferences.forEach((preference, index) => {
                let like_array = preference[0].split(" ");
                let dislike_array = preference[1].split(" ");
                //
                let liked_ingredients = like_array.slice(1);
                let disliked_ingredients = dislike_array.slice(1);
                //
                $clients.push(new Client(index + 1, liked_ingredients, disliked_ingredients));
                // Sort and save ingredients
                sortIngredients(liked_ingredients, disliked_ingredients);
            });

            /** Formatting finished */

            let clients_coming = 0;
            // let menu_ingredients = [];
            // let personnes = 0;

            let must_have_ingredients = [];
            let ingredients_to_check = []
            $ingredients.sort((a,b) => a.dislikes - b.dislikes).forEach((ing) => {
                if (ing.score() > 0) {
                    must_have_ingredients.push(ing.name)
                }else{
                    ingredients_to_check.push(ing);
                }
            });

            let minimum_ppl_to_expect = $clients.filter((cli) => cli.isComing(must_have_ingredients)).length;

            // Foreach ingredient to check count how many ppl you would lose
            
            ingredients_to_check.filter(ing => ing.likes > 0).forEach(ing_to_check => {
                // try putting it on a pizza to see
                let new_menu = [...must_have_ingredients, ing_to_check.name];
                // count how many ppl would come
                let ppl_coming = $clients.filter(cli => cli.isComing(new_menu)).length
                if(ppl_coming > minimum_ppl_to_expect){
                    console.log("-4°", ppl_coming);
                    minimum_ppl_to_expect = ppl_coming;
                    must_have_ingredients = new_menu
                }
            })
            
            clients_coming = $clients.filter((cli) => cli.isComing(must_have_ingredients)).length;
            

            /** Output */
            must_have_ingredients.unshift(must_have_ingredients.length);

            // Create data_set file
            var output_file = "./" + data_set + ".out.txt";
            var data = must_have_ingredients.join(" ");

            // console.log("Writing to file");
            fs.writeFile(output_file, data, (errWriting) => {
                if (errWriting) {
                    console.log("xx Error occured writing file", errWriting);
                    return;
                }

                console.log("menu :", must_have_ingredients);
                console.log(">>", clients_coming, "/", $clients.length, ((clients_coming * 100) / $clients.length).toFixed(0) + "%");
                console.log("Ingredients", must_have_ingredients[0], $ingredients.length);
                console.log("\n");
            });

        });
    } catch (error) {
        console.log("An error occured", error);
    }
}

function main() {
    let data_set = "a_an_example";
    data_set = 'b_basic';
    data_set = 'c_coarse';
    data_set = 'd_difficult';
    data_set = 'e_elaborate';
    // data_set = 'i_test';

    // compute_for_most_liked_ingredients(data_set);

    // compute_for_more_introverts(data_set);

    compute_for_menu_formula(data_set);
}

main();

/**
 * sortIngredients
 * @params liked_ingredients, disliked_ingredients
 * adds ingredients and like / dislikes them
 *
 */
function sortIngredients(liked_ingredients, disliked_ingredients) {
    // console.log(">>> sortIngredients");

    // Manage liked Ingredients
    liked_ingredients.forEach((name_ingredient) => {
        // Check if ingredient exists
        var exists = $ingredients.find((ing) => {
            return ing.name == name_ingredient;
        });
        var index = $ingredients.indexOf(exists);
        // If ingredient exists
        if (index != -1) {
            // increase like count
            $ingredients[index].like();
        } else {
            // If ingredient does not exist
            let new_ingredient = new Ingredient(name_ingredient);
            // increase like count
            new_ingredient.like();
            // Add it to global ingredients
            $ingredients.push(new_ingredient);
        }
    });
    // Manage disliked Ingredients
    disliked_ingredients.forEach((name_ingredient) => {
        // Check if ingredient exists
        var exists = $ingredients.find((ing) => {
            return ing.name == name_ingredient;
        });
        var index = $ingredients.indexOf(exists);
        // If ingredient exists
        if (index != -1) {
            // increase dislike count
            $ingredients[index].dislike();
        } else {
            // If ingredient does not exist
            let new_ingredient = new Ingredient(name_ingredient);
            // increase dislike count
            new_ingredient.dislike();
            // Add it to global ingredients
            $ingredients.push(new_ingredient);
        }
    });
}

function Ingredient(name) {
    this.name = name;
    this.likes = 0;
    this.dislikes = 0;
    //
    this.score = () => {
        return this.likes - this.dislikes;
    };
    this.like = () => this.likes++;
    this.dislike = () => this.dislikes++;
}

function Client(index, likes, dislikes) {
    this.name = "client" + index;
    this.likes = likes;
    this.dislikes = dislikes;

    this.likedIngredientsInMenu = (menu) => {
        let liked_ingredients_in_menu = [];
        menu.forEach((menu_ingredient) => {
            this.likes.forEach((liked_ingredient) => {
                if (menu_ingredient == liked_ingredient) {
                    liked_ingredients_in_menu.push(liked_ingredient);
                }
            });
        });
        return liked_ingredients_in_menu;
    };
    this.dislikedIngredientsInMenu = (menu) => {
        let disliked_ingredients_in_menu = [];
        menu.forEach((menu_ingredient) => {
            this.dislikes.forEach((disliked_ingredient) => {
                if (menu_ingredient == disliked_ingredient) {
                    disliked_ingredients_in_menu.push(disliked_ingredient);
                }
            });
        });
        return disliked_ingredients_in_menu;
    };

    this.isComing = (menu) => {
        return this.likedIngredientsInMenu(menu).length == this.likes.length && this.dislikedIngredientsInMenu(menu).length == 0;
    };
}
