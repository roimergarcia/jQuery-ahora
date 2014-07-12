// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "ahora";
		var defaults = {
				ahora: "00:00"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
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
						jqThis.addClass('jquery-ahora-input')
							.wrap($('<span class="jquery-ahora-wrapper"></span>'))
							.after($('<input type="button" class="jquery-ahora-activar" />'))
							.val(this.settings.ahora);
						
						//para probar
						this.probar();
				},
				probar: function () {
						console.log('probar');
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
