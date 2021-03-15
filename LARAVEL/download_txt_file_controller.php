use Illuminate\Support\Facades\Response;

    function download(Request $request){
        $id = $request->id;
        $produit = Produit::find($id);

        $content = $produit->copy;
        $fileName = "produit_".$produit->id."-".$produit->nom.".txt";

        // use headers in order to generate the download
        $headers = [
            'Content-type' => 'text/plain',
            'Content-Disposition' => sprintf('attachment; filename="%s"', $fileName),
            'Content-Length' => strlen($content)
        ];

        // make a response, with the content, a 200 response code and the headers
        return Response::make($content, 200, $headers);
    }
