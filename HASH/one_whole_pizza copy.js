const fs = require("fs");

// Distinct list of ingredients
let $ingredients = [];
let $clients = [];

let $pizza_menu = [];

async function format_input(data_set) {
    $ingredients = [];
    $clients = [];
    $pizza_menu = [];

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
        });
    } catch (error) {
        console.log("An error occured", error);
    }
}

function write_output(data_set, data) {
    // Create data_set file
    var output_file = "./" + data_set + ".out.txt";
    // var data = $pizza_menu.join(" ");

    // console.log("Writing to file");
    fs.writeFile(output_file, data, (errWriting) => {
        if (errWriting) {
            console.log("xx Error occured writing file", errWriting);
            return;
        }
        console.log("Ingredients", $pizza_menu[0], $ingredients.length);
        console.log("\n");
    });
}

// Find ingredients that have likes >= 0
async function compute_for_most_liked_ingredients(data_set) {
    let file = `./${data_set}.in.txt`;
    console.log(">> Processing :", data_set);
    // Process input
    let $client_count = 0;

    // [length_of_ingredients, ...ingredient_names]
    let $pizza_menu = [];
    $clients = [];

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

            // const $newClients = []

            // Save ingredients based off this condition
            $ingredients.forEach((ing) => {
                // console.log(ing.name, ing.score())
                // Score test case

                if (ing.likes >= ing.dislikes) {
                    $pizza_menu.push(ing.name);
                }
                // if(data_set == 'c_coarse'){
                //     if(ing.score() > 0){
                //         $pizza_menu.push(ing.name);
                //     }
                // }else {
                //     if(ing.score() >= 0){
                //         $pizza_menu.push(ing.name);
                //     }
                // }
            });

            // test iterations
            $ppl_expected = 0;
            $clients.forEach((client) => {
                if (client.isComing($pizza_menu)) {
                    $ppl_expected++;
                }
            });

            for (let j = 0; j < $pizza_menu.length; j++) {
                let expecting = 0;
                let pizza = $pizza_menu.slice();
                $ingredients
                    .filter((ing) => {
                        return ing.score() < 0;
                    })
                    .forEach((ing) => {
                        if (pizza.indexOf(ing.name) == -1) {
                            pizza.push(ing.name);

                            $clients.forEach((client) => {
                                if (client.isComing(pizza)) {
                                    expecting++;
                                }
                            });
                            if (expecting > $ppl_expected) {
                                pizza;
                            }
                        }
                    });
            }

            $pizza_menu.unshift($pizza_menu.length);

            $coming_clients = 0;
            $clients.forEach((client) => {
                if (client.isComing($pizza_menu.slice(1))) {
                    $coming_clients++;
                }
            });
            // Number and Percentage of clients coming
            console.log("Clients coming :  " + $coming_clients + "/" + $client_count, (($coming_clients * 100) / $client_count).toFixed(0) + "%");
            // console.log($pizza_menu);

            // Create data_set file
            var output_file = "./" + data_set + ".out.txt";
            var data = $pizza_menu.join(" ");

            // console.log("Writing to file");
            fs.writeFile(output_file, data, (errWriting) => {
                if (errWriting) {
                    console.log("xx Error occured writing file", errWriting);
                    return;
                }
                console.log("Ingredients", $pizza_menu[0], $ingredients.length);
                console.log("\n");
            });
        });
    } catch (error) {
        console.log("An error occured", error);
    }
}

// Find ppl who don't dislike nor like too many things

