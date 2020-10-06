<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\CustomerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AjaxController extends Controller
{
    //
    // *** checks for new sos alerts in the database
    // ** returns the alerts types and count
    public function sosRefresh(Request $request)
    {
        if(!Auth::check()){
            return response()->json([
                'code' => 403,
                'status' => "MISSING_AUTH",
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $alerts = CustomerRequest::latest()->where('is_treated', '=', false
        )->get();

        $alertsH = $alerts->where('request_type', 'sante');
        $alertsS = $alerts->where('request_type', 'securite');

        $data = [
            // 'health' => $alertsH,
            // 'security' => $alertsS,
            'count' => [
                'all' => $alerts->count(),
                'health' => $alertsH->count(),
                'security' => $alertsS->count(),
            ],
        ];

        return response()->json([
            'code' => 11,
            'status' => "OK",
            'message' => "OK",
            'data' => $data,
        ]);
    }
    //
    // *** mark as treated
    // ** returns the alerts types and count
    public function sosMarkTreated(Request $request)
    {
        if(!Auth::check()){
            return response()->json([
                'code' => 403,
                'status' => "MISSING_AUTH",
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $input = $request->all();

        if($input == null){
            return response()->json([
                'code' => -11,
                'status' => "MISSING_DATA",
                'message' => "",
                'data' => null,
            ]);
        }

        $alert = CustomerRequest::where('id', $input['alert_id'])->first();

        if($alert == null){
            return response()->json([
                'code' => -11,
                'status' => "NOT_FOUND",
                'message' => "",
                'data' => null,
            ]);
        }

        $alert->is_treated = true;
        $alert->current_status = "processed";
        $alert->save();

        return response()->json([
            'code' => 11,
            'status' => "OK",
            'message' => "Marked as treated",
            'data' => $alert,
        ]);
    }
    //
    // *** mark as treated
    // ** returns the alerts types and count
    public function sosMarkCompleted(Request $request)
    {
        if(!Auth::check()){
        return response()->json([
            'code' => 403,
            'status' => "MISSING_AUTH",
            'message' => "Unauthorized",
            'data' => null,
            ]);
        }

        $input = $request->all();
        if($input == null){
            return response()->json([
                'code' => -11,
                'status' => "MISSING_DATA",
                'message' => "",
                'data' => null,
            ]);
        }
        $alert = CustomerRequest::find($input['alert_id']);

        if($alert == null){
            return response()->json([
                'code' => -11,
                'status' => "NOT_FOUND",
                'message' => "",
                'data' => null,
            ]);
        }
        $alert->is_completed = true;
        $alert->save();

        return response()->json([
            'code' => 11,
            'status' => "OK",
            'message' => "Marked as completed",
            'data' => $alert,
        ]);
    }
    // **
    public function sosMarkCancelled(Request $request)
    {
        if(!Auth::check()){
        return response()->json([
            'code' => 403,
            'status' => "MISSING_AUTH",
            'message' => "Unauthorized",
            'data' => null,
            ]);
        }

        $input = $request->all();
        if($input == null){
            return response()->json([
                'code' => -11,
                'status' => "MISSING_DATA",
                'message' => "",
                'data' => null,
            ]);
        }
        $alert = CustomerRequest::find($input['alert_id']);

        if($alert == null){
            return response()->json([
                'code' => -11,
                'status' => "NOT_FOUND",
                'message' => "",
                'data' => null,
            ]);
        }
        $alert->current_status = "cancelled";
        $alert->save();

        return response()->json([
            'code' => 11,
            'status' => "OK",
            'message' => "Marked as cancelled",
            'data' => $alert,
        ]);
    }

    // *** sos Map
    // ** return an alert lat and lon
    public function sosGetMarker(Request $request)
    {
        if(!Auth::check()){
        return response()->json([
            'code' => 403,
            'status' => "MISSING_AUTH",
            'message' => "Unauthorized",
            'data' => null,
            ]);
        }

        $input = $request->all();
        if($input == null){
            return response()->json([
                'code' => -11,
                'status' => "MISSING_DATA",
                'message' => "",
                'data' => null,
            ]);
        }
        $alert = CustomerRequest::find($input['alert_id']);

        if($alert == null){
            return response()->json([
                'code' => -11,
                'status' => "NOT_FOUND",
                'message' => "",
                'data' => null,
            ]);
        }

        $marker = [
            'lat' => $alert->location_latitude,
            'lon' => $alert->location_longitude,
        ];

        return response()->json([
            'code' => 11,
            'status' => "OK",
            'message' => "Marked as completed",
            'data' => $marker,
        ]);
    }
}
