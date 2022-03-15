<?php


namespace App\Helpers;

use App\Models\Entreprise;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;

class A {

    static function domain(){
        return Entreprise::find(session('entreprise_id', 1));
    }
    
    static function diffDays($date1 = null, $date2 = null){
        $t = 1;

        if($date1){
            try {
                $date1 = Carbon::parse($date1 ?? '');
            } catch (\Throwable $th) {
                //throw $th;
                //
            }
        }
        if($date2){
            try {
                $date2 = Carbon::parse($date2 ?? '');
            } catch (\Throwable $th) {
                //throw $th;
                //
            }
        }

        if($date2 && $date1){
            $t = $date2->diffInDays($date1);
        }

        return $t > 1 ? $t : 1;
    }

    static function transformDate($value, $format = 'Y-m-d h:i:s')
    {
        try {
            return Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value));
        } catch (\ErrorException $e) {
            AppLog::log("BienImport", "transformDate", "$e");
            return Carbon::createFromFormat($format, $value);
        }
    }
    

    static function ff($num){
        try {
            //code...
            return number_format($num, 0, ',', ' ');
        } catch (\Throwable $th) {
            //throw $th;
            return null;
        }
    }
    static function ffp($phone){
        $data = '+11234567890';
        $data = '11234567890';
        $data = '2250574936826';
        $data = '0574936826';
        if( preg_match( '/^\+\d(\d{3})(\d{3})(\d{4})$/', $data, $matches ) )
        {
            $result = $matches[1] . ' ' .$matches[2] . ' ' . $matches[3];
            return $result;
        }
        if( preg_match( '/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/', $data, $matches ) )
        {
            $result = $matches[1] . ' ' .$matches[2] . ' ' . $matches[3]. ' ' . $matches[4]. ' ' . $matches[5];
            return $result;
        }
        if( preg_match( '/^(\d{3})(\d{2})(\d{2})(\d{3})(\d{3})$/', $data, $matches ) )
        {
            $result = $matches[1] . ' ' .$matches[2] . ' ' . $matches[3]. ' ' . $matches[4]. ' ' . $matches[5];
            return $result;
        }
        return $phone;
    }
    static function domainId(){
        $id = session('entreprise_id');
        if($id){
            $entreprise = Entreprise::find($id);
            if($entreprise){
                return $entreprise->id;
            }
            return null;
        }
        return null;
    }
    static function random_code($length = 10, $upper = false){
        $r = Str::random($length);
        if($upper){
            $r = strtoupper($r);
        }
        return $r;
    }
    static function create_barcode($model = null, array $parents = []){
        $r = Str::random(10);
        return $r;
        if($model){
            $model = strtolower($model);
            $model = ucfirst($model);
            $model = "App\Models\\".$model;
            // $item = $model::where;
        }
        $r = "";
        if($model){
            $model = strtolower($model);
            $model = ucfirst($model);
            $r .= "IVX".$model[0].strtoupper($model[-1]);
            $model = "App\Models\\".$model;
            $item = $model::latest()->first();
            $id = 0;
            if($item){
                $id = $item->id;
            }
            if($parents){
                foreach ($parents as $parent) {
                    // EE1 // SE2 // BU3 // FR 5
                    $r .= $parent;
                }
            }

            $r .= $id;
        }
        return $r;
    }
    /**
     * Fetches 1 entry of the specified model
     */
    static function fetch($model, $value, $field = null, $entreprise_id = null){

        $libelles = [

        ];
        $noms = [
            'etat', 'categorie', 'sous_categorie', 'agent', 'bien',
            'service', 'marque', 'role',
            'fournisseur', 'article',
        ];
        $raison_sociale = [
            'entite',
        ];

        if(in_array($model, $libelles)){
            $field = 'libelle';
        }

        if(in_array($model, $noms)){
            $field = 'nom';
        }
        if(in_array($model, $raison_sociale)){
            $field = 'raison_sociale';
        }

        if(gettype($value) == "integer"){
            $field = 'id';
        }

        if($model == "sous_categorie"){
            $model = "SousCategorie";
        }
        if($model == "bien"){
            $model = "article";
        }
        if($model == "agent"){
            $model = "user";
        }
        // Fetch first model item
        $model = ucfirst($model);
        $model = "App\Models\\".$model;
        //
        if($entreprise_id == null){
            $r = $model::domain()
                ->where($field, $value)
                ->first();
        }else{
            $r = $model::where('entreprise_id', $entreprise_id)
                ->where($field, $value)
                ->first();
        }
        return $r;
    }
    /**
     * Creates a model entry with the provided data
     */
    static function create($model, array $data){
        $r = null;
        if(!$model || !$data){
            return $r;
        }

        $model = ucfirst($model);
        $model = "App\Models\\".$model;
        $r = $model::create($data);
        return $r;
    }
    /**
     * Tries to fetch then creates
     */
    static function fetchOrCreate($model, $value, $field = null){

        $fields = [
            'nom' => [
                'etat', 'categorie', 'sous_categorie', 'agent', 'bien',
                'service', 'marque', 'role',
                'fournisseur', 'article',
            ],
            'raison_sociale' => ['entite']
        ];

        foreach ($fields as $field_name => $tables) {
            if(in_array($model, $tables)){
                $field = $field_name;
            }
        }

        $aliases = [
            'sous_categorie' => ["SousCategorie"],
            'bien' => ["article"],
            'agent' => "user"
        ];

        foreach ($aliases as $name => $right_name) {
            if($model == $name){
                $model = $right_name;
            }
        }
        // Fetch first model item
        $model = ucfirst($model);
        $model = "App\Models\\".$model;
        $r = $model::where($field, $value)->first();

        if(!$r){
            $r = $model::create([$field => $value]);
        }
        return $r;
    }

    /**
     * Creates a simple unique attribute model for predefined tables
     * with unique attributes
     *
     */
    static function createSimple($model, $value, $entreprise_id = null){
        $r = null;
        if(!$model || !$value){
            return $r;
        }
        // Check if fields exists
        $e = self::fetch($model, $value);
        if($e){
            return $e;
        }
        // $spellings = [
        //     'sousCategorie' => [
        //         'sous categorie',
        //         'sous_categorie'
        //     ],
        // ];
        $libelles = [
        ];
        $noms = [
            'etat', 'categorie', 'sous_categorie', 'agent', 'bien', 'service',
            'fournisseur', 'article', 'marque', 'role'
        ];
        $raison_sociale = [
            'entite',
        ];

        $codes = [
            'entite', 'site', 'bureau', 'direction'
        ];
        $domain = [
            'etat', 'categorie', 'agent', 'bien', 'service', 'fournisseur', 'article', 'marque',
        ];
        $data = [];
        // Base fields
        if(in_array($model, $libelles)){
            $data = [
                'libelle' => $value,
            ];
        }
        if(in_array($model, $noms)){
            $data = [
                'nom' => $value,
            ];
        }
        if(in_array($model, $raison_sociale)){
            $data = [
                'raison_sociale' => $value,
            ];
        }

        if(in_array($model, $domain)){
            $data = [
                'entreprise_id' => $entreprise_id == null ? A::domainId() : $entreprise_id,
            ];
        }
        // Additionnal required fields
        if(in_array($model, $codes)){
            $data['code']  = self::random_code();
        }
        if($model == "sous_categorie"){
            $model = "SousCategorie";
        }
        if($model == "bien"){
            $model = "article";
        }
        if($model == "agent"){
            $model = "user";
        }
        // Model creation
        $model = ucfirst($model);
        $model = "App\Models\\".$model;
        $r = $model::create($data);
        return $r;
    }

    /**
     * Get model collection from dates
     */

    static function fetchInterval($model, $debut = null, $fin = null, $domain = true){
        $aliases = [
            'bien' => "Article",
            'bien_sorti' => "BienSorti",
            'scan_historique' => "ScanHistorique",
            'agent' => "User",
        ];

        foreach ($aliases as $alias => $correct_name) {
            if($model == $alias){
                $model = $correct_name;
            }
        }
        $model = ucfirst($model);
        $model = "App\Models\\".$model;
        if($debut){
            $debut = date("Y-m-d", strtotime($debut));
        }
        if($fin){
            $fin = date("Y-m-d", strtotime($fin));
        }
        if(!$debut && !$fin){
            return null;
        }
        $data = new Collection([]);
        if($debut && $fin){
            $data = $model::where('created_at', '>=', $debut)
            ->where('created_at', '<', $fin)->get();
            if($domain){
                $data = $model::domain()->where('created_at', '>=', $debut)
                ->where('created_at', '<', $fin)->get();
            }
        }
        if($debut && !$fin){
            $data = $model::where('created_at', '>=', $debut)->get();
            if($domain){
                $data = $model::domain()->where('created_at', '>=', $debut)
                ->where('created_at', '<', $fin)->get();
            }
        }
        if(!$debut && $fin){
            $data = $model::where('created_at', '<', $fin)->get();
            if($domain){
                $data = $model::domain()->where('created_at', '>=', $debut)
                ->where('created_at', '<', $fin)->get();
            }
        }
        return $data;
    }

    /**
     * Even more efficient fetchInterval
     */
    static function downloadCsvForInterval($model, Request $request){
        $data = null;
        $debut = $request->date_debut;
        $fin = $request->date_fin;

        $data = A::fetchInterval($model, $debut, $fin);
        if($data == null){
            return redirect()->back()->withError("Dates non définies");
        }
        return A::downloadCsv($model, $data, $debut, $fin);
    }

    /**
     * CSV Downloader
     */

    static function downloadCsv(String $name, Collection $data, $debut = null, $fin = null){
        $csvExporter = new \Laracsv\Export();
        $aliases = [
            'bien' => "Article",
            'bien_sorti' => "BienSorti",
            'scan_historique' => "ScanHistorique",
            'agent' => "User",
        ];
        if(in_array($name, $aliases)){
            $n = $aliases[$name];
        }
        $n = ucfirst($name);
        $model = "App\Models\\".$n;
        $csvExporter->build($data, $model::$csvFields);
        $plural = "s";
        // ? add plurals for specials
        $title = $name.$plural."_".($debut ?? '')."--".($fin ?? '');
        return $csvExporter->download($title.'_'. now().'_.csv');
    }


    /**
     * API FUNCTIONS
     */

    static function json_response($data = null){
        return response()->json($data);
    }
    static function response($data = null, $message = ""){
        $m = $message;
        if($m == ""){
            if($data == null){
                $m = "Error";
            }else {
                $m = "Success";
            }
        }
        return response()->json([
            'data' => $data,
            'message' => $m,
        ]);
    }

    /**
     * Draw chart
     */
}

// ** HELPERS
function __s($array, $key){
    if(array_key_exists($key, $array)){
        return $array[$key];
    }
    return null;
}
