angular.module('TPInmobiliaria.controladorEstadisticas', [])

app.controller('ControlEstadisticas', function($scope, $http, $state,jwtHelper, $auth) {
  $scope.mostrarSelect = "NoMostrar";
  $scope.tipoDeReporte = "";
  if($auth.isAuthenticated()){
    $scope.usuarioLogueado = jwtHelper.decodeToken($auth.getToken());
    $scope.flagLogueado = true;
    console.info("usuario", $scope.usuarioLogueado);
  }else{
    $scope.flagLogueado = false;
  }

  Highcharts.theme = {
    colors: ['#058DC7', '#ED561B', '#50B432', '#DDDF00', '#24CBE5', '#64E572', 
    '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
      backgroundColor: {
        linearGradient: [0, 0, 500, 500],
        stops: [
        [0, 'rgb(255, 255, 255)'],
        [1, 'rgb(240, 240, 255)']
        ]
      },
    },
    title: {
      style: {
        color: '#000',
        font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: '#666666',
        font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
    },

    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: 'black'
      },
      itemHoverStyle:{
        color: 'gray'
      }   
    }
  };

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

$scope.Desloguear=function(){
  $auth.logout();
  $scope.flagLogueado = false;
}

})

app.controller('ControlVentasPorLocal', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  $scope.mostrarSelect = "NoMostrar";
  $scope.tipoDeReporte = "Ventas";
  var sucursales = [];
  var cantidadVentasSucursal = [];
  ServicioABM.traer('transacciones/ventasporlocal').then(
    function(rta){
      $scope.ventas = rta.data;
      $("#loadingModal").modal('hide');
    },function(error){
      $("#loadingModal").modal('hide');
      $scope.ventas = [];
    });

  $timeout(function() {
    $scope.ventas.forEach(function(venta){
      cantidadVentasSucursal.push(Number(venta.cantidad));
      sucursales.push(venta.nombresucursal);
    });

    Highcharts.chart('miGrafico', {
      chart: {
        type: 'column',
        options3d: {
          enabled: true,
          alpha: 10,
          beta: 25,
          depth: 70
        }
      },
      title: {
        text: 'Ventas por Sucursal'
      },
      xAxis: {
        categories: sucursales
      },
      yAxis: {
        title: {text: null}
      },
      series: [{
        name: 'Ventas',
        data: cantidadVentasSucursal
      }]
    });
  }, 1000); 

})

app.controller('ControlVentasPorEmpleado', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  $scope.mostrarSelect = "Sucursales";
  $scope.tipoDeReporte = "Ventas";

  ServicioABM.traer("sucursales").then(function(rta){
    $scope.listaSucursales = rta.data;
    setTimeout(function () {
      $("#loadingModal").modal('hide');
    }, 1000)
  });

  $scope.ventasPorEmpleado = function(idSucursal){
    var listaEmpleados = [];
    var cantidadVentasEmpleado = [];
    var ventas = [];

    ServicioABM.traerPorId('transacciones/ventasporempleado/', idSucursal).then(
      function(rta){
        ventas = rta.data;
        $("#loadingModal").modal('hide');
      },function(error){
        $("#loadingModal").modal('hide');
        ventas = [];
      });

    $timeout(function() {
      ventas.forEach(function(venta){
        cantidadVentasEmpleado.push(Number(venta.cantidad));
        listaEmpleados.push(venta.empleado);
        $scope.nombreSucursal = venta.nombresucursal;
      });


      Highcharts.chart('miGrafico', {
        chart: {
          type: 'bar'
        },
        title: {
          text: 'Ventas Por Empleado'
        },
        subtitle: {
          text: 'Ranking de ventas por empleado de la sucursal: ' + $scope.nombreSucursal
        },
        xAxis: {
          categories: listaEmpleados,
          title: {
            text: null
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Ventas',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            }
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
          shadow: true
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Ventas',
          data: cantidadVentasEmpleado
        }]
      });
}, 1000); 
}

})


app.controller('ControlEstadisticasEncuestas', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  $scope.mostrarSelect = "Encuestas";
  $scope.tipoDeReporte = "Encuestas";
  $scope.siRecomienda = 0;
  $scope.noRecomienda = 0;
  $scope.talvezRecomienda = 0;

  ServicioABM.traer("encuestas").then(function(rta){
    $scope.listaEncuestas = rta.data;
    console.info("Encuestas: ", $scope.listaEncuestas);
    setTimeout(function () {
      $("#loadingModal").modal('hide');
    }, 1000)
  });

  $timeout(function() {
    $scope.listaEncuestas.forEach(function(encuesta){
      if(encuesta.recomendacion == "si")
        $scope.siRecomienda ++;
      else if(encuesta.recomendacion == "no")
        $scope.noRecomienda ++;
      else
        $scope.talvezRecomienda ++;
    });


    Highcharts.chart('miGrafico', {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: 'Escuestas Realizadas'
      },
      subtitle: {
        text: 'Recomendaciones de los usuarios:'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}'
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        data: [{
          name: 'Si lo recomendaría',
          y: $scope.siRecomienda
        }, {
          name: 'No lo recomendaría',
          y: $scope.noRecomienda
        }, {
          name: 'Probablemente lo recomendaría',
          y: $scope.talvezRecomienda
        }]
      }]
    });
}, 1000); 

})


app.controller('ControlEstadisticasLogin', function($scope, $http, $state,jwtHelper, $auth, $timeout, ServicioABM) {
  $scope.mostrarSelect = "Usuarios";
  $scope.tipoDeReporte = "Ingresos al Sistema";
  $scope.mostrarGrilla = "N";

  $scope.gridOptions = {
    data: [{id : "0", nombre : "DEFAULT", apellido : "DEFAULT", fecha : "DEFAULT"}],
    urlSync: false
  };

  ServicioABM.traer("personasconlogins").then(function(rta){
    $scope.listaPersonas = rta.data;
    setTimeout(function () {
      $("#loadingModal").modal('hide');
    }, 1000)
  });

  $scope.loginsPorUsuario = function(idUsuario){
    ServicioABM.traerPorId("resgistroslogin/", idUsuario).then(function(rta){
      $scope.gridOptions.data = rta.data;
      $scope.mostrarGrilla = "S";
      setTimeout(function () {
        $("#loadingModal").modal('hide');
      }, 1000)
    });
  }

});





