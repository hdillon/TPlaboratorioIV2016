<?php
require_once"AccesoDatos.php";
class Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
 	public $apellido;
  	public $email;
  	public $password;
  	public $telefono;
  	public $foto;
  	public $perfil;
  	public $estado;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdLocal()
	{
		return $this->idLocal;
	}
	public function GetApellido()
	{
		return $this->apellido;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	public function Getemail()
	{
		return $this->email;
	}
	public function GetPassword()
	{
		return $this->password;
	}
	public function GetTelefono()
	{
		return $this->telefono;
	}
	public function GetFoto()
	{
		return $this->foto;
	}
	public function Getperfil()
	{
		return $this->perfil;
	}
	public function GetEstado()
	{
		return $this->estado;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function Setemail($valor)
	{
		$this->email = $valor;
	}
	public function SetPassword($valor)
	{
		$this->password = $valor;
	}
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}
	public function Setperfil($valor)
	{
		$this->perfil = $valor;
	}
	public function SetEstado($valor)
	{
		$this->estado = $valor;
	}
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($email=NULL)
	{
		if($email != NULL){
			$obj = Persona::TraerUnaPersona($email);
			
			$this->apellido = $obj->apellido;
			$this->nombre = $obj->nombre;
			$this->email = $email;
			$this->password = $password;
			$this->telefono = $obj->telefono;
			$this->foto = $obj->foto;
			$this->perfil = $perfil;
			$this->estado = $obj->estado;
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->apellido."-".$this->nombre."-".$this->email."-".$this->foto;
	}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnaPersona($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;				
	}

	public static function TraerPersonaLogin($email, $pass) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where email =:email and password =:password");
		$consulta->bindValue(':email', $email, PDO::PARAM_STR);
		$consulta->bindValue(':password', $pass, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('persona');
		return $personaBuscada;				
	}
	
	public static function TraerTodasLasPersonas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}

	public static function TraerTodasLasPersonasSinLocal()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from persona where id not in (SELECT id_encargado as 'id' FROM `sucursal` UNION select id_persona as 'id' from `sucursal_empleado`)");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}

	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPersona($persona)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update persona 
				set nombre=:nombre,
				apellido=:apellido,
				telefono=:telefono,
				password=:password,
				foto=:foto,
				perfil=:perfil,
				estado=:estado
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
			$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_STR);
			$consulta->bindValue(':password', $persona->password, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
			$consulta->bindValue(':perfil', $persona->perfil, PDO::PARAM_STR);
			$consulta->bindValue(':estado', $persona->estado, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function InsertarPersona($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into persona (nombre,apellido,email,password,telefono,foto,perfil,estado)values(:nombre,:apellido,:email,:password,:telefono,:foto,:perfil,:estado)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
		$consulta->bindValue(':email', $persona->email, PDO::PARAM_INT);
		$consulta->bindValue(':password', $persona->password, PDO::PARAM_INT);
		$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_INT);
		$consulta->bindValue(':foto',$persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(':perfil',$persona->perfil, PDO::PARAM_STR);
		$consulta->bindValue(':estado',$persona->estado, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();		
	}	

	public static function GuardarFechaLogin($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into registros_login (id_usuario,fecha)values(:id,NOW())");
		$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}	

	public static function TraerRegistrosLogin($id_usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT p.id AS 'id', p.nombre AS 'nombre', p.apellido AS 'apellido', rl.fecha AS 'fecha' FROM registros_login rl, persona p WHERE rl.id_usuario = p.id and rl.id_usuario =:id_usuario");
		$consulta->bindValue(':id_usuario',$id_usuario, PDO::PARAM_INT);
		$consulta->execute();		
		$arrLogueosPorUsuario= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrLogueosPorUsuario;
	}	

}
