/* jquery.settings.js */

/******************************************************************************************
* jQuery Objects for the Account Settings Demo Form
*
* Author: Jonathan G. Salomon
* Version: 1.1
* Laat Updated: 12-15-2015
*
* This method adds accordion controls and event listeners
* to the accordion sections in the Account Settings pane.
* The controls and accordion sections are aware of the
* size of the viewport and respond accordingly.
*
* @method accordions
*
* @param {Int} transitionWidth - the width, in pixels, over which accordions aren't
*      needed. (Ideally this is the width over which the content within the accordions
*      fits on the screen nicely even when not collapsed.)
* @param {String} settingsId - class/id name for the settings pane 
* @param {String} accordionsClassName - class name for the accordion sections
* @param {String} accordionControlsClassName - class name for the accordion controls
* @param {String} accordionControlsIconClassName - class name for the control's icon
* @param {String} expandedIconClassName - class name for the expanded accordion icon
* @param {String} collapsedIconClassName - class name for the collapsed accordion icon
* @param {jQuery Object} allAccordions - object containing all collapsable accordion
*      sections on the page
* @param {jQuery Object} allControls - object containing all controls for the accordion
*      sections on page
*
* @param {Function} set_transition_width - set transitionWidth value (default = 644)
* @param {Function} set_settings_class_name - set the ID used for the
*      settings pane (default = edit-settings)
* @param {Function} set_accordions_class_name - set the class name used for the accordion
*      sections (default = accordion)
* @param {Function} set_accordion_controls_class_name - set the class name used for the
*      accordion controls (default = accordion-control)
* @param {Function} set_accordion_controls_icon_class_name - set the class name for the
*      accordion controls icon (default = fa, from the FontAwesome icon library)
* @param {Function} set_expanded_icon_class_name - set a class name for the expanded
*      icon (default = fa-chevron-up)
* @param {Function} set_collapsed_icon_class_name - set a class name for the collapsed
*      icon (default = fa-chevron-down, from the FontAwesome icon library)
* @param {Function} initialize - initializes the accordions (on page load)
* @return {Object} accordions.set_transition_width 
*
*******************************************************************************************/
$(document).ready(function()
{
    
    /**** the main control method ****/
    var accordions = (function()
    {
        
        /* the transition width over which accordions aren't needed */
        var transitionWidth = 644; // (in pixels)
        /* class/id name for the settings pane */
        var settingsId = "edit-settings";
        /* class name for the accordion sections */
        var accordionsClassName = "accordion";
        /* class name for the accordion controls */
        var accordionControlsClassName = "accordion-control";
        /* class name for the accordion controls icon */
        var accordionControlsIconClassName = "fa";
        /* class name for the expanded accordion icon */
        var expandedIconClassName = "fa-chevron-up";
         /* class name for the collapsed accordion icon */
        var collapsedIconClassName = "fa-chevron-down";
        /* jQuery object for holding all collapsable accordion sections in the settings pane */
        var $allAccordions = $();
        /* jQuery object for holding all controls for the accordion sections on the page */
        var $allControls = $();
        
        
        /* set a new transition width */
        var set_transition_width = function( newWidth )
        {
            /* ensure the new width is a number */
            if(jQuery.type( newWidth ) === "number")
            {
                /* set the transition width */
                transitionWidth = newWidth;    
            }
            else
            {
                /* note the error */
                console.log("set_transition_width: New transiton width must be a number.")
            }
        };
        
        /* set a new class name for the settings pane */
        var set_settings_id = function( newClassName )
        {
            /* ensure the new class name is a string */
            if(jQuery.type( newClassName ) === "string")
            {
                /* set the class name */
                settingsId = newClassName;    
            }
            else
            {
                /* note the error */
                console.log("set_settings_class_name: New class name must be a string.")
            }
        };
        
        /* set a new class name for the accordion sections */
        var set_accordions_class_name = function( newClassName )
        {
            /* ensure the new class name is a string */
            if(jQuery.type( newClassName ) === "string")
            {
                /* set the class name */
                accordionsClassName = newClassName;    
            }
            else
            {
                /* note the error */
                console.log("set_accordions_class_name: New class name must be a string.")
            }
        };
        
        /* set a new class name for the accordion controls */
        var set_accordion_controls_class_name = function( newClassName )
        {
            /* ensure the new class name is a string */
            if(jQuery.type( newClassName ) === "string")
            {
                /* set the class name */
                accordionControlsClassName = newClassName;    
            }
            else
            {
                /* note the error */
                console.log("set_accordion_controls_class_name: New class name must be a string.")
            }
        };

        /* set a new class name for the accordion controls icon */
        var set_accordion_controls_icon_class_name = function( newClassName )
        {
            /* ensure the new class name is a string */
            if(jQuery.type( newClassName ) === "string")
            {
                /* set the class name */
                accordionControlsIconClassName = newClassName;    
            }
            else
            {
                /* note the error */
                console.log("set_accordion_controls_icon_class_name: New class name must be a string.")
            }
        };

        /* set a new class name for the expanded icon */
        var set_expanded_icon_class_name = function( newClassName )
        {
            /* ensure the new class name is a string */
            if(jQuery.type( newClassName ) === "string")
            {
                /* set the class name */
                expandedIconClassName = newClassName;    
            }
            else
            {
                /* note the error */
                console.log("set_expanded_icon_class_name: New class name must be a string.")
            }
        };
        
        /* set a new class name for the collapsed icon */
        var set_collapsed_icon_class_name = function( newClassName )
        {
            /* ensure the new class name is a string */
            if(jQuery.type( newClassName ) === "string")
            {
                /* set the class name */
                collapsedIconClassName = newClassName;    
            }
            else
            {
                /* note the error */
                console.log("set_collapsed_icon_class_name: New class name must be a string.")
            }
        };

        
        /* expand the accordion */
        var expand_accordion = function( $accordion )
        {
            /* grab the accordion's control */
            var $accordionControl = $accordion.prevAll("." + accordionControlsClassName).first();

            /* grab the accordion control's icon */
            var $controlIcon = $accordionControl.children("." + accordionControlsIconClassName);

            /* kill any previous animations */
            $accordion.stop(true,false);

            /* animate its expansion */
            $accordion.slideDown();

            /* change the control icon to the expanded icon */
            $controlIcon.removeClass(collapsedIconClassName);
            $controlIcon.addClass(expandedIconClassName);

            /* save the open state */
            $accordion.data("collapsed",false);
        };
        
        
        /* collapse the accordion */
        var collapse_accordion = function( $accordion )
        {    
            /* grab the accordion's control */
            var $accordionControl = $accordion.prevAll("." + accordionControlsClassName).first();

            /* grab the accordion control's icon */
            var $controlIcon = $accordionControl.children("." + accordionControlsIconClassName);

            /* kill any previous animations */
            $accordion.stop(true,false);

            /* animate its collapse */
            $accordion.slideUp();

            /* change the control icon to the collapsed icon */
            $controlIcon.removeClass(expandedIconClassName);
            $controlIcon.addClass(collapsedIconClassName);

            /* save the closed state */
            $accordion.data("collapsed",true);
        };
        
        
        /* close all accordions (usually on page load) */
        var close_all_accordions = function( $accordions, $accordionControlIcons )
        {   
            /* kill any previous animations */
            $accordions.stop(true,true); // stop at end state

            /* collapse the accordions */
            $accordions.hide();

            /* change the control icon to the collapsed icon */
            $accordionControlIcons.removeClass(expandedIconClassName);
            $accordionControlIcons.addClass(collapsedIconClassName);

            /* save the closed state */
            $accordions.data("collapsed",true);
        };
        
        
        /* disable all accordions by expanding them and hiding the controls*/
        var disable_all_accordions = function( $accordions, $accordionControls )
        {
            /* kill any previous animations */
            $accordions.stop(true,true); // stop at end state
            
            /* hide the accordion control */
            $accordionControls.hide();
            
            /* show the accordions */
            $accordions.show();
        };
        
        
        /* enable all accordions by showing the controls and resuming state */
        var enable_all_accordions = function( $accordions, $accordionControls )
        {
            /* kill any previous animations */
            $accordions.stop(true,true); // stop at end state
            
            /* show the accordion controls */
            $accordionControls.show();
                 
            /* hide accordions that were collapsed (based on set data) */
            $accordions.filter(function() {
                    return ($(this).data("collapsed") && $(this).data("collapsed") === true);
                })
                .hide();
 
            /* show accordions that were expanded (based on set data) */
            $accordions.filter(function() {
                    return ($(this).data("collapsed") && $(this).data("collapsed") === false);
                })
                .show();
        };
        
        
        /* toggle the attached accordion's state (expanded/collapsed) */
        var toggle_accordion_control = function()
        {
            /* grab the accordion object attached to this event */
            var $accordionControl = $(this);
            
            /* check that this function was called on an accordion control (in case the DOM changed...)  */
            if ($accordionControl.length !== 0 &&
                $accordionControl.attr("class") === accordionControlsClassName)
            { 
                /* get the corresponding accordion (the very next "accordion" class in the fieldset) */
                var $accordion = $accordionControl.nextAll("." + accordionsClassName).first();
                
                /* continue if an accordion was found */
                if ($accordionControl.length !== 0)
                {
                    /* check to see if the accordion was collapsed (data stored on control) */
                    if ($accordion.data("collapsed") === true)
                    {
                        /* expand the accordion */
                        expand_accordion($accordion);
                    }
                    else
                    {
                        /* collapse the accordion */
                        collapse_accordion($accordion);
                    }
                } // end of accordion existence test
            } // end of accordion control object test
        };
        
        
        /* show or hide the accordions, as needed, when screen size changes */
        var onAccordionResize = function( event )
        {
             /* get parameters from event object */
             var $accordions = $(event.data.p1);
             var $controls = $(event.data.p2);
            
             /* check to see if the window was resized down to mobile width */
             if ($(window).width() < transitionWidth)
             {     
                 /* enable the accordion controls (in their last saved state) */
                 enable_all_accordions($accordions, $controls);
             }
             /* otherwise, the window is above mobile width */
             else
             {   
                 /* disable the accordion controls */
                 disable_all_accordions($accordions, $controls);
             }
        };
        
        /* initialize the page upon load of jQuery) */
        var initialize = function()
        {
            /* grab DOM objects once at start to speed up code execution */
            $allAccordions = $("#" + settingsId).find("." + accordionsClassName);
            $allControls = $("#" + settingsId).find("." + accordionControlsClassName);
            $allIcons = $allControls.children("." + accordionControlsIconClassName);
            
            /* collapse all accordions at the outset */
            close_all_accordions($allAccordions, $allIcons);
            
            /* if below transition width, enable all accordions */
            if ($(window).width() < transitionWidth)
            {
                 enable_all_accordions($allAccordions, $allControls);
            }
            /* otherwise, disable them */
            else
            {
                disable_all_accordions($allAccordions, $allControls);  
            }
            
            /* bind the accordion controls to the accordion toggle function */
            $allControls.click(toggle_accordion_control);
            
            /* bind window resize events to the accorion resize function */
            $(window).resize({p1:$allAccordions,p2:$allControls}, onAccordionResize);
        };
        
        
        /* expose public APIs */
        return {
            set_transition_width: set_transition_width,
            set_settings_id: set_settings_id,
            set_accordions_class_name: set_accordions_class_name,
            set_accordion_controls_class_name: set_accordion_controls_class_name,
            set_accordion_controls_icon_class_name: set_accordion_controls_icon_class_name,
            set_expanded_icon_class_name: set_expanded_icon_class_name,
            set_collapsed_icon_class_name: set_collapsed_icon_class_name,
            initialize: initialize
        };
    })(); // end of accordions method
    
    
    /* initialize the accordions and their controls */
    accordions.initialize();

    
}); // end of document.ready()