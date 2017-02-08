<?php
require_once"AccesoDatos.php";
class Encuesta
{
	public $id;
	public $atencion_personalizada;
 	public $variedad_ofertas;
 	public $funcionamiento;
  	public $puntaje;
  	public $disenio;
  	public $recomendacion;


	public function __construct($id=NULL)
	{
		if($id != NULL){
			$obj = Encuesta::TraerUnaEncuesta($ID);

			$this->atencion_personalizada = $obj->atencion_personalizada;
			$this->variedad_ofertas = $variedad_ofertas;
			$this->funcionamiento = $funcionamiento;
			$this->puntaje = $obj->puntaje;
			$this->disenio = $obj->disenio;
			$this->recomendacion = $obj->recomendacion;
		}
	}

	public static function TraerUnaEncuesta($idParametro) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from encuesta where id =:id");
		$consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
		$consulta->execute();
		$encuestaBuscada= $consulta->fetchObject('encuesta');
		return $encuestaBuscada;				
	}

	
	public static function TraerTodasLasEncuestas()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from encuesta");
		$consulta->execute();			
		$arrEncuestas= $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");	
		return $arrEncuestas;
	}

	public static function InsertarEncuesta($encuesta)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into encuesta (atencion_personalizada,variedad_ofertas,funcionamiento,puntaje,diseño,sugerencias,recomendacion)values(:atencion_personalizada,:variedad_ofertas,:funcionamiento,:puntaje,:disenio,:sugerencias,:recomendacion)");
		$consulta->bindValue(':atencion_personalizada',$encuesta->atencionPersonalizada, PDO::PARAM_STR);
		$consulta->bindValue(':variedad_ofertas', $encuesta->variedadOfertas, PDO::PARAM_STR);
		$consulta->bindValue(':funcionamiento', $encuesta->funcionamiento, PDO::PARAM_STR);
		$consulta->bindValue(':puntaje', $encuesta->puntaje, PDO::PARAM_INT);
		$consulta->bindValue(':disenio', $encuesta->disenio, PDO::PARAM_STR);
		$consulta->bindValue(':sugerencias', $encuesta->sugerencias, PDO::PARAM_STR);
		$consulta->bindValue(':recomendacion', $encuesta->recomendacion, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();			
	}	


}