async function compute_for_more_introverts(data_set) {
    let file = `./${data_set}.in.txt`;
    console.log(">> Processing :", data_set);
    // Process input
    let $client_count = 0;

    // [length_of_ingredients, ...ingredient_names]
    let $pizza_menu = [];

    $ingredients = [];
    $clients = [];
    // Ingredients that nobody hates
    $must_have_ingredients = [];

    // Ingredients to check
    $ingredients_to_check = [];
    //
    $clients_without_dislikes = [];
    $clients_withmore_likes = [];
    $clients_neutral = [];
    $clients_withmore_dislikes = [];

    $earned_clients = [];

    $custom_client_recipes = [];

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

            // const $newClients = []
            // console.log(">> ingredients");

            // Save ingredients based off this condition
            $ingredients
                .sort((a, b) => {
                    return a.dislikes - b.dislikes;
                })
                .forEach((ing) => {
                    if (ing.dislikes == 0) {
                        // $pizza_menu.push(ing.name);
                        $must_have_ingredients.push(ing.name);
                    } else {
                        $ingredients_to_check.push(ing);
                    }

                    // console.log(ing.name, ing.likes, ing.dislikes);
                });

            $pizza_menu.push(...$must_have_ingredients);

            $expected_clients = 0;

            $clients.forEach((c) => {
                if (c.isComing($pizza_menu)) {
                    $expected_clients++;
                }
            });

            // console.log("Must Have ingredients", $must_have_ingredients);
            // console.log("Ingredients to check", $ingredients_to_check.map(i=>i.name));
            // console.log(">> clients");
            // Sort clients by number of likes
            $clients
                .sort((a, b) => {
                    return a.dislikes.length - b.dislikes.length;
                })
                .forEach((client) => {
                    // console.log(ing.name, ing.score())

                    // console.log('client', client.name, client.likes.length, client.dislikes.length);

                    //
                    if (client.isComing($pizza_menu)) {
                        $earned_clients.push(client);
                    } else {
                        if (client.likes.length > client.dislikes.length) {
                            let liked_ing_count = client.likedIngredientsInMenu($pizza_menu).length;
                            let disliked_ing_count = client.dislikedIngredientsInMenu($pizza_menu).length;
                            // console.log(">> likes ", liked_ing_count, '/',$pizza_menu.length, "dislikes", disliked_ing_count,'/',$pizza_menu.length, "in the menu : isComing", client.isComing($pizza_menu));
                            //* If client not coming
                            // create a virtual menu and see how many people would leave
                            // add the clients liked ingredients
                            if (liked_ing_count > disliked_ing_count) {
                                let custom_client_menu = [...new Set([...$pizza_menu, ...client.likes])];

                                // console.log('>>', custom_client_menu);
                                // remove the clients disliked ingredients
                                // console.log('custom_menu', custom_client_menu);
                                for (let i = 0; i < client.dislikes; i++) {
                                    let indexToDelete = custom_client_menu.indexOf(client.dislikes[i]);
                                    if (indexToDelete != -1) {
                                        custom_client_menu.splice(indexToDelete, 1);
                                    }
                                }
                                // save each custom client menu
                                let ppl_still_coming = 0;
                                $clients.forEach((c) => {
                                    if (c.isComing(custom_client_menu)) {
                                        ppl_still_coming++;
                                    }
                                });
                                if (ppl_still_coming > $expected_clients) {
                                    $expected_clients = ppl_still_coming;
                                    // console.log("expexing",  $expected_clients)
                                    custom_client_menu.unshift(ppl_still_coming);
                                    $custom_client_recipes.push(custom_client_menu);
                                }
                            }
                        }
                    }
                });

            // * Find the best custom_recipe

            // Store it as pizza menu
            $custom_client_recipes.sort((a, b) => b[0] - a[0]);

            // console.log("Client recipes")
            // console.log($custom_client_recipes);

            // Best recipe
            if ($custom_client_recipes.length > 0) {
                let best_recipe = $custom_client_recipes[0];
                // $pizza_menu = best_recipe.slice(1);
                let best_recipe_ingredients = best_recipe.slice(1);
                // let temp = [...$pizza_menu, best_recipe_ingredients]
                let temp = [...new Set([...$pizza_menu, ...best_recipe_ingredients])];
                console.log("best_recipe temp", temp);

                $pizza_menu = temp;

                // return;
                console.log("BEST RECIPE", best_recipe[0], $pizza_menu);
            }
            $pizza_menu.unshift($pizza_menu.length);

            $coming_clients = 0;
            $clients.forEach((client) => {
                if (client.isComing($pizza_menu.slice(1))) {
                    $coming_clients++;
                }
            });
            // Number and Percentage of clients coming
            console.log("Clients coming :  " + $coming_clients + "/" + $client_count, (($coming_clients * 100) / $client_count).toFixed(0) + "%");
            // console.log($pizza_menu);

            // Create data_set file
            // var output_file = "./" + data_set + ".out.txt";
            // var data = $pizza_menu.join(" ");

            // console.log("Writing to file");
            // fs.writeFile(output_file, data, (errWriting) => {
            //     if (errWriting) {
            //         console.log("xx Error occured writing file", errWriting);
            //         return;
            //     }
            //     console.log("Ingredients", $pizza_menu[0], $ingredients.length);
            //     console.log("\n");
            // });
        });
    } catch (error) {
        console.log("An error occured", error);
    }
}

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
            
            console.log("menu :", must_have_ingredients);
            console.log(">>", clients_coming, "/", $clients.length, ((clients_coming * 100) / $clients.length).toFixed(0) + "%");
            // let menu_likes = menu_ingredients.reduce((sum, curr) =>  sum + curr.likes, 0);
            // let menu_dislikes = menu_ingredients.reduce((sum, curr) => sum + curr.dislikes, 0);
            // console.log("<<", menu_likes, ":", menu_dislikes, " --=", menu_likes - menu_dislikes, " -%", ((menu_dislikes * 100) / menu_likes).toFixed(0) + "%");



            // Number and Percentage of clients coming
            console.log("Clients coming :  " + $coming_clients + "/" + $client_count, (($coming_clients * 100) / $client_count).toFixed(0) + "%");
            // console.log($pizza_menu);

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
