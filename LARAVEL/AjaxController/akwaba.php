<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Controllers\Controller;
use App\Mail\CustomerInvitationMail;
use App\Models\CustomerInvitation;
use App\Models\Offer;
use App\Models\Role;
use App\Models\Team;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class AjaxController extends Controller
{
    //
    // *** gets customers email to add to team
    public function getEmails(Request $request)
    {
        if(!Auth::guard('customer')->check()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $customer = Auth::guard('customer')->user();

        $input = $request->all();
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }

        $emails = Customer::select('email')->where('email', '!=', $customer->email)->get();

        return response()->json([
            'code' => 11,
            'message' => "OK",
            'data' => $emails,
        ]);
    }
    // *** adds a team to the current customer
    public function addTeam(Request $request)
    {
        if(!Auth::guard('customer')->check()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $customer = Auth::guard('customer')->user();

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }
        $teamName = $input['teamName'];
        //
        if($teamName == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }

        $team = new Team();
        $team->name = $teamName;
        $team->name_en = '';
        $team->objective = '';
        $team->customer_id = $customer->id;
        $team->save();

        $teams = Team::where('customer_id', $customer->id)->get();


        return response()->json([
            'code' => 11,
            'message' => "OK",
            'data' => ['team'=> $team, 'teams'=> $teams],
        ]);
    }
    // *** suggests a member of akwaba
    public function suggestMember(Request $request)
    {
        if(!Auth::guard('customer')->check()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $customer = Auth::guard('customer')->user();

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }

        // return response()->json([
        //     'code' => -333,
        //     'message' => "",
        //     'data' => $request->all(),
        // ]);

        $value = $input['value'];
        // $excludedEmails = $input['exclude'];

        $suggestions = Customer::select('id', 'name', 'email')->where('id', '<>', $customer->id)->where('name', 'like', '%'.$value.'%')->orWhere('email', 'like', '%'.$value.'%')->take(5)->get();

        // $suggestions = Customer::select('id', 'name', 'email')->where('name', 'like', '%'.$value.'%')->orWhere('email', 'like', '%'.$value.'%')->take(6);

        // $suggestions = $suggestions->where('id', '<>', $customer->id)->get();

        // TODO Check if suggestions not already in invitations

        // if($excludedEmails != '' && $excludedEmails != null){
        //     for($x = 0; $x < sizeof($excludedEmails); $x++){
        //         $suggestions = $suggestions->where('email', '!=', $excludedEmails[$x])->get();
        //     }
        // }

        return response()->json([
            'code' => 11,
            'message' => "OK",
            'data' => $suggestions,
        ]);
    }
    // *** suggests a designer of akwaba
    public function suggestDesigner(Request $request)
    {
        if(!auth()->user()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        // $user = auth()->user();

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }


        $value = $input['value'];
        // $excludedEmails = $input['exclude'];
        $designers = User::select('id', 'name', 'email')->where('role_id', Role::where('name', 'designer')->first()->id);
        $suggestions = $designers->orderBy('name')->take(10)->get();
        if(strlen($value) >= 2){

            $suggestions = $designers->where('name', 'like', '%'.$value.'%')->orWhere('email', 'like', '%'.$value.'%')->orderBy('name')->take(10)->get();
        }

        // $suggestions = $designers;
        // $suggestions = User::select('id', 'name', 'email')->where('name', 'like', '%'.$value.'%')->orWhere('email', 'like', '%'.$value.'%')->where('role_id', Role::where('name', 'designer')->first()->id)->take(5)->get();


        return response()->json([
            'code' => 11,
            'message' => "OK",
            'data' => $suggestions,
        ]);
    }
    // *** suggests a team to invite to a project
    public function suggestTeam(Request $request)
    {
        if(!Auth::guard('customer')->check()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $customer = Auth::guard('customer')->user();

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }

        // return response()->json([
        //     'code' => -333,
        //     'message' => "",
        //     'data' => $request->all(),
        // ]);

        $value = $input['value'];
        // $excludedEmails = $input['exclude'];

        $customerTeams = Team::where('customer_id', $customer->id)->orderBy('id', 'desc')->get();

        $teamsWithCustomer = DB::table('teams')->join('customer_teams', 'teams.id', '=', 'customer_teams.team_id')->where('customer_teams.customer_id', $customer->id)->select('teams.*')->get();

        $suggestions = [];
        array_push($suggestions, [$customerTeams, $teamsWithCustomer]);

        return response()->json([
            'code' => 11,
            'message' => "OK",
            'data' => $suggestions,
        ]);
    }

    // *** Invite members from a list
    public function inviteMember(Request $request)
    {
        if(!Auth::guard('customer')->check()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $customer = Auth::guard('customer')->user();

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }
        // $customer_requests = $input['project_id'];

        $emails = $input['emails'];

        $invitation_has_multiple_emails =  sizeof($emails) > 1 ? true : false ;

        // ** Generating invitation token
        $invitation_token = "AkwAbA_Invite;".$customer->id.";Amane_Hosanna;";

        for($x=0; $x < sizeof($emails); $x++){
            $invitation_token.=$emails[$x].";";
        }


        $crypted_token = Crypt::encrypt($invitation_token);

        $invitation = new CustomerInvitation();

        $invitation->invitation_token = $crypted_token;

        $invitation->recipient_emails = json_encode($emails);

        // for($x=0; $x < sizeof($emails); $x++){
        //     $invitation->have_recipients_accepted =
        // }

        if(!$invitation_has_multiple_emails){
            $invitation->recipient_email = $emails[0];
        }

        $invitation->customer_id = $customer->id;
        // $invitation->customer_request_id = $customer_request->id;
        $invitation->save();

        // *** Sending mails
        // for($x=0; $x < sizeof($emails); $x++){

        // }

        if($invitation){
            // if($invitation_has_multiple_emails){
                for($x=0; $x < sizeof($emails); $x++){
                    $mailSent = Mail::to($emails[$x])->send(new CustomerInvitationMail($invitation));
                }
            // }
                if($mailSent){
                    return response()->json([
                        'code' => 11,
                        'message' => "OK",
                        'data' => $invitation,
                    ]);
                } else{
                    return response()->json([
                        'code' => 10,
                        'message' => "Invitation enregistré,  mail non envoyé",
                        'data' => $invitation,
                    ]);
                }
        } else{
            return response()->json([
                'code' => 00,
                'message' => "L'invitation n'a pas pu être envoyée",
                'data' => null,
            ]);
        }
    }
    // *** Assign a designer to a request
    public function assignDesigner(Request $request)
    {
        if(!auth()->user()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }

        $user = auth()->user();

        $emails = $input['emails'];
        $request_id = $input['request_id'];

        $successfullyAddedAssignment = [];
        for($x=0; $x < sizeof($emails); $x++){
            // finding designers
            $designer_id = User::where('email', $emails[$x])->first()->id;

            $isAdded = DB::insert('insert into customer_request_designers (request_id, designer_id, user_id) values ('.$request_id.', '.$designer_id.', '.$user->id.')');

            array_push($successfullyAddedAssignment, $isAdded);
        }


        // if($invitation){
            // if($invitation_has_multiple_emails){
                // TODO send assignment request mail
                // for($x=0; $x < sizeof($emails); $x++){
                //     $mailSent = Mail::to($emails[$x])->send(new CustomerInvitationMail($invitation));
                // }
            // }
        if(sizeof($successfullyAddedAssignment) == sizeof($emails)){
            return response()->json([
                'code' => 11,
                'message' => "OK",
                'data' => $successfullyAddedAssignment,
            ]);
        } else{
            return response()->json([
                'code' => 10,
                'message' => "Assignment non enregistrés",
                'data' => $successfullyAddedAssignment,
            ]);
        }
    }
    // *** Delete an assignement from a request
    public function deleteAssignment(Request $request)
    {
        if(!auth()->user()){
            return response()->json([
                'code' => 403,
                'message' => "Unauthorized",
                'data' => null,
            ]);
        }

        $input = $request->all();
        //
        if($input == null){
            return response()->json([
                'code' => -11,
                'message' => "",
                'data' => null,
            ]);
        }

        // $user = auth()->user();

        $assignment_id = $input['assignment_id'];


        $isDeleted = DB::delete('delete from customer_request_designers where id = '.$assignment_id);



        // if($invitation){
            // if($invitation_has_multiple_emails){
                // TODO send assignment request deletion notification mail
                // for($x=0; $x < sizeof($emails); $x++){
                //     $mailSent = Mail::to($emails[$x])->send(new CustomerInvitationMail($invitation));
                // }
            // }
        if($isDeleted){
            return response()->json([
                'code' => 11,
                'message' => "OK",
                'data' => $isDeleted,
            ]);
        } else{
            return response()->json([
                'code' => 10,
                'message' => "Assignment not deleted",
                'data' => $isDeleted,
            ]);
        }
    }

    // *** To execute when a customer clicks on the invite link
    public function confirmInvitation($invitation_token)
    {

            $invitation = CustomerInvitation::where('invitation_token', $invitation_token)->get()->first();


            if ($invitation != null) {
                $invitation->has_recipient_accepted = true;
                $invitation->save();
                //
                $offersForMonth = Offer::where('period_id', 2)->get();
                return view('customer.home', compact('offersForMonth'));
            } else{
                return view('emails.invitations.customer_fail');
            }
        // } catch (DecryptException $e) {

    }
}
