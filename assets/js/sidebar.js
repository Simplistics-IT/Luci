window.addEventListener('DOMContentLoaded', event => {

    const showSidebar = (btnToggleId, hideText, asideWidth, paddingChange, smallLogo) => {
        const btnToggle = document.getElementById(btnToggleId),
            hideElem = document.getElementsByClassName(hideText),
            elemAsideWidth = document.querySelector(asideWidth),
            elemPaddingChange = document.getElementsByClassName(paddingChange),
            smallLogoDisplay = document.getElementById(smallLogo);
            btnToggle.addEventListener('click', () => {
                for (let i = 0; i < hideElem.length; i++) {
                    hideElem[i].classList.toggle('hide-elem');
                }
                elemAsideWidth.classList.toggle('aside-change');
                for (let i = 0; i < elemPaddingChange.length; i++) {
                    elemPaddingChange[i].classList.toggle('padding-change');
                }
                smallLogoDisplay.classList.toggle('small-logo-hiden');
            });
    }
    
    showSidebar('btn-sidebar-toggle', 'hide-text', '.aside' ,'padding-base', 'sm-logo');


	/*===== LINK ACTIVE =====
	const linkColor = document.querySelectorAll('.nav_link')

	function colorLink() {
		if (linkColor) {
			linkColor.forEach(l => l.classList.remove('active'))
			this.classList.add('active')
		}
	}
	linkColor.forEach(l => l.addEventListener('click', colorLink))*/

	// Your code to run since DOM is loaded and ready
});