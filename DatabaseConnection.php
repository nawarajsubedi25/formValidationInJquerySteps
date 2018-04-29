<?php
/*                          Database connection class 
 Whenever we need to connect database and need to execute query we simple call this class and the method
 */
class DatabaseConnection
{
    public $localhost ;
    public $username ;
    public $password ;
    public $dbname ;
    public $port ;
    public $connection;
    public function __construct ()
    {
      $this->localhost = "127.0.0.1";
      $this ->username = "nawarajsubedi25";
      $this ->password = "";
      $this ->dbname = "COMPANY";
      $this->port = 3306;
      $this-> connectDatabase();
    }
    // Connect database 
     public function connectDatabase()
     {
      $this->connection= mysqli_connect($this->localhost, $this->username, $this->password, $this->dbname, $this->port);
      $error = mysqli_connect_errno();
      if ($error !=null)
      {
        $output="<p>Unable to connect database<p>" . $error;
        exit($output);
      }
    }
// Insert values in Database 
public function insertDatabase ($query)
{
  mysqli_query($this->connection, $query);
}
 // Execute query to retrive value from database
 public function returnQuery($query)
 {
  $result =mysqli_query($this->connection,$query);
 return $result;
}
}
?>