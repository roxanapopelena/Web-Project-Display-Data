<?php

/**
 * Creates a JSON page based on the parameters
 * 
 * @author Roxana Pop
 * 
 */
class JSONpage
{
    private $page;
    private $recordset;

    /**
     * @param $pathArr - an array containing the route information
     */
    public function __construct($pathArr, $recordset)
    {
        $this->recordset = $recordset;
        $path = (empty($pathArr[1])) ? "api" : $pathArr[1];

        switch ($path) {
            case 'api':
                $this->page = $this->json_welcome();
                break;
            case 'login':
                $this->page = $this->json_login();
                break;
            case 'update':
                    $this->page = $this->json_update();
                break;
            case 'authors':
                $this->page = $this->json_authors();
                break;
            case 'author':
                $this->page = $this->json_author();
                break;
            case 'author-details':
                $this->page = $this->json_author_details();
                break;
            case 'slot-days':
                $this->page = $this->json_slot_days();
                break;
            case 'slot-day-details':
                $this->page = $this->json_slot_day_details();
                break;
            case 'slot-id-details':
                $this->page = $this->json_slot_id_details();
                break;
            case 'sessions':
                $this->page = $this->json_sessions();
                break;
            case 'presentation-authors':
                $this->page = $this->json_get_presentation_authors();
                break;
            case 'session-id-details':
                $this->page = $this->json_session_id_details();
                break;
            default:
                $this->page = $this->json_error();
                break;
        }
    }

    //an arbitrary max length of 20 is set
    private function sanitiseString($x)
    {
        return substr(trim(filter_var($x, FILTER_SANITIZE_STRING)), 0, 20);
    }

    //an arbitrary max range of 1000000 is set
    private function sanitiseNum($x)
    {
        return filter_var($x, FILTER_VALIDATE_INT, ["options" => ["min_range" => 0, "max_range" => 1000000]]);
    }

    /*welcome enpoint 
    *
    *States the author of the api and the available endpoints
    */
    private function json_welcome()
    {
        $msg = [
            'message' => 'Welcome.',
            'author' => 'Roxana Pop',
            'info' => [
                'endpoints' => [
                    '/' => 'Welcome Page',
                    '/login' => 'Login Page',
                    '/update' => 'Update Page',
                    '/authors' => 'Authors',
                    '/author' => 'Author details - string search',
                    '/author-details' => 'Author details - authorId search',
                    '/slot-days' => 'Slot day details',
                    '/slot-day-details' => 'Hour slots details',
                    '/slot-id-details' => 'Session details by slot',
                    '/sessions' => 'Sessions',
                    '/presentation-authors' => 'Authors of a presentation by contentId',
                    '/session-id-details' => 'Content details by sessionId',
                ]
            ]
        ];

        return json_encode($msg);
    }

    /*Error endpoint
    *
    *This is accessed whenever an api endpoint is invalid/non-existent
    */
    private function json_error()
    {
        $msg = ["message" => "error"];

        return json_encode($msg);
    }

