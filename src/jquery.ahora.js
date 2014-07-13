// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// Valores y opciones por defecto
		var pluginName = "ahora";
		var defaults = {
				ahora: "00:00"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// Aplica las opciones, usando la configuracion por defecto donde sea necesario
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Inicialización
						var jqThis = $(this.element);
						var jqBoton = $('<input type="button" class="jquery-ahora-activar" />');
						var jqAhora = this;

						jqThis.addClass('jquery-ahora-input')
							.wrap($('<span class="jquery-ahora-wrapper"></span>'))
							.after(jqBoton)
							.val(this.settings.ahora);
						jqBoton.on('click.ahora', function(e){
							jqAhora.abrirSelector();
						});
				},
				abrirSelector: function () {
						console.log('¡Selector abierto!');
				},
				cerrarSelector: function () {
						console.log('¡Selector cerrado!');
				}
		});

		// El plugin solo se puede aplicar una vez a cada elemento, y
		// solo aplica para inputs de tipo texto.
		$.fn[ pluginName ] = function ( options ) {
				this.filter("input[type='text']").each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});

				// Encadenado de funciones 
				return this;
		};

})( jQuery, window, document );
