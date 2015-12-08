/* jquery.settings.js */

/**********************************************************
* jQuery Objects for the Account Settings Demo Form
*
* Author: Jonathan G. Salomon
* Version: 1.0
* Laat Updated: 10-17-2015
*
* This file adds controls and event listeners for the
* accordion sections of the account settings pane. The
* controls and accordion sections are aware of the
* size of the viewport and respond accordingly.
*
***********************************************************/
$(document).ready(function()
{
    
    /* the transition width over which accordions aren't needed */
    var transition_width = 644; // (in pixels)
    
    /* get the accordion and controls within the Account Settings pane */
    var all_accordions = $("#edit-settings").find(".accordion");
    var all_controls = $("#edit-settings").find(".accordion-control");
    
    /* show the accordion controls and collapse the accordions if below transition width */
    if ($(window).width() < transition_width)
    {
        /* show the controls */
        all_controls.show();
        /* collapse the accordions */
        all_accordions.hide();
        /* save closed state to accordions */
        all_accordions.data("collapsed",true);
    }
    
    /* bind event listeners to the accordion controls */
    all_controls.click(function()
    {
        /* grab this control */
        var this_control = $(this);
        /* grab this control's icon */
        var this_icon = this_control.children("span.fa");
        /* grab the corresponsing accordion (next one in current fieldset) */
        var this_accordion = this_control.closest("fieldset").children(".accordion").first();
        
        /* check to see if it was hidden (data stored on control) */
        if (this_accordion.data("collapsed") == true)
        {
            /* kill any previous animations */
            this_accordion.stop(true,true);
            /* animate its showing */
            this_accordion.slideDown();
            /* change the controls to the down chevron */
            this_icon.removeClass("fa-chevron-up");
            this_icon.addClass("fa-chevron-down");
            /* save the open state */
            this_accordion.data("collapsed",false);
        }
        else
        {
            /* kill any previous animations */
            this_accordion.stop(true,true);
            /* animate its hiding */
            this_accordion.slideUp();
            /* change the controls to the up chevron */
            this_icon.removeClass("fa-chevron-down");
            this_icon.addClass("fa-chevron-up");
            /* save the closed state */
            this_accordion.data("collapsed",true);
        }    
    }); // end of click()
    
    
    /* bind listeners to the resize event */ 
     $(window).resize({p1:all_accordions,p2:all_controls},function(e)
    {
         
         /* get parameters from event object */
         var accordions = $(e.data.p1);
         var controls = $(e.data.p2);
         var icons = controls.children("span.fa");
         
         
         /* check to see if the window was resized down to mobile width */
         if ($(window).width() < transition_width)
         { 
             /* kill any previous animations */
             accordions.stop(true,true);
             /* show the controls */
             controls.show();
             
             /* loop through all the accordions */
             for (i = 0; i < accordions.length; i++)
             {
                 /* grab the current accordion */
                 var this_accordion = accordions[i];
                 var this_control = controls[i];
                 var this_icon = icons[i];
                 
                 /* see if the accordion was in its collapsed state */
                 if (this_accordion.data("collapsed") == true)
                 {
                     /* collapse the accordion */
                     this_accordion.hide();
                     /* change the controls to the up chevron */
                     this_icon.removeClass("fa-chevron-down");
                     this_icon.addClass("fa-chevron-up");
                 }
                 else
                 {
                     /* expand the accordion */
                     this_accordion.show();
                     /* change the controls to the down chevron */
                     this_icon.addClass("fa-chevron-down");
                     this_icon.removeClass("fa-chevron-up");
                 }
             } // end of for loop
             
         }
         /* otherwise, the window is above mobile width */
         else
         {   
             /* kill any previous animations */
             accordions.stop(true,true);
             /* hide the accordion controls */
             controls.hide();
             /* expand the accordions */
             accordions.show();
         }
     }); // end of resize()
});