window.onload = function () {
  Obtener();
};

function IrFormularioCrear() {
  window.location = "Registro.html";
}

function Obtener() {

  $(".table tbody").html("");

  $.get("http://localhost:58683/api/Usuario")
    .done(function (response) {
      console.log(response);
      $.each(response, function (id, fila) {
        $("<tr>").append(
          $("<td>").text(fila.IdUsuario),
          $("<td>").text(fila.DocumentoIdentidad),
          $("<td>").text(fila.Nombres),
          $("<td>").text(fila.Apellidos),
          $("<td>").text(fila.Telefono),
          $("<td>").text(fila.Correo),
          $("<td>").text(fila.Ciudad),
          $("<td>").append(
            $("<button>").data("id", fila.IdUsuario).addClass("btn btn-outline-success editar me-3").text("Editar").attr({ "type": "button" }),
            $("<button>").data("id", fila.IdUsuario).addClass("btn btn-outline-danger eliminar").text("Eliminar").attr({ "type": "button" })
          )
        ).appendTo(".table");
      });
    });
}

$(document).on('click', '.editar', function () {
  console.log($(this).data("id"));
  window.location = "Registro.html?id=" + $(this).data("id");

});

$(document).on('click', '.eliminar', function () {
  console.log($(this).data("id"));

  $.ajax({
    method: "DELETE",
    url: "http://localhost:58683/api/Usuario/" + $(this).data("id")
  })
    .done(function (response) {
      console.log(response);
      if (response) {
        Obtener();
      } else {
        alert("Error al eliminar")
      }
    });

});