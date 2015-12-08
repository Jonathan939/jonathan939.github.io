# portfolio-settings-demo
A UI mockup for a fictional account settings page that I created to demonstrate my responsive HTML5, CSS3 and jQuery coding skills.

This mockup is a mobile-first, responsive design for a fictional account settings page using valid HTML5 and CSS3 code. The account settings page starts as a single-column layout (with accordion-folding form sections) that expands to a two-column layout, and finally a three-column layout that can be fitted into a popup window or drop-down pane on an existing desktop-sized website.

Since this is a UI mockup, the form is not fully funcitonal. There is no server-side code and little in terms of client-side form validation. Jquery has been used to create animations on the form, such as the expanding and collapsing of accordion sections in the single-column layout. To speed up loading times, as much of the code as possible has been offloaded to event handlers. The controls and accordion panes are also screen-aware, showing and hiding as needed depending on the screen size of the user's browser.

Finally, I decided to add all  control buttons and accordion sections directly into the HTML rather than using jQuery to add them during page load. While this means that the HTML is technically not 100% semantic, it makes the page far easier to maintain, as control buttons are now part of the HTML document where they typically reside. It also speeds up page loading by eliminating all the DOM manipulations that would be required to add the controls and accordions programmatically.

~Jonathan G Salomon

Feel free to contact me for questions or job offers.
