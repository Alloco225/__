<?php

namespace Database\Factories;

use App\Models\Etat;
use App\Models\Etage;
use App\Models\Piece;
use App\Models\Bureau;
use App\Models\Marque;
use App\Models\Article;
use App\Models\Categorie;
use App\Models\Fournisseur;
use Illuminate\Support\Str;
use App\Models\SousCategorie;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $pieces = Piece::all();
        $piece_id = 1;
        $etage_id = 1;
        $site_id = 1;
        // $entite_id = 1;
        if($pieces){
            $piece = Piece::inRandomOrder()->first();
            if($piece){
                $piece_id = $piece->id;
                $etage_id = $piece->etage->id;
                $site_id = $piece->etage->site->id;
                // $entite_id = $piece->etage->site->entite->id;
            }
        }
        // Sous categorie
        $sous_categorie = SousCategorie::all();
        $sous_categorie_id = 1;
        $categorie_id = 1;
        if($sous_categorie){
            $sous_categorie = Categorie::inRandomOrder()->first();
            if($sous_categorie){
                $sous_categorie_id = $sous_categorie->id;
                $categorie_id = $sous_categorie->categorie->id;
            }
        }
        // Fournisseur
        $fournisseur = Fournisseur::all();
        $fournisseur_id = 1;
        if($fournisseur){
            $fournisseur = Fournisseur::inRandomOrder()->first();
            if($fournisseur){
                $fournisseur_id = $fournisseur->id;
            }
        }
        // Marque
        $marque = Marque::all();
        $marque_id = 1;
        if($marque){
            $marque = Marque::inRandomOrder()->first();
            if($marque){
                $marque_id = $marque->id;
            }
        }
        // Etat
        $etat = Etat::all();
        $etat_id = 1;
        if($etat){
            $etat = Etat::inRandomOrder()->first();
            if($etat){
                $etat_id = $etat->id;
            }
        }
        // Bureau
        $bureaux = Bureau::all();
        $bureau_id = 1;
        $direction_id = 1;
        if($bureaux){
            $bureau = Bureau::inRandomOrder()->first();
            if($bureau){
                $bureau_id = $bureau->id;
                $direction_id = $bureau->direction->id;
            }
        }

        return  [
            'nom' => $this->faker->name ,
            'buy_at' => $this->faker->date() ,
            // 'numero_inventaire' => $num_i,
            'numero_serie' => Str::random(8),

            'numero_lot' => $this->faker->randomDigit,
            'quantite' => $this->faker->randomDigit,
            // 'valeur_residuelle' => $this->faker->,
            'taux_amortissement' => rand(10, 100)/100,
            'modele' => $this->faker->word,
            'lieu' => $this->faker->address,
            'observation' => $this->faker->paragraph,
            'nombre_annee_amortie' => $this->faker->randomDigit,
            'nombre_annee_garantie' => $this->faker->randomDigit,
            // 'etiquette' => $this->faker-> ,
            // 'sortie_inventaire' => $this->faker-> ,
            // 'composant' => $this->faker-> ,

            'prix_achat' => $this->faker->randomNumber(6),

            'designation' => $this->faker->paragraph,
            'photo' => $this->faker->imageUrl,

            'date_mise_en_service' => $this->faker->date(),

            'inventaire_id' => $inventaire_id,

            'fournisseur_id' => $fournisseur_id,
            'etat_id' => $etat_id,
            'marque_id' => $marque_id,

            'sous_categorie_id' => $sous_categorie_id,
            'categorie_id' => $categorie_id,

            'bureau_id' => $bureau_id,
            'direction_id' => $direction_id,

            'piece_id' => $piece_id,
            'etage_id' => $etage_id,
            'site_id' => $site_id,
        ];
    }
}
