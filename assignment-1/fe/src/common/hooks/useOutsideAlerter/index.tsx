import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * triggerId: use for app-menu only cause we skip hidding app-menu
 * when user click hamburger
 */
export function useOutsideAlerter(ref, callback, triggerId = null) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            const triggerElement = triggerId ? document.getElementById(triggerId) : null;
            const isHamburgerClick = triggerElement ? triggerElement.contains(event.target) : false;
            if (ref.current && !ref.current.contains(event.target) && !isHamburgerClick) {
                if (callback) callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}