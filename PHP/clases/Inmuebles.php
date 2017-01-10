<?php
require_once"AccesoDatos.php";
class Inmueble
{
	public $id;
	public $descripcion;
 	public $direccion;
 	public $precio;
  	public $tipo;
  	public $foto;
  	public $idSucursal;

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  	public function GetId()
	{
		return $this->id;
	}
	public function GetIdSucursal()
	{
		return $this->idSucursal;
	}
	public function Getdescripcion()
	{
		return $this->descripcion;
	}
	public function GetDireccion()
	{
		return $this->direccion;
	}
	public function Getprecio()
	{
		return $this->precio;
	}
	public function GetTipo()
	{
		return $this->tipo;
	}
	public function GetFoto()
	{
		return $this->foto;
	}

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetIdSucursal($valor)
	{
		$this->idSucursal = $valor;
	}
	public function SetDescripcion($valor)
	{
		$this->descripcion = $valor;
	}
	public function SetDireccion($valor)
	{
		$this->direccion = $valor;
	}
	public function SetPrecio($valor)
	{
		$this->precio = $valor;
	}
	public function Settipo($valor)
	{
		$this->tipo = $valor;
	}
	public function SetFoto($valor)
	{
		$this->foto = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Inmueble::TraerUnInmueble($ID);

			$this->descripcion = $obj->descripcion;
			$this->direccion = $direccion;
			$this->precio = $precio;
			$this->tipo = $obj->tipo;
			$this->foto = $obj->foto;
		}
	}

//--METODO DE CLASE
	public static function TraerUnInmueble($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from inmueble where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$inmuebleBuscado= $consulta->fetchObject('inmueble');
		return $inmuebleBuscado;				
	}
	
	public static function TraerTodosLosInmuebles()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from inmueble");
		$consulta->execute();			
		$arrInmuebles= $consulta->fetchAll(PDO::FETCH_CLASS, "inmueble");	
		return $arrInmuebles;
	}
	
	public static function BorrarInmueble($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from sucursal WHERE id=:id");
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
	}
	
	public static function ModificarInmueble($inmueble)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("
				update inmueble 
				set descripcion=:descripcion,
				direccion=:direccion,
				precio=:precio,
				tipo=:tipo,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
			$consulta->bindValue(':id',$inmueble->id, PDO::PARAM_INT);
			$consulta->bindValue(':descripcion',$inmueble->descripcion, PDO::PARAM_STR);
			$consulta->bindValue(':direccion', $inmueble->direccion, PDO::PARAM_STR);
			$consulta->bindValue(':precio', $inmueble->precio, PDO::PARAM_STR);
			$consulta->bindValue(':tipo', $inmueble->tipo, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $inmueble->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

	public static function InsertarInmueble($inmueble)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into inmueble (descripcion,tipo,precio,direccion,foto,id_sucursal)values(:descripcion,:tipo,:precio,:direccion,:foto,:id_sucursal)");
		$consulta->bindValue(':descripcion',$inmueble->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(':tipo', $inmueble->tipo, PDO::PARAM_STR);
		$consulta->bindValue(':precio', $inmueble->precio, PDO::PARAM_STR);
		$consulta->bindValue(':direccion', $inmueble->direccion, PDO::PARAM_STR);
		$consulta->bindValue(':foto',$inmueble->foto, PDO::PARAM_STR);
		$consulta->bindValue(':id_sucursal',$inmueble->idSucursal, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	

}