    /*Sessions endpoint
    *
    *It retrieves the name and Id of every session
    *Filter available to search by the name string
    */
    private function json_sessions()
    {
        $query = "SELECT name, sessionId from sessions";

        if (isset($_REQUEST['search'])) {
            $query .= " WHERE name LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          }

        $res = json_decode($this->recordset->getJSONRecordSet($query, $params),true);
  
        $res['status'] = 200;
        $res['message'] = "ok";
        return json_encode($res);
    }

    /*Endpoint that retrieves the details of a content element, given a certain sessionId
    *
    *@sessionId is required; if the parameter is missing, and error is diplayed
    */
    private function json_session_id_details()
    {
        if ($_REQUEST['sessionId']) {
            $sessionId = $_REQUEST['sessionId'];
            
            $query = "SELECT title, abstract, award, content.contentId FROM content
                JOIN sessions_content ON sessions_content.contentId=content.contentId
                WHERE sessionId='$sessionId'";

            return json_encode(['status' => 200, 'payload' => $this->recordset->getJSONRecordSet($query, [])]);
        } else {
            return json_encode(['status' => 503, 'payload' => 'Missing parameter: sessionId.']);
        }
    }

    /*Endpoint that retrieves details of a session, given a certain slotId
    *
    *@slotId is required; if missing, an error will be displayed
    */
    private function json_slot_id_details()
    {
        if ($_REQUEST['slotId']) {
            $slotId = $_REQUEST['slotId'];
            $query = "SELECT sessionId, sessions.name, authors.name as 'chair', session_types.name as 'type', rooms.name as 'room' FROM sessions
                JOIN session_types ON session_types.typeId=sessions.typeId
                LEFT JOIN rooms ON sessions.roomID=rooms.roomId
                LEFT JOIN authors ON sessions.chairId=authors.authorId
                WHERE slotId='$slotId'";

            return json_encode(['status' => 200, 'payload' => $this->recordset->getJSONRecordSet($query, [])]);
        } else {
            return json_encode(['status' => 503, 'payload' => 'Missing parameter: slotId.']);
        }
    }

    /*Endpoint that retrieved the dayString of sessions 
    *
    *@dayInt is used to filter the data and retrieve only the week days Monday-Tuesday-Wednesday-Thursday
    */
    private function json_slot_days()
    {
        $query = "SELECT DISTINCT dayInt, dayString FROM slots WHERE dayInt>=1 AND dayInt<5";

        $res = json_decode($this->recordset->getJSONRecordSet($query, $params),true);
  
        $res['status'] = 200;
        $res['message'] = "ok";
        return json_encode($res);
    }

    /*Endpoint that retrieves the time slots, given the slotDay param created in the previous frunction
    *
    *@slotDay is required; and error will be displayed if missing
    */
    private function json_slot_day_details()
    {
        if ($_REQUEST['slotDay']) {
            $slotDay = $_REQUEST['slotDay'];
            $query = "SELECT DISTINCT `slotId`, type, startHour, startMinute, endHour, endMinute FROM slots
                WHERE dayInt='$slotDay'";

            return json_encode(['status' => 200, 'payload' => $this->recordset->getJSONRecordSet($query, [])]);
        } else {
            return json_encode(['status' => 503, 'payload' => 'Missing parameter: slotDay.']);
        }
    }

    /*Endpoint that retrieved all authors
    *
    *
    */
    private function json_authors()
    {
        $query = "SELECT name, authorId FROM authors";
        $params = [];

        $res = json_decode($this->recordset->getJSONRecordSet($query, $params),true);
  
        $res['status'] = 200;
        $res['message'] = "ok";
        return json_encode($res);
    }

    /*Endpoint to search through the authors table, given a certain string
    *
    *The search string is required; error will be displayed if missing
    */
    private function json_author()
    {
        if ($_REQUEST['search']) {
            $term = $this->sanitiseString('%' . $_REQUEST['search'] . '%');

            $query = "SELECT name, authorId FROM authors
                WHERE name LIKE '$term'";

            return json_encode(['status' => 200, 'payload' => $this->recordset->getJSONRecordSet($query, [])]);
        } else {
            return json_encode(['status' => 503, 'payload' => 'Missing parameter: search.']);
        }
    }

    /*Endpoint that retrieves data of a content, for a certain author, using the @authorId
    *
    *Displays data about the presentation of a author.
    *@autorId is required; error will pe displayed if missing.
    */
    private function json_author_details()
    {

        if ($_REQUEST['authorId']) {
            $term = $this->sanitiseNum($_REQUEST['authorId']);

            $query = "SELECT DISTINCT (title), abstract, award FROM content
                JOIN content_authors ON content.contentId=content_authors.contentId
                WHERE authorId='$term'";

            return json_encode(['status' => 200, 'payload' => $this->recordset->getJSONRecordSet($query, [])]);
        } else {
            return json_encode(['status' => 503, 'payload' => 'Missing parameter: authorId.']);
        }
    }

    /*Endpoint that retrieves all authors of a presentation, given a contentId param
    *
    *@contentId is required, error will be thrown if missing.
    */
    private function json_get_presentation_authors()
    {
        if ($_REQUEST['contentId']) {
            $contentId = $this->sanitiseNum($_REQUEST['contentId']);

            $query = "SELECT name, authorInst FROM authors
            JOIN content_authors ON content_authors.authorId=authors.authorId
            WHERE content_authors.contentId='$contentId'";

            return json_encode(['status' => 200, 'payload' => $this->recordset->getJSONRecordSet($query, [])]);
        } else {
            return json_encode(['status' => 503, 'payload' => 'Missing parameter: contentId']);
        }
    }

    
/**
 * json_update
 * 
 * updated existing session names
 * checks for input, token and a valid sessionIf and displays error accordigly
 */ 
private function json_update() {
    $input = json_decode(file_get_contents("php://input"));
  
    if (!$input) {
      return json_encode(array("status" => 400, "message" => "Invalid request"));
    }
    if (!isset($input->token)) {
      return json_encode(array("status" => 401, "message" => "Not authorised"));
    }
    if (!isset($input->name) || !isset($input->sessionId)) {  
      return json_encode(array("status" => 400, "message" => "Invalid request"));
    }
  
    try {
      $jwtkey = JWTKEY;
      $tokenDecoded = \Firebase\JWT\JWT::decode($input->token, $jwtkey, array('HS256'));
    }
    catch (UnexpectedValueException $e) {        
      return json_encode(array("status" => 401, "message" => $e->getMessage()));
    }
  
    $query  = "UPDATE sessions SET name = :name WHERE sessionId = :sessionId";
    $params = ["name" => $input->name, "sessionId" => $input->sessionId];
    $res = $this->recordset->getJSONRecordSet($query, $params);    
    return json_encode(array("status" => 200, "message" => "ok"));
  }
  
    /**
  * json_login
  * 
  * Login endpoint using a jason web token
  *token displays the email, username, 'issued at' and expiration date info
  *expiration date set at an hour after the iat data
  *checks for an imput of an email and password and then verified them
  *if no data is given or if the data is invalid, will display and error message
  */ 
  private function json_login() {
    $msg = "Invalid request. Username and password required";
    $status = 400;
    $token = null;
    $input = json_decode(file_get_contents("php://input"));
  
    if ($input) {
      if (isset($input->email) && isset($input->password)) {  
        $query  = "SELECT username, password FROM users WHERE email LIKE :email";
        $params = ["email" => $input->email];
        $res = json_decode($this->recordset->getJSONRecordSet($query, $params),true);
        $password = ($res['count']) ? $res['data'][0]['password'] : null;
    
        if (password_verify($input->password, $password)) {
          $msg = "User authorised. Welcome ". $res['data'][0]['username'];
          $status = 200;
          $token = array();
          $token['email'] = $input->email;
          $token['username'] = $res['data'][0]['username'];
          $token['iat'] = time();
          $token['exp'] = time()+60*60;
          $jwtkey = JWTKEY;
          $token = \Firebase\JWT\JWT::encode($token, $jwtkey);
        } else { 
          $msg = "username or password are invalid";
          $status = 401;
        }
      }
    }
    return json_encode(array("status" => $status, "message" => $msg, "token" => $token));
  }

    public function get_page()
    {
        return $this->page;
    }
}
