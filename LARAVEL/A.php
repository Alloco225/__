
class A{

}

// ** HELPERS
function __s($array, $key){
    if(array_key_exists($key, $array)){
        return $array[$key];
    }
    return null;
}
