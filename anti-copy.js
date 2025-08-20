// Anti-Copy Protection Script for Website
// Add this script to your website to discourage content copying

(function() {
    'use strict';

    // Configuration
    // const config = {
    //     showWarnings: true,
    //     redirectOnDevTools: false,
    //     redirectUrl: 'https://example.com/warning',
    // };

    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        if (config.showWarnings) {
            showWarning('Right-click is disabled to protect content.');
        }
        return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable common keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Text selection is disabled.');
            }
            return false;
        }

        // Disable Ctrl+C (Copy)
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Copy function is disabled.');
            }
            return false;
        }

        // Disable Ctrl+X (Cut)
        if (e.ctrlKey && e.key === 'x') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Cut function is disabled.');
            }
            return false;
        }

        // Disable Ctrl+V (Paste) - optional
        if (e.ctrlKey && e.key === 'v') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Save function is disabled.');
            }
            return false;
        }

        // Disable Ctrl+P (Print)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Print function is disabled.');
            }
            return false;
        }

        // Disable F12 (Developer Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Developer tools access is restricted.');
            }
            return false;
        }

        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Developer tools access is restricted.');
            }
            return false;
        }

        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Console access is restricted.');
            }
            return false;
        }

        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('View source is disabled.');
            }
            return false;
        }

        // Disable Ctrl+Shift+C (Element Inspector)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            if (config.showWarnings) {
                showWarning('Element inspector is disabled.');
            }
            return false;
        }
    });

    // Detect developer tools (basic detection)
    let devtools = {
        open: false,
        orientation: null
    };

    const threshold = 160;

    // setInterval(function() {
    //     if (window.outerHeight - window.innerHeight > threshold || 
    //         window.outerWidth - window.innerWidth > threshold) {
    //         if (!devtools.open) {
    //             devtools.open = true;
    //             if (config.showWarnings) {
    //                 showWarning('Developer tools detected!');
    //             }
    //             if (config.redirectOnDevTools) {
    //                 window.location.href = config.redirectUrl;
    //             }
    //         }
    //     } else {
    //         devtools.open = false;
    //     }
    // }, 500);

    // Disable image dragging
    document.addEventListener('DOMContentLoaded', function() {
        const images = document.getElementsByTagName('img');
        for (let i = 0; i < images.length; i++) {
            images[i].addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
            images[i].style.userSelect = 'none';
            images[i].style.webkitUserSelect = 'none';
            images[i].style.mozUserSelect = 'none';
            images[i].style.msUserSelect = 'none';
        }
    });

    // Apply CSS to prevent text selection
    function applyCSSProtection() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-touch-callout: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            body {
                -webkit-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
            }

            /* Hide text cursor */
            * {
                cursor: default !important;
            }

            /* Disable highlighting */
            ::selection {
                background: transparent !important;
            }
            
            ::-moz-selection {
                background: transparent !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Show warning message
    function showWarning(message) {
        // Create warning overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;

        // Add animation keyframes
        if (!document.getElementById('warning-styles')) {
            const animationStyle = document.createElement('style');
            animationStyle.id = 'warning-styles';
            animationStyle.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(animationStyle);
        }

        overlay.textContent = message;
        document.body.appendChild(overlay);

        // Remove warning after 3 seconds
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 3000);
    }

    // Clear clipboard if copy somehow occurs
    function clearClipboard() {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('').catch(err => {
                // Clipboard access denied
            });
        }
    }

    // Monitor clipboard events
    document.addEventListener('copy', function(e) {
        e.clipboardData.setData('text/plain', '');
        e.preventDefault();
        clearClipboard();
        if (config.showWarnings) {
        }
    });

    // Disable print media
    function disablePrint() {
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                body * {
                    visibility: hidden !important;
                }
                body::after {
                    content: "Printing is disabled for this content.";
                    visibility: visible !important;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Obfuscate text content (optional - can impact SEO)
    function obfuscateContent() {
        // This is optional and may hurt SEO
        // Uncomment if you want to use it
        /*
        const textNodes = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const texts = [];
        let textNode;
        while (textNode = textNodes.nextNode()) {
            texts.push(textNode);
        }

        texts.forEach(node => {
            if (node.textContent.trim()) {
                const span = document.createElement('span');
                span.setAttribute('data-text', node.textContent);
                span.textContent = node.textContent;
                node.parentNode.replaceChild(span, node);
            }
        });
        */
    }

    // Initialize protection when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        applyCSSProtection();
        disablePrint();
        
        // Show initial warning
        if (config.showWarnings) {
            setTimeout(() => {
                showWarning(config.warningMessage);
            }, 1000);
        }

        console.clear();
    });

    // Console warning
    console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers. Content on this website is protected.', 'color: red; font-size: 16px;');

    // Disable console
    // (function() {
    //     try {
    //         const devtools = /./;
    //         devtools.toString = function() {
    //             this.opened = true;
    //         }
    //         console.log('%c', devtools);
    //         if (devtools.opened) {
    //             window.location.reload();
    //         }
    //     } catch(e) {}
    // })();

})();

// Additional protection: Override common methods
(function() {
    // Override document.execCommand
    const originalExecCommand = document.execCommand;
    document.execCommand = function(command) {
        if (['copy', 'cut', 'selectAll'].includes(command)) {
            console.warn('Command blocked:', command);
            return false;
        }
        return originalExecCommand.apply(this, arguments);
    };

    // Override getSelection
    const originalGetSelection = window.getSelection;
    window.getSelection = function() {
        const selection = originalGetSelection.apply(this, arguments);
        selection.removeAllRanges();
        return selection;
    };
})();