// jcheckbox bind callback event to checkbox listen for on change event, mutiple selection with crtl key or command key
$(function () {
	$.fn.jcheckbox = function(options,callback) {

		var settings = $.extend({
			checkBoxContainerName: '',
			focusBoxName: ''
		}, options );


		if(settings.checkBoxContainerName === '' || settings.focusBoxName === '') {
			return false;
		}
		else {
			bindEventForCheckBox(this,settings.checkBoxContainerName,settings.focusBoxName,callback);
		}

		function bindEventForCheckBox(checkBoxNode,checkBoxContainerName,focusBoxName,callback) {

			var containerLength = checkBoxNode.length;

			$(focusBoxName).unbind().on('keyup', function(e) {
				if (!Modernizr.mq('only screen and (max-width: 810px)')) {
					var code = (e.keyCode ? e.keyCode : e.which);
					if(code == 224 || code == 17 || code == 91) {
					  callback();
					}
					$(focusBoxName).blur();
				}
			});

			$(checkBoxContainerName).on('click', function(e){
				$(focusBoxName).attr("tabindex",-1).focus();

				var code = (e.keyCode ? e.keyCode : e.which);
				if(e.ctrlKey || e.metaKey) {
					$input = $(this).children('input');
					if(containerLength > 1)
					{
						if($input.prop('checked') === false) {

							$input.prop('checked', true);

							if($input.val() === 'All') {
								$(checkBoxContainerName).each(function() {
								   	if($(this).children('input').prop('checked') && $(this).children('input').val()!= 'All') {
								    	$(this).children('input').removeAttr('checked');
								   	}
								})
							}
							else
							{
								$(checkBoxContainerName).each(function() {
									if($(this).children('input').val() === 'All')
									{
										$(this).children('input').removeAttr('checked');
									}
								})
							}

						}
						else {
							if($input.val() === 'All')
							{
								$input.prop('checked', true);
							}
							else
							{
								$input.removeAttr('checked');

								var check = 0;

								$(checkBoxContainerName).each(function() {
									if($(this).children('input').prop('checked')) {
							    		check = check + 1;
							    	}
							    })
							    if(check === 0)
							    {
							    	$input.prop('checked', true);
							    }

							}
						}
					}
					return false;
				}
			})


			$(checkBoxNode).on('change', function (e) {
				if(containerLength > 1)
				{
					if(this.checked)
					{
						if(this.value === 'All')
						{
						    $(checkBoxNode).each(function() {
						    	if(this.checked && this.value != 'All') {
						    		$(this).removeAttr('checked');
						    	}
						    })
						}
						else
						{

							$(checkBoxNode).each(function() {
								if(this.value === 'All')
								{
									$(this).removeAttr('checked');
								}
						    })
						}
					}
					else
					{
						if(this.value === 'All')
						{
							$(this).prop('checked', true);
						}
						else
						{
							var check = 0;
							var current = this;
							$(checkBoxNode).each(function() {
								if(this.checked) {
						    		check = check + 1;
						    	}
						    })
						    if(check === 0)
						    {
						    	$(current).prop('checked', true);
						    }
						}
					}
					callback();
				}
				else
				{
					$(this).prop('checked', true);
				};

			});
		}
	};

}(jQuery));
